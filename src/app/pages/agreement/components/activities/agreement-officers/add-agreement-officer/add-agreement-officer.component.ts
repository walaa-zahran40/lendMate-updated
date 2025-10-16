import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subject,
  combineLatest,
  filter,
  map,
  startWith,
  take,
  tap,
} from 'rxjs';
import { AgreementOfficersFacade } from '../../../../store/agreement-officers/agreement-officers.facade';
import { ClientOfficersFacade } from '../../../../../crm/clients/store/client-officers/client-officers.facade';
import { ClientOfficer } from '../../../../../crm/clients/store/client-officers/client-officer.model';
import { LeasingAgreementsFacade } from '../../../../store/agreements/agreements.facade';
import { AgreementOfficer } from '../../../../store/agreement-officers/agreement-officer.model';
import { OfficersFacade } from '../../../../../organizations/store/officers/officers.facade';

@Component({
  selector: 'app-add-agreement-officer',
  standalone: false,
  templateUrl: './add-agreement-officer.component.html',
  styleUrl: './add-agreement-officer.component.scss',
})
export class AddAgreementOfficerComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addAgreementOfficersForm!: FormGroup;
  retrivedId: any;
  clientId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();
  officers$!: Observable<AgreementOfficer[]>;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AgreementOfficersFacade,
    private officersFacade: OfficersFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    // parent id (whatever your first :id is)
    this.recordId = Number(this.route.snapshot.paramMap.get('id'));

    // read from path OR query (whichever exists)
    const officerId = this.getNumParam('officerId'); // for edit/view routes
    let agreementIdInit = this.getNumParam('agreementId');
    let clientIdInit = this.getNumParam('clientId');

    // If your first :id is actually the agreement id, fall back to it
    if (agreementIdInit == null) agreementIdInit = this.recordId;

    // derive mode: query ? query : officerId ? edit : add
    const qpMode = this.route.snapshot.queryParamMap.get('mode') as
      | 'add'
      | 'edit'
      | 'view'
      | null;
    this.mode = qpMode ?? (officerId ? 'edit' : 'add');
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    console.log('[mode]', this.mode, {
      officerId,
      agreementIdInit,
      clientIdInit,
    });

    this.addAgreementOfficersForm = this.fb.group({
      id: [null],
      agreementId: [agreementIdInit, Validators.required],
      officerId: [null, Validators.required], // <-- use client officer row id
      clientId: [clientIdInit],
    });
    this.officersFacade.loadAll?.(); // or whatever your facade method is (loadList/getAll)
    const selectedOfficerId$ = this.facade.items$.pipe(
      map((rows) => rows?.[0]?.officerId), // adjust if you can have multiple
      filter((id): id is number => !!id)
    );

    this.officers$ = combineLatest([
      this.officersFacade.items$,
      selectedOfficerId$,
    ]).pipe(
      map(([all, id]) => all.filter((o: any) => o.id === id)),
      startWith([])
    );

    this.facade.loadByAgreementId(agreementIdInit);
    // EDIT/VIEW: patch the selected officerId
    if ((this.editMode || this.viewOnly) && officerId) {
      this.facade.loadOne(officerId);
      this.facade.current$
        .pipe(
          filter((ct): ct is AgreementOfficer => !!ct && ct.id === officerId),
          take(1)
        )
        .subscribe((ct) => {
          this.addAgreementOfficersForm.patchValue({
            id: ct.id,
            agreementId: Number(ct.agreementId ?? agreementIdInit),
            officerId: Number(ct.officerId), // 👈 this selects the officer in the dropdown
            clientId: Number(ct.clientId ?? clientIdInit),
          });
          if (this.viewOnly) this.addAgreementOfficersForm.disable();
        });
    }
  }

  private getNumParam(name: string): number | undefined {
    const fromPath = this.route.snapshot.paramMap.get(name);
    const fromQuery = this.route.snapshot.queryParamMap.get(name);
    const v = fromPath ?? fromQuery;
    return v != null && v !== '' ? Number(v) : undefined;
  }

  addOrEditAgreementOfficers() {
    if (this.addAgreementOfficersForm.invalid) {
      this.addAgreementOfficersForm.markAllAsTouched();
      return;
    }

    const { id, agreementId, clientId, officerId } =
      this.addAgreementOfficersForm.getRawValue();

    const payload: Partial<AgreementOfficer> = {
      id,
      agreementId,
      officerId,
      clientId,
    };

    const isAdd = !id || this.mode === 'add';
    if (isAdd) {
      this.facade.create(payload); // POST
    } else {
      this.facade.update(id!, payload); // PUT /AgreementOfficers/{id}
    }

    const recId = this.recordId; // already a number
    this.router.navigate([
      '/agreement',
      'activities',
      'wizard-agreement',
      'view-agreement-officers',
      String(recId),
      String(agreementId ?? ''),
      String(clientId ?? ''),
    ]);
  }

  /** Called by the guard. */
  canDeactivate(): boolean {
    console.log('🛡️ canDeactivate called');
    return !this.addAgreementOfficersForm.dirty;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
