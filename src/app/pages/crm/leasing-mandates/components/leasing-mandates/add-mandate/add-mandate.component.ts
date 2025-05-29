import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

//Models
import { Client } from '../../../../clients/store/_clients/allclients/client.model';
import { MandateValidityUnit } from '../../../../../lookups/store/mandate-validity-units/mandate-validity-unit.model';
import { Product } from '../../../../../lookups/store/products/product.model';
import { LeasingType } from '../../../../../lookups/store/leasing-types/leasing-type.model';
import { InsuredBy } from '../../../../../lookups/store/insured-by/insured-by.model';
import { Officer } from '../../../../../organizations/store/officers/officer.model';
import { PeriodUnit } from '../../../../../lookups/store/period-units/period-unit.model';
import { FeeType } from '../../../../../lookups/store/fee-types/fee-type.model';
import { AssetType } from '../../../../../lookups/store/asset-types/asset-type.model';
import { Mandate } from '../../../store/leasing-mandates/leasing-mandate.model';
//Facades
import { ClientsFacade } from '../../../../clients/store/_clients/allclients/clients.facade';
import { MandateValidityUnitsFacade } from '../../../../../lookups/store/mandate-validity-units/mandate-validity-units.facade';
import { ProductsFacade } from '../../../../../lookups/store/products/products.facade';
import { LeasingTypesFacade } from '../../../../../lookups/store/leasing-types/leasing-types.facade';
import { InsuredByFacade } from '../../../../../lookups/store/insured-by/insured-by.facade';
import { OfficersFacade } from '../../../../../organizations/store/officers/officers.facade';
import { ClientContactPersonsFacade } from '../../../../clients/store/client-contact-persons/client-contact-persons.facade';
import { FeeTypesFacade } from '../../../../../lookups/store/fee-types/fee-types.facade';
import { GracePeriodUnitsFacade } from '../../../../../lookups/store/period-units/period-units.facade';
import { AssetTypesFacade } from '../../../../../lookups/store/asset-types/asset-types.facade';
import { MandatesFacade } from '../../../store/leasing-mandates/leasing-mandates.facade';
//Actions
import { loadAll } from '../../../../clients/store/_clients/allclients/clients.actions';
import { loadAll as loadValidityUnits } from '../../../../../lookups/store/mandate-validity-units/mandate-validity-units.actions';
import { loadAll as loadProducts } from '../../../../../lookups/store/products/products.actions';
import { loadAll as loadLeasingTypes } from '../../../../../lookups/store/leasing-types/leasing-types.actions';
import { loadAll as loadInsuredBy } from '../../../../../lookups/store/insured-by/insured-by.actions';
import { loadOfficers } from '../../../../../organizations/store/officers/officers.actions';
import { loadAll as loadAssetTypes } from '../../../../../lookups/store/asset-types/asset-types.actions';
import { loadAll as loadFeeTypes } from '../../../../../lookups/store/fee-types/fee-types.actions';
import { loadAll as loadGracePeriods } from '../../../../../lookups/store/period-units/period-units.actions';

