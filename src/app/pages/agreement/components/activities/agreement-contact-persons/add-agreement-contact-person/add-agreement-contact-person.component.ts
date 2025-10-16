import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, filter, take, startWith } from 'rxjs';
import { ClientContactPersonsFacade } from '../../../../../crm/clients/store/client-contact-persons/client-contact-persons.facade';
import { AgreementContactPersonsFacade } from '../../../../store/agreement-contact-persons/agreement-contact-persons.facade';
import { ClientContactPerson } from '../../../../../crm/clients/store/client-contact-persons/client-contact-person.model';
import { LeasingAgreementsFacade } from '../../../../store/agreements/agreements.facade';
import { AgreementContactPerson } from '../../../../store/agreement-contact-persons/agreement-contact-person.model';

@Component({
  selector: 'app-add-agreement-contact-person',
  standalone: false,
  templateUrl: './add-agreement-contact-person.component.html',
  styleUrl: './add-agreement-contact-person.component.scss',
})
export class AddAgreementContactPersonComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addAgreementContactPersonsForm!: FormGroup;
  retrivedId: any;
  clientId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();
  contactPersons$!: Observable<ClientContactPerson[]>;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AgreementContactPersonsFacade,
    private router: Router,
    private contactPersonsFacade: ClientContactPersonsFacade,
    private leasingAgreementsFacade: LeasingAgreementsFacade
  ) {}

  ngOnInit(): void {
    // parent id (whatever your first :id is)
    this.recordId = Number(this.route.snapshot.paramMap.get('id'));

    // read from path OR query (whichever exists)
    const contactPersonId = this.getNumParam('contactPersonId'); // for edit/view routes
    let agreementIdInit = this.getNumParam('agreementId');
    let clientIdInit = this.getNumParam('clientId');

    // If your first :id is actually the agreement id, fall back to it
    if (agreementIdInit == null) agreementIdInit = this.recordId;

    // derive mode: query ? query : contactPersonId ? edit : add
    const qpMode = this.route.snapshot.queryParamMap.get('mode') as
      | 'add'
      | 'edit'
      | 'view'
      | null;
    this.mode = qpMode ?? (contactPersonId ? 'edit' : 'add');
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    console.log('[mode]', this.mode, {
      contactPersonId,
      agreementIdInit,
      clientIdInit,
    });

    this.addAgreementContactPersonsForm = this.fb.group({
      id: [null],
      agreementId: [agreementIdInit, Validators.required],
      contactPersonId: [null, Validators.required],
      clientId: [clientIdInit],
    });

    // load list of contact persons if we have clientId
    if (clientIdInit != null && Number.isFinite(clientIdInit)) {
      this.contactPersonsFacade.loadByClientId(clientIdInit);
      this.contactPersons$ = this.contactPersonsFacade.items$.pipe(
        startWith([] as ClientContactPerson[])
      );
    }

    // EDIT/VIEW: load current and patch form (sets id so submit uses PUT)
    if ((this.editMode || this.viewOnly) && contactPersonId) {
      this.facade.loadOne(contactPersonId);
      this.facade.current$
        .pipe(
          filter(
            (ct): ct is AgreementContactPerson =>
              !!ct && ct.id === contactPersonId
          ),
          take(1)
        )
        .subscribe((ct) => {
          this.addAgreementContactPersonsForm.patchValue({
            id: ct.id, // <-- ensures PUT path has a real id
            agreementId: Number(ct.agreementId ?? agreementIdInit),
            contactPersonId: ct.contactPersonId,
            clientId: ct.clientId ?? clientIdInit,
          });
          if (this.viewOnly) this.addAgreementContactPersonsForm.disable();
        });
    }
  }

  private getNumParam(name: string): number | undefined {
    const fromPath = this.route.snapshot.paramMap.get(name);
    const fromQuery = this.route.snapshot.queryParamMap.get(name);
    const v = fromPath ?? fromQuery;
    return v != null && v !== '' ? Number(v) : undefined;
  }

  addOrEditAgreementContactPersons() {
    if (this.addAgreementContactPersonsForm.invalid) {
      this.addAgreementContactPersonsForm.markAllAsTouched();
      return;
    }

    const { id, agreementId, clientId, contactPersonId } =
      this.addAgreementContactPersonsForm.getRawValue();

    const payload: Partial<AgreementContactPerson> = {
      id,
      agreementId,
      contactPersonId,
      clientId,
    };

    const isAdd = !id || this.mode === 'add';
    if (isAdd) {
      this.facade.create(payload); // POST
    } else {
      this.facade.update(id!, payload); // PUT /AgreementContactPersons/{id}
    }

    const recId = this.recordId; // already a number
    this.router.navigate([
      '/agreement',
      'activities',
      'wizard-agreement',
      'view-agreement-contact-persons',
      String(recId),
      String(agreementId ?? ''),
      String(clientId ?? ''),
    ]);
  }

  /** Called by the guard. */
  canDeactivate(): boolean {
    console.log('🛡️ canDeactivate called');
    return !this.addAgreementContactPersonsForm.dirty;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
