import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, forkJoin, filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../../shared/validators/arabic-only.validator';
import { ClientAddress } from '../../../../../crm/clients/store/client-addresses/client-address.model';
import { ClientAddressesFacade } from '../../../../../crm/clients/store/client-addresses/client-addresses.facade';
import { AddressType } from '../../../../../lookups/store/address-types/address-type.model';
import { selectAllAddressTypes } from '../../../../../lookups/store/address-types/address-types.selectors';
import { Area } from '../../../../../lookups/store/areas/area.model';
import { loadAreas } from '../../../../../lookups/store/areas/areas.actions';
import { selectAllAreas } from '../../../../../lookups/store/areas/areas.selectors';
import { loadCountries } from '../../../../../lookups/store/countries/countries.actions';
import { selectAllCountries } from '../../../../../lookups/store/countries/countries.selectors';
import { Country } from '../../../../../lookups/store/countries/country.model';
import { Governorate } from '../../../../../lookups/store/governorates/governorate.model';
import { loadGovernorates } from '../../../../../lookups/store/governorates/governorates.actions';
import { selectAllGovernorates } from '../../../../../lookups/store/governorates/governorates.selectors';

@Component({
  selector: 'app-add-agreement-registration',
  standalone: false,
  templateUrl: './add-agreement-registration.component.html',
  styleUrl: './add-agreement-registration.component.scss',
})
export class AddAgreementRegistrationComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addAgreementRegistrationsForm!: FormGroup;
  retrivedId: any;
  countriesList$!: Observable<Country[]>;
  governoratesList$!: Observable<Governorate[]>;
  areasList$!: Observable<Area[]>;
  addressTypesList$!: Observable<AddressType[]>;
  clientId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();
  countriesList: Country[] = [];
  governoratesList: Governorate[] = [];
  areasList: Area[] = [];
  filteredGovernorates: Governorate[] = [];
  filteredAreas: Area[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientAddressesFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    console.log('🟢 ngOnInit start');
    // 1️⃣ Read route parameters
    console.log(this.route.snapshot, 'route');
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

    //  Build the form
    this.addAgreementRegistrationsForm = this.fb.group({
      id: [null],
      date: [null, [Validators.required]],
      number: [null, [Validators.required]],
      ecraAuthentication: [null, [Validators.required]],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addAgreementRegistrationsForm.value
    );

    // 6️⃣ If add mode, seed clientId
    if (this.mode === 'add') {
      this.addAgreementRegistrationsForm.patchValue({
        clientId: this.clientId,
      });
      console.log('✏️ Add mode → patched clientId:', this.clientId);
    }

    // 8️⃣ If editing or viewing, load & patch
    if (this.editMode || this.viewOnly) {
      console.log('edit ', this.editMode, 'route', this.route.snapshot);
      this.recordId = Number(this.route.snapshot.paramMap.get('id'));
      console.log('🔄 Loading existing record id=', this.recordId);
      this.facade.loadOne(this.recordId);

      this.facade.current$
        .pipe(
          filter((ct) => !!ct && ct.id === this.recordId),
          take(1)
        )
        .subscribe((ct) => {
          // patch form
          this.addAgreementRegistrationsForm.patchValue({
            id: ct?.id,
          });
          console.log(
            '📝 Form after patchValue:',
            this.addAgreementRegistrationsForm.value
          );

          if (this.viewOnly) {
            console.log('🔐 viewOnly → disabling form');
            this.addAgreementRegistrationsForm.disable();
          }
        });
    } else if (this.viewOnly) {
      console.log('🔐 viewOnly (no id) → disabling form');
      this.addAgreementRegistrationsForm.disable();
    }
  }

  addOrEditAgreementRegistrations() {
    const clientParamQP = this.route.snapshot.queryParamMap.get('clientId');

    console.log('💥 addClientAddresses() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addAgreementRegistrationsForm.valid);
    console.log('  form touched:', this.addAgreementRegistrationsForm.touched);
    console.log(
      '  form raw value:',
      this.addAgreementRegistrationsForm.getRawValue()
    );

    if (this.addAgreementRegistrationsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addAgreementRegistrationsForm.markAllAsTouched();
      return;
    }

    this.addAgreementRegistrationsForm.patchValue({
      clientId: clientParamQP,
    });

    const { details, detailsAR, areaId, clientId, addressTypeId, isActive } =
      this.addAgreementRegistrationsForm.value;
    const payload: Partial<ClientAddress> = {
      details,
      detailsAR,
      areaId,
      clientId,
      addressTypeId,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addAgreementRegistrationsForm
      .value as Partial<ClientAddress>;
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
    if (this.addAgreementRegistrationsForm.valid) {
      this.addAgreementRegistrationsForm.markAsPristine();
    }

    if (clientParamQP) {
      console.log('➡️ Navigating back with PATH param:', clientParamQP);
      this.router.navigate([
        '/crm/clients/view-client-addresses',
        clientParamQP,
      ]);
    } else if (clientParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        clientParamQP
      );
      this.router.navigate([
        `/crm/clients/view-client-addresses/${clientParamQP}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: clientId is missing!');
    }
  }

  /** Called by the guard. */
  canDeactivate(): boolean {
    console.log('🛡️ canDeactivate called');
    return !this.addAgreementRegistrationsForm.dirty;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