@Component({
  selector: 'app-add-mandate',
  standalone: false,
  templateUrl: './add-mandate.component.html',
  styleUrl: './add-mandate.component.scss',
})
export class AddMandateComponent {
  addMandateShowBasicForm!: FormGroup;
  addMandateShowOfficersForm!: FormGroup;
  addMandateShowContactPersonsForm!: FormGroup;
  addMandateShowAssetTypeForm!: FormGroup;
  addMandateShowMoreInformationForm!: FormGroup;
  editMode: boolean = false;
  viewOnly: boolean = false;
  clientNames$!: Observable<Client[]>;
  validityUnits$!: Observable<MandateValidityUnit[]>;
  products$!: Observable<Product[]>;
  leasingTypes$!: Observable<LeasingType[]>;
  insuredBy$!: Observable<InsuredBy[]>;
  officers$!: Observable<Officer[]>;
  contactPersons$!: Observable<any>;
  assetTypes$!: Observable<AssetType[]>;
  gracePeriodUnits$!: Observable<PeriodUnit[]>;
  feeTypes$!: Observable<FeeType[]>;
  parentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private clientFacade: ClientsFacade,
    private validityUnitFacade: MandateValidityUnitsFacade,
    private productFacade: ProductsFacade,
    private leasingTypeFacade: LeasingTypesFacade,
    private insuredByFacade: InsuredByFacade,
    private officersFacade: OfficersFacade,
    private contactPersonsFacade: ClientContactPersonsFacade,
    private assetTypesFacade: AssetTypesFacade,
    private feeTypesFacade: FeeTypesFacade,
    private gracePeriodUnitsFacade: GracePeriodUnitsFacade,
    private route: ActivatedRoute,
    private facade: MandatesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    // 1️⃣ Build all form‐groups (so that patchMandate always finds them)
    this.buildMandateShowBasicForm();
    this.buildMandateShowOfficersForm();
    this.buildMandateShowContactPersonsForm();
    this.buildMandateShowAssetTypeForm();
    this.buildMandateShowMoreInformationForm();
    // 2️⃣ Combine into parentForm
    this.parentForm = this.fb.group({
      basic: this.addMandateShowBasicForm,
      officers: this.addMandateShowOfficersForm,
      contacts: this.addMandateShowContactPersonsForm,
      assets: this.addMandateShowAssetTypeForm,
      moreInfo: this.addMandateShowMoreInformationForm,
    });
    // 3️⃣ Load your lookups…
    this.store.dispatch(loadAll({}));
    this.store.dispatch(loadValidityUnits({}));
    this.store.dispatch(loadProducts({}));
    this.store.dispatch(loadLeasingTypes({}));
    this.store.dispatch(loadInsuredBy({}));
    this.store.dispatch(loadOfficers());
    this.store.dispatch(loadAssetTypes({}));
    this.store.dispatch(loadFeeTypes({}));
    this.store.dispatch(loadGracePeriods({}));
    //Clients Dropdown
    this.clientNames$ = this.clientFacade.all$;
    //Mandate Validity Units Dropdown
    this.validityUnits$ = this.validityUnitFacade.all$;
    //Products Dropdown
    this.products$ = this.productFacade.all$;
    //Leasing Types Dropdown
    this.leasingTypes$ = this.leasingTypeFacade.all$;
    //Insured By Dropdown
    this.insuredBy$ = this.insuredByFacade.all$;
    //Officers Dropdown
    this.officers$ = this.officersFacade.items$;
    //Asset Type Dropdown
    this.assetTypes$ = this.assetTypesFacade.all$;
    //Fee Types Dropdown
    this.feeTypes$ = this.feeTypesFacade.all$;
    //Grace Period Units Dropdown
    this.gracePeriodUnits$ = this.gracePeriodUnitsFacade.all$;
    //Contact Persons Dropdown
    this.contactPersons$ = this.contactPersonsFacade.items$.pipe(
      map((list) => list || [])
    );

    // 4️⃣ Watch the route for changes
    this.route.paramMap
      .pipe(
        map((pm) => +pm.get('leasingId')!),
        filter((id) => !!id),
        tap((id) => {
          console.log('[ngOnInit] 👉 got leasingId from route:', id);
          this.editMode =
            this.route.snapshot.queryParamMap.get('mode') === 'edit';
          this.viewOnly =
            this.route.snapshot.queryParamMap.get('mode') === 'view';
          console.log(
            '[ngOnInit] ✏️ editMode=',
            this.editMode,
            'viewOnly=',
            this.viewOnly
          );
          console.log('[ngOnInit] ➡️ dispatching loadById(', id, ')');
          this.facade.loadById(id);
        }),
        switchMap((id) =>
          this.facade.selectedMandate$.pipe(
            tap((m) => console.log('[selectedMandate$] emitted:', m)),
            filter((m): m is Mandate => m != null && m.id === id),
            tap((m) => console.log('[selectedMandate$] passed filter:', m)),
            take(1)
          )
        )
      )
      .subscribe(
        (mandate) => {
          console.log('[ngOnInit] 🎯 subscribe got mandate:', mandate);
          this.patchMandate(mandate);
        },
        (err) => console.error('[ngOnInit] ❌ subscription error:', err)
      );

