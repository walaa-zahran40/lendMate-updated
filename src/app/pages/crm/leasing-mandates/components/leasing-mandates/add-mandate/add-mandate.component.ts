import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, take } from 'rxjs/operators';

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
    //Edit and view Modes
    console.log('route', this.route.snapshot);
    // 6️⃣ Now check for an ID in the route, load & patch
    const idParam = this.route.snapshot.paramMap.get('leasingId');
    const modeParam = this.route.snapshot.queryParamMap.get('mode');
    if (idParam) {
      const mandateId = +idParam;
      this.editMode = modeParam === 'edit';
      this.viewOnly = modeParam === 'view';

      // trigger load of the single mandate
      this.facade.loadById(mandateId);

      // patch *after* forms are ready
      this.patchMandate(mandateId);
    }
    //1-Mandate Basic Info Form
    this.buildMandateShowBasicForm();
    //Clients Dropdown
    this.store.dispatch(loadAll({}));
    this.clientNames$ = this.clientFacade.all$;
    //Mandate Validity Units Dropdown
    this.store.dispatch(loadValidityUnits({}));
    this.validityUnits$ = this.validityUnitFacade.all$;
    //Products Dropdown
    this.store.dispatch(loadProducts({}));
    this.products$ = this.productFacade.all$;
    //Leasing Types Dropdown
    this.store.dispatch(loadLeasingTypes({}));
    this.leasingTypes$ = this.leasingTypeFacade.all$;
    //Insured By Dropdown
    this.store.dispatch(loadInsuredBy({}));
    this.insuredBy$ = this.insuredByFacade.all$;
    //2-Mandate Officers Form
    this.buildMandateShowOfficersForm();
    //Officers Dropdown
    this.store.dispatch(loadOfficers());
    this.officers$ = this.officersFacade.items$;
    //3-Contact Persons Form
    this.buildMandateShowContactPersonsForm();
    //4`-Asset Type Form
    this.buildMandateShowAssetTypeForm();
    //Asset Type Dropdown
    this.store.dispatch(loadAssetTypes({}));
    this.assetTypes$ = this.assetTypesFacade.all$;
    //5`-More Information Form
    this.buildMandateShowMoreInformationForm();
    //Fee Types Dropdown
    this.store.dispatch(loadFeeTypes({}));
    this.feeTypes$ = this.feeTypesFacade.all$;
    //Grace Period Units Dropdown
    this.store.dispatch(loadGracePeriods({}));
    this.gracePeriodUnits$ = this.gracePeriodUnitsFacade.all$;
    //Combine all forms into a single FormGroup
    this.parentForm = this.fb.group({
      basic: this.addMandateShowBasicForm,
      officers: this.addMandateShowOfficersForm,
      contacts: this.addMandateShowContactPersonsForm,
      assets: this.addMandateShowAssetTypeForm,
      moreInfo: this.addMandateShowMoreInformationForm,
    });
    //Contact Persons Dropdown
    this.contactPersons$ = this.contactPersonsFacade.items$.pipe(
      map((list) => list || [])
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
  private patchMandate(id: number) {
    this.facade.selectedMandate$
      .pipe(
        filter((m) => !!m && m.id === id),
        take(1)
      )
      .subscribe({
        next: (m) => {
          console.log('[patchMandate] ▶️ mandate payload:', m);

          // 1️⃣ Patch basic form
          const basicPatch = {
            id: m?.id,
            parentMandateId: m?.parentMandateId,
            clientId: m?.clientId,
            validityUnitId: m?.validityUnitId,
            productId: m?.productId,
            leasingTypeId: m?.leasingTypeId,
            insuredById: m?.insuredById,
          };
          console.log('[patchMandate] — patching basicForm with', basicPatch);
          this.basicForm.patchValue(basicPatch);

          // 2️⃣ Patch moreInfo form
          const moreInfoPatch = {
            date: m?.date,
            notes: m?.notes,
            description: m?.description,
            validityCount: m?.validityCount,
            indicativeRentals: m?.indicativeRentals,
          };
          console.log(
            '[patchMandate] — patching moreInfoForm with',
            moreInfoPatch
          );
          this.moreInfoForm.patchValue(moreInfoPatch);

          // 3️⃣ Helper to reset arrays with try/catch
          const resetArray = (
            fa: FormArray,
            groups: any[],
            factory: () => FormGroup,
            name: string
          ) => {
            console.log(`[patchMandate] — resetting ${name}, groups=`, groups);
            fa.clear();
            groups.forEach((g, i) => {
              try {
                const fg = factory();
                fg.patchValue(g);
                fa.push(fg);
              } catch (err) {
                console.error(
                  `[patchMandate] ✖️ error patching ${name}[${i}]`,
                  g,
                  err
                );
              }
            });
            console.log(`[patchMandate] ✅ ${name}.length =`, fa.length);
          };

          // 4️⃣ Reset each FormArray
          resetArray(
            this.mandateOfficers,
            m?.mandateOfficers || [],
            () => this.createMandateOfficerGroup(),
            'mandateOfficers'
          );
          resetArray(
            this.mandateContactPersons,
            m?.mandateContactPersons || [],
            () => this.createMandateContactPersonGroup(),
            'mandateContactPersons'
          );
          resetArray(
            this.mandateAssetTypes,
            m?.mandateAssetTypes || [],
            () => this.createAssetTypeGroup(),
            'mandateAssetTypes'
          );
          resetArray(
            this.mandateFees,
            m?.mandateFees || [],
            () => this.createMandateFeesGroup(),
            'mandateFees'
          );

          // 5️⃣ Grace period
          console.log(
            '[patchMandate] — patching gracePeriodSetting with',
            m?.mandateGracePeriodSetting
          );
          try {
            this.moreInfoForm
              .get('mandateGracePeriodSetting')!
              .patchValue(m?.mandateGracePeriodSetting || {});
          } catch (err) {
            console.error(
              '[patchMandate] ✖️ error patching gracePeriodSetting',
              err
            );
          }

          // 6️⃣ View-only?
          if (this.viewOnly) {
            console.log('[patchMandate] — viewOnly, disabling parentForm');
            this.parentForm.disable({ emitEvent: false });
          }
        },
        error: (err) => {
          console.error('[patchMandate] subscription error', err);
        },
      });
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
    return this.parentForm.get('basic')! as FormGroup;
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
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, assets, basic, contacts, officers, moreInfo } =
        this.parentForm.value;
      const payload: Mandate = {
        id,
        assets,
        basic,
        contacts,
        officers,
        moreInfo,
      };
      console.log(' payload=', payload);
      this.facade.update(id, payload);
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
