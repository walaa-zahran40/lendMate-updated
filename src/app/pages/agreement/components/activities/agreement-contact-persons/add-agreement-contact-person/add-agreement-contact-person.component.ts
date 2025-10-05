import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  Observable,
  filter,
  take,
  map,
  tap,
  shareReplay,
  startWith,
  switchMap,
  distinctUntilChanged,
} from 'rxjs';
import { ClientAddress } from '../../../../../crm/clients/store/client-addresses/client-address.model';
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
    this.recordId = Number(this.route.snapshot.paramMap.get('id'));
    this.clientId = Number(this.route.snapshot.queryParams['clientId']);

    this.mode =
      (this.route.snapshot.queryParamMap.get('mode') as
        | 'add'
        | 'edit'
        | 'view') ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    console.log('🔍 Params:', {
      clientId: this.clientId,
      mode: this.mode,
      editMode: this.editMode,
      viewOnly: this.viewOnly,
    });
    console.log('[agreements] dispatching loadById →', this.recordId);
    this.leasingAgreementsFacade.loadById(this.recordId);

    // 1) Resolve clientId from agreement OR query param fallback
    const clientId$ = this.leasingAgreementsFacade.selected$.pipe(
      tap((item) => console.log('[selected$] emission →', item)),
      map(
        (item) =>
          item?.clientId ?? item?.clientView?.clientId ?? this.clientId ?? null
      ),
      tap((id) => console.log('[selected$] mapped clientId →', id)),
      filter((id): id is number => Number.isFinite(id)),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // 2) contactPersons$ = (trigger load) -> stream items from the store
    this.contactPersons$ = clientId$.pipe(
      tap((id) => {
        console.log('[contactPersons] loadByClientId →', id);
        this.contactPersonsFacade.loadByClientId(id);
      }),
      switchMap(() => this.contactPersonsFacade.items$), // adjust to your facade's selector name
      startWith([] as ClientContactPerson[]),
      tap((list) =>
        console.log('[contactPersons] items len →', list?.length ?? 0)
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    //  Build the form
    this.addAgreementContactPersonsForm = this.fb.group({
      id: [null],
      leasingAgreementId: [this.recordId],
      contactPersonId: [null, [Validators.required]],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addAgreementContactPersonsForm.value
    );

    // 6️⃣ If add mode, seed clientId
    if (this.mode === 'add') {
      this.addAgreementContactPersonsForm.patchValue({
        clientId: this.clientId,
      });
      console.log('✏️ Add mode → patched clientId:', this.clientId);
    }

    // 8️⃣ If editing or viewing, load & patch
    if (this.editMode || this.viewOnly) {
      console.log('edit ', this.editMode, 'route', this.route.snapshot);
      console.log('🔄 Loading existing record id=', this.recordId);
      this.facade.loadOne(this.recordId);

      this.facade.current$
        .pipe(
          filter((ct) => !!ct && ct.id === this.recordId),
          take(1)
        )
        .subscribe((ct) => {
          // patch form
          this.addAgreementContactPersonsForm.patchValue({
            id: ct?.id,
          });
          console.log(
            '📝 Form after patchValue:',
            this.addAgreementContactPersonsForm.value
          );

          if (this.viewOnly) {
            console.log('🔐 viewOnly → disabling form');
            this.addAgreementContactPersonsForm.disable();
          }
        });
    } else if (this.viewOnly) {
      console.log('🔐 viewOnly (no id) → disabling form');
      this.addAgreementContactPersonsForm.disable();
    }
  }

  addOrEditAgreementContactPersons() {
    const clientParamQP = this.route.snapshot.paramMap.get('clientId');
    const agreementId = this.route.snapshot.paramMap.get('agreementId');
    const routeId = this.route.snapshot.params['id'];
    console.log('💥 addClientAddresses() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addAgreementContactPersonsForm.valid);
    console.log('  form touched:', this.addAgreementContactPersonsForm.touched);
    console.log(
      '  form raw value:',
      this.addAgreementContactPersonsForm.getRawValue()
    );

    if (this.addAgreementContactPersonsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addAgreementContactPersonsForm.markAllAsTouched();
      return;
    }

    this.addAgreementContactPersonsForm.patchValue({
      clientId: clientParamQP,
      agreementId: agreementId,
    });

    const { id, clientId, contactPersonId } =
      this.addAgreementContactPersonsForm.value;
    const payload: Partial<AgreementContactPerson> = {
      id,
      clientId,
      contactPersonId,
    };
    console.log('  → payload object:', payload);

    const data = this.addAgreementContactPersonsForm
      .value as Partial<ClientAddress>;
    console.log('📦 Payload going to facade:', data);

    console.log('  route.snapshot.paramMap.get(retrivedId):', routeId);

    if (this.mode === 'add') {
      console.log('➕ Dispatching CREATE');
      this.facade.create(payload);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.facade.update(data.id!, data);
    }
    if (this.addAgreementContactPersonsForm.valid) {
      this.addAgreementContactPersonsForm.markAsPristine();
    }

    if (clientParamQP) {
      console.log('➡️ Navigating back with PATH param:', clientParamQP);
      this.router.navigate([
        '/agreement/activities/wizard-agreement/view-agreement-contactPersons',
        routeId,
        agreementId,
        clientParamQP,
      ]);
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        clientParamQP
      );
    } else if (!clientParamQP) {
      this.router.navigate([
        `/agreement/activities/wizard-agreement/view-agreement-contactPersons/${id}/${agreementId}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: clientId is missing!');
    }
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