    this.basicForm
      .get('clientId')!
      .valueChanges.pipe(
        filter((id) => !!id),
        distinctUntilChanged()
      )
      .subscribe((clientId) => {
        // load only that client’s people into “items”
        this.contactPersonsFacade.loadByClientId(clientId);
      });
  }
  private patchMandate(m: Mandate) {
    console.log('[patchMandate] ▶️ start patch for mandate:', m);

    // derive IDs, falling back to view‐models if needed
    const clientId = m.clientId ?? m.clientView?.clientId;
    const validityUnitId =
      m.validityUnitId ?? m.validityUnitView?.validityUnitId;
    const graceView =
      m.mandateGracePeriodSettingView ?? m.mandateGracePeriodSetting;
    const graceCount = graceView?.gracePeriodCount;
    const graceUnitId = graceView?.gracePeriodUnitId;

    console.log('[patchMandate] ⚙️ derived values →', {
      clientId,
      validityUnitId,
      graceCount,
      graceUnitId,
    });
    // log form state before patch
    console.log(
      '[patchMandate] — form before patch:',
      this.parentForm.getRawValue()
    );

    // 1️⃣ Patch everything in one go
    this.parentForm.patchValue({
      basic: {
        id: m.id,
        parentMandateId: m.parentMandateId,
        clientId,
        validityUnitId,
        productId: m.productId,
        leasingTypeId: m.leasingTypeId,
        insuredById: m.insuredById,
      },
      moreInfo: {
        date: m.date,
        notes: m.notes,
        description: m.description,
        validityCount: m.validityCount,
        indicativeRentals: m.indicativeRentals,
        mandateGracePeriodSetting: {
          gracePeriodCount: graceCount,
          gracePeriodUnitId: graceUnitId,
        },
      },
    });

    // log the raw form state immediately after patching
    console.log(
      '[patchMandate] — form after patch:',
      this.parentForm.getRawValue()
    );
    console.log('[patchMandate] — basicForm value:', this.basicForm.value);
    console.log(
      '[patchMandate] — moreInfoForm value:',
      this.moreInfoForm.value
    );
    console.log(
      '[patchMandate] — gracePeriodSetting group:',
      this.moreInfoForm.get('mandateGracePeriodSetting')?.value
    );

    // 2️⃣ Reset each FormArray as before
    const resetArray = (
      fa: FormArray,
      items: any[],
      factory: () => FormGroup,
      name: string
    ) => {
      console.log(`[patchMandate] — resetting ${name}, items=`, items);
      fa.clear();
      items.forEach((item, i) => {
        try {
          const fg = factory();
          fg.patchValue(item);
          fa.push(fg);
        } catch (err) {
          console.error(`✖️ error patching ${name}[${i}]`, item, err);
        }
      });
      console.log(`✅ ${name}.length =`, fa.length);
    };

    resetArray(
      this.mandateOfficers,
      m.mandateOfficers || [],
      () => this.createMandateOfficerGroup(),
      'mandateOfficers'
    );
    resetArray(
      this.mandateContactPersons,
      m.mandateContactPersons || [],
      () => this.createMandateContactPersonGroup(),
      'mandateContactPersons'
    );
    resetArray(
      this.mandateAssetTypes,
      m.mandateAssetTypes || [],
      () => this.createAssetTypeGroup(),
      'mandateAssetTypes'
    );
    resetArray(
      this.mandateFees,
      m.mandateFees || [],
      () => this.createMandateFeesGroup(),
      'mandateFees'
    );

    // 3️⃣ Finally disable if viewOnly
    if (this.viewOnly) {
      console.log('[patchMandate] — viewOnly, disabling parentForm');
      this.parentForm.disable({ emitEvent: false });
    }

    console.log('[patchMandate] ✅ patch complete');
  }
  buildMandateShowBasicForm(): void {
    this.addMandateShowBasicForm = this.fb.group({
      id: [null],
      parentMandateId: [null],
      clientId: [null, Validators.required],
      validityUnitId: [null, Validators.required],
      productId: [null, Validators.required],
      leasingTypeId: [null, Validators.required],
      insuredById: [null, Validators.required],
    });
  }
  buildMandateShowOfficersForm(): void {
    this.addMandateShowOfficersForm = this.fb.group({
      mandateOfficers: this.fb.array([this.createMandateOfficerGroup()]),
    });
  }
  buildMandateShowContactPersonsForm(): void {
    this.addMandateShowContactPersonsForm = this.fb.group({
      id: [null],
      mandateContactPersons: this.fb.array([
        this.createMandateContactPersonGroup(),
      ]),
    });
  }
  createMandateOfficerGroup(): FormGroup {
    return this.fb.group({
      id: [],
      officerId: [null, Validators.required],
    });
  }
  createMandateContactPersonGroup(): FormGroup {
    return this.fb.group({
      contactPersonId: ['', Validators.required],
    });
  }

  buildMandateShowAssetTypeForm(): void {
    this.addMandateShowAssetTypeForm = this.fb.group({
      mandateAssetTypes: this.fb.array([this.createAssetTypeGroup()]),
    });
  }
  createAssetTypeGroup(): FormGroup {
    return this.fb.group({
      assetTypeId: ['', Validators.required],
      assetsTypeDescription: [null, Validators.required],
    });
  }

  buildMandateShowMoreInformationForm(): void {
    this.addMandateShowMoreInformationForm = this.fb.group({
      date: [null, Validators.required],
      notes: [null, Validators.required],
      description: [null, Validators.required],
      validityCount: [null, Validators.required],
      indicativeRentals: [null, Validators.required],
      mandateFees: this.fb.array([this.createMandateFeesGroup()]),
      mandateGracePeriodSetting: this.createMandateGracePeriodSettingGroup(),
    });
  }
  createMandateFeesGroup(): FormGroup {
    return this.fb.group({
      feeTypeId: [null],
      actualAmount: [null],
      actualPrecentage: [null],
    });
  }

  createMandateGracePeriodSettingGroup(): FormGroup {
    return this.fb.group({
      gracePeriodCount: [null],
      gracePeriodUnitId: [null],
    });
  }

  addOfficer() {
    console.log('Adding new identity group');
    this.mandateOfficers?.push(this.createMandateOfficerGroup());
  }

  removeOfficer(i: number) {
    console.log('Removing identity group at index', i);
    if (this.mandateOfficers.length > 1) {
      this.mandateOfficers.removeAt(i);
    }
  }
  addContactPerson() {
    console.log('Adding new identity group');
    this.mandateContactPersons?.push(this.createMandateContactPersonGroup());
  }

  removeContactPerson(i: number) {
    console.log('Removing identity group at index', i);
    if (this.mandateContactPersons.length > 1) {
      this.mandateContactPersons.removeAt(i);
    }
  }
  addAssetType() {
    console.log('Adding new Asset Type group');
    this.mandateAssetTypes?.push(this.createAssetTypeGroup());
  }

  removeAssetType(i: number) {
    console.log('Removing Asset Type at index', i);
    if (this.mandateAssetTypes.length > 1) {
      this.mandateAssetTypes.removeAt(i);
    }
  }
  addFee() {
    console.log('Adding new mandate Fees group');
    this.mandateFees?.push(this.createMandateFeesGroup());
  }

  removeFee(i: number) {
    console.log('Removing mandate Fees at index', i);
    if (this.mandateFees.length > 1) {
      this.mandateFees.removeAt(i);
    }
  }
  get mandateOfficers(): FormArray {
    return this.addMandateShowOfficersForm.get('mandateOfficers') as FormArray;
  }
  get mandateContactPersons(): FormArray {
    return this.addMandateShowContactPersonsForm.get(
      'mandateContactPersons'
    ) as FormArray;
  }
  get mandateAssetTypes(): FormArray {
    return this.addMandateShowAssetTypeForm.get(
      'mandateAssetTypes'
    ) as FormArray;
  }
  get mandateFees(): FormArray {
    return this.addMandateShowMoreInformationForm.get(
      'mandateFees'
    ) as FormArray;
  }
  get mandateGracePeriods(): FormArray {
    return this.addMandateShowMoreInformationForm.get(
      'mandateGracePeriodSetting'
    ) as FormArray;
  }

  get officersForm(): FormGroup {
    // the `!` tells TS “I guarantee there’s a value here”
    // and the `as FormGroup` tells it the exact type
    return this.parentForm.get('officers')! as FormGroup;
  }
  get contactsForm(): FormGroup {
    // the `!` tells TS “I guarantee there’s a value here”
    // and the `as FormGroup` tells it the exact type
    return this.parentForm.get('contacts')! as FormGroup;
  }
  get assetsForm(): FormGroup {
    // this never returns null at runtime, so we assert with `!` then cast
    return this.parentForm.get('assets')! as FormGroup;
  }
  get moreInfoForm(): FormGroup {
    // the `!` tells TS “I guarantee there’s a value here”
    // and the `as FormGroup` tells it the exact type
    return this.parentForm.get('moreInfo')! as FormGroup;
  }
  get basicForm(): FormGroup {
    return this.parentForm?.get('basic')! as FormGroup;
  }
  viewContactPersons(clientId?: number) {
    if (!clientId) {
      console.warn('No client selected, aborting navigation.');
      return;
    }
    this.router.navigate(['/crm/clients/view-contact-persons', clientId]);
  }

  onSubmit() {
    console.log('💥 addOrEditIdentificationTypes() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.parentForm.valid);
    console.log('  form touched:', this.parentForm.touched);
    console.log('  form raw value:', this.parentForm.getRawValue());

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.parentForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.parentForm.markAllAsTouched();
      return;
    }

    const { assets, basic, contacts, officers, moreInfo } =
      this.parentForm.value;
    const payload: Partial<Mandate> = {
      ...basic,
      mandateOfficers: officers.mandateOfficers,
      mandateContactPersons: contacts.mandateContactPersons,
      mandateAssetTypes: assets.mandateAssetTypes,

      ...moreInfo,
    };
    console.log('  → payload object:', payload);

    // Double-check your route param
    // console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const leaseId = +this.route.snapshot.paramMap.get('leasingId')!;

      // pull out each group
      const { basic, assets, contacts, officers, moreInfo } =
        this.parentForm.value;
      console.log('ffff', this.parentForm.value);
      // build the flat payload
      const payload = {
        id: basic.id,
        parentMandateId: basic.parentMandateId,
        clientId: basic.clientId,
        validityUnitId: basic.validityUnitId,
        productId: basic.productId,
        leasingTypeId: basic.leasingTypeId,
        insuredById: basic.insuredById,

        // from your "moreInfo" group
        description: moreInfo.description,
        date: moreInfo.date,
        notes: moreInfo.notes,
        validityCount: moreInfo.validityCount,
        indicativeRentals: moreInfo.indicativeRentals,
        mandateFees: moreInfo.mandateFees,
        mandateGracePeriodSetting: moreInfo.mandateGracePeriodSetting,

        // your array groups, renamed to match the API
        mandateAssetTypes: assets.mandateAssetTypes,
        mandateContactPersons: contacts.mandateContactPersons,
        mandateOfficers: officers.mandateOfficers,
      };

      console.log('→ PUT payload:', payload);
      this.facade.update(leaseId, payload);
    } else {
      console.log('➕ Dispatching CREATE payload=', payload);
      this.facade.create(payload);
    }

    console.log('🧭 Navigating away to view-mandates');
    this.router.navigate(['/crm/leasing-mandates/view-mandates']);
  }
  navigateToView() {
    this.router.navigate(['/crm/leasing-mandates/view-mandates']);
  }
}
