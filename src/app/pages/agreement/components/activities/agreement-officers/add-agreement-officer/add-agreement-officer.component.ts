import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, filter, take } from 'rxjs';
import { ClientAddress } from '../../../../../crm/clients/store/client-addresses/client-address.model';
import { ClientAddressesFacade } from '../../../../../crm/clients/store/client-addresses/client-addresses.facade';
import { AddressType } from '../../../../../lookups/store/address-types/address-type.model';
import { Area } from '../../../../../lookups/store/areas/area.model';
import { Country } from '../../../../../lookups/store/countries/country.model';
import { Governorate } from '../../../../../lookups/store/governorates/governorate.model';
import { Officer } from '../../../../../organizations/store/officers/officer.model';
import { OfficersFacade } from '../../../../../organizations/store/officers/officers.facade';
import { AgreementOfficersFacade } from '../../../../store/agreement-officers/agreement-officers.facade';

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
  officers$!: Observable<Officer[]>;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AgreementOfficersFacade,
    private router: Router,
    private officersFacade: OfficersFacade
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
    this.officersFacade.loadAll();
    this.officers$ = this.officersFacade.items$;
    //  Build the form
    this.addAgreementOfficersForm = this.fb.group({
      id: [null],
      leasingAgreementId: [this.recordId],
      officerId: [null, [Validators.required]],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addAgreementOfficersForm.value
    );

    // 6️⃣ If add mode, seed clientId
    if (this.mode === 'add') {
      this.addAgreementOfficersForm.patchValue({
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
          this.addAgreementOfficersForm.patchValue({
            id: ct?.id,
          });
          console.log(
            '📝 Form after patchValue:',
            this.addAgreementOfficersForm.value
          );

          if (this.viewOnly) {
            console.log('🔐 viewOnly → disabling form');
            this.addAgreementOfficersForm.disable();
          }
        });
    } else if (this.viewOnly) {
      console.log('🔐 viewOnly (no id) → disabling form');
      this.addAgreementOfficersForm.disable();
    }
  }

  addOrEditAgreementOfficers() {
    const clientParamQP = this.route.snapshot.queryParamMap.get('clientId');

    console.log('💥 addClientAddresses() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addAgreementOfficersForm.valid);
    console.log('  form touched:', this.addAgreementOfficersForm.touched);
    console.log(
      '  form raw value:',
      this.addAgreementOfficersForm.getRawValue()
    );

    if (this.addAgreementOfficersForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addAgreementOfficersForm.markAllAsTouched();
      return;
    }

    this.addAgreementOfficersForm.patchValue({
      clientId: clientParamQP,
    });

    const { details, detailsAR, areaId, clientId, addressTypeId, isActive } =
      this.addAgreementOfficersForm.value;
    const payload: Partial<ClientAddress> = {
      details,
      detailsAR,
      areaId,
      clientId,
      addressTypeId,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addAgreementOfficersForm.value as Partial<ClientAddress>;
    console.log('📦 Payload going to facade:', data);

    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(retrivedId):', routeId);

    if (this.mode === 'add') {
      console.log('➕ Dispatching CREATE');
      this.facade.create(payload);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.facade.update(data.id!, data);
    }
    if (this.addAgreementOfficersForm.valid) {
      this.addAgreementOfficersForm.markAsPristine();
    }

    if (clientParamQP) {
      console.log('➡️ Navigating back with PATH param:', clientParamQP);
      this.router.navigate([
        '/agreement/activities/wizard-agreement/view-agreement-officers',
        clientParamQP,
      ]);
    } else if (clientParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        clientParamQP
      );
      this.router.navigate([
        `/agreement/activities/wizard-agreement/view-agreement-officers/${clientParamQP}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: clientId is missing!');
    }
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
