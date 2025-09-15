import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, take } from 'rxjs/operators';
//Models
import { Client } from '../../../../../clients/store/_clients/allclients/client.model';
import { MandateValidityUnit } from '../../../../../../lookups/store/mandate-validity-units/mandate-validity-unit.model';
import { Product } from '../../../../../../lookups/store/products/product.model';
import { LeasingType } from '../../../../../../lookups/store/leasing-types/leasing-type.model';
import { InsuredBy } from '../../../../../../lookups/store/insured-by/insured-by.model';
import { Officer } from '../../../../../../organizations/store/officers/officer.model';
import { PeriodUnit } from '../../../../../../lookups/store/period-units/period-unit.model';
import { FeeType } from '../../../../../../lookups/store/fee-types/fee-type.model';
import { AssetType } from '../../../../../../lookups/store/asset-types/asset-type.model';
import { Mandate } from '../../../../store/leasing-mandates/leasing-mandate.model';
//Facades
import { ClientsFacade } from '../../../../../clients/store/_clients/allclients/clients.facade';
import { MandateValidityUnitsFacade } from '../../../../../../lookups/store/mandate-validity-units/mandate-validity-units.facade';
import { ProductsFacade } from '../../../../../../lookups/store/products/products.facade';
import { LeasingTypesFacade } from '../../../../../../lookups/store/leasing-types/leasing-types.facade';
import { InsuredByFacade } from '../../../../../../lookups/store/insured-by/insured-by.facade';
import { OfficersFacade } from '../../../../../../organizations/store/officers/officers.facade';
import { ClientContactPersonsFacade } from '../../../../../clients/store/client-contact-persons/client-contact-persons.facade';
import { FeeTypesFacade } from '../../../../../../lookups/store/fee-types/fee-types.facade';
import { GracePeriodUnitsFacade } from '../../../../../../lookups/store/period-units/period-units.facade';
import { AssetTypesFacade } from '../../../../../../lookups/store/asset-types/asset-types.facade';
import { ClonesFacade } from '../../../../store/clone/clones.facade';
//Actions
import { loadAll } from '../../../../../clients/store/_clients/allclients/clients.actions';
import { loadAll as loadValidityUnits } from '../../../../../../lookups/store/mandate-validity-units/mandate-validity-units.actions';
import { loadAll as loadProducts } from '../../../../../../lookups/store/products/products.actions';
import { loadAll as loadLeasingTypes } from '../../../../../../lookups/store/leasing-types/leasing-types.actions';
import { loadAll as loadInsuredBy } from '../../../../../../lookups/store/insured-by/insured-by.actions';
import { loadOfficers } from '../../../../../../organizations/store/officers/officers.actions';
import { loadAll as loadAssetTypes } from '../../../../../../lookups/store/asset-types/asset-types.actions';
import { loadAll as loadFeeTypes } from '../../../../../../lookups/store/fee-types/fee-types.actions';
import { loadAll as loadGracePeriods } from '../../../../../../lookups/store/period-units/period-units.actions';

@Component({
  selector: 'app-add-child-mandate',
  standalone: false,
  templateUrl: './add-child-mandate.component.html',
  styleUrl: './add-child-mandate.component.scss',
})
export class AddChildMandateComponent {
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
  routeId = this.route.snapshot.params['leasingId'];
  mandateRouteId = this.route.snapshot.params['leasingMandatesId'];
  clientId = this.route.snapshot.params['clientId'];
  show = false;
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
    private facade: ClonesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('show', this.show);
    if (!this.clientId || (!this.clientId && this.editMode)) {
      console.log("there isn't a client id");
      this.show = true;
    } else {
      console.log('there is a client id');

      this.show = false;
    }
    console.log('route', this.route.snapshot);
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
    // 2️⃣ pull the raw DB PK ("leasingMandatesId") out of the URL
    const cloneId = +this.route.snapshot.paramMap.get('leasingMandatesId')!;
    const parentMandateId = +this.route.snapshot.paramMap.get('leasingId')!;
    const clientId = +this.route.snapshot.paramMap.get('clientId')!;

    // 3️⃣ shove it into your basic form
    this.basicForm.patchValue({ parentMandateId });

    // 3️⃣ Load your lookups…
    if (!this.clientId) {
      this.store.dispatch(loadAll({}));
    }
    this.store.dispatch(loadValidityUnits({}));
    this.store.dispatch(loadProducts({}));
    this.store.dispatch(loadLeasingTypes({}));
    this.store.dispatch(loadInsuredBy({}));
    this.store.dispatch(loadOfficers());
    this.store.dispatch(loadAssetTypes({}));
    this.store.dispatch(loadFeeTypes({}));
    this.store.dispatch(loadGracePeriods({}));
    //Clients Dropdown
    if (!this.clientId) {
      this.clientNames$ = this.clientFacade.all$;
    } //Mandate Validity Units Dropdown
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
    // 6) load the clone
    this.facade.clearSelected();
    this.facade.loadById(cloneId);

    if (!this.clientId) {
      // 7) when the clone arrives, patch the form
      this.facade.selectedClone$
        .pipe(
          filter((c) => !!c && c.id === cloneId),
          take(1)
        )
        .subscribe((c) => {
          this.patchMandate(this.normalizeMandate(c));
          if (this.viewOnly) {
            this.parentForm.disable();
          }
        });
    } else {
      // 7) when the clone arrives, patch the form
      this.facade.selectedClone$
        .pipe(
          filter((c) => !!c && c.id === cloneId && c.clientId === clientId),
          take(1)
        )
        .subscribe((c) => {
          this.patchMandate(this.normalizeMandate(c));
          if (this.viewOnly) {
            this.parentForm.disable();
          }
        });
    }
    // 8) finally wire up your client->contact listener
    if (!this.clientId) {
      this.basicForm
        .get('clientId')!
        .valueChanges.pipe(
          filter((id) => !!id),
          distinctUntilChanged()
        )
        .subscribe((id) => this.contactPersonsFacade.loadByClientId(id));
    } else {
      this.contactPersonsFacade.loadByClientId(this.clientId);
    }
    const queryMode = this.route.snapshot.queryParamMap.get('mode');
    this.editMode = queryMode === 'edit';
    this.viewOnly = queryMode === 'view';

    console.log('✅ Route Mode:', queryMode);
    console.log('→ editMode:', this.editMode);
    console.log('→ viewOnly:', this.viewOnly);
  }
  private patchMandate(
    m: Mandate & {
      mandateGracePeriodSettingView?: {
        gracePeriodCount?: number | null;
        gracePeriodUnitId?: number | null;
      };
    }
  ) {
    const grace = m.mandateGracePeriodSettingView ?? {
      gracePeriodCount: null,
      gracePeriodUnitId: null,
    };

    if (!this.clientId) {
      // 1️⃣ patch all of the flat values, _excluding_ the nested grace group
      this.parentForm.patchValue({
        basic: {
          id: m.id,
          parentMandateId: m.parentMandateId,
          clientId: m.clientId ?? m.clientView?.clientId,
          validityUnitId:
            m.validityUnitId ?? m.validityUnitView?.validityUnitId,
          productId: m.productId,
          leasingTypeId: m.leasingTypeId,
          insuredById: m.insuredById,
        },
        moreInfo: {
          date: String(m.date),
          notes: m.notes,
          description: m.description,
          validityCount: m.validityCount,
          indicativeRentals: m.indicativeRentals,
          mandateGracePeriodSettingView: {
            gracePeriodCount: grace.gracePeriodCount,
            gracePeriodUnitId: grace.gracePeriodUnitId,
          },
        },
      });
    } else {
      // 1️⃣ patch all of the flat values, _excluding_ the nested grace group
      this.parentForm.patchValue({
        basic: {
          id: m.id,
          parentMandateId: m.parentMandateId,
          clientId: this.clientId,
          validityUnitId:
            m.validityUnitId ?? m.validityUnitView?.validityUnitId,
          productId: m.productId,
          leasingTypeId: m.leasingTypeId,
          insuredById: m.insuredById,
        },
        moreInfo: {
          date: String(m.date),
          notes: m.notes,
          description: m.description,
          validityCount: m.validityCount,
          indicativeRentals: m.indicativeRentals,
          mandateGracePeriodSettingView: {
            gracePeriodCount: grace.gracePeriodCount,
            gracePeriodUnitId: grace.gracePeriodUnitId,
          },
        },
      });
    }
    this.gracePeriodSettings.reset(); // clear any old values

    // 2️⃣ then explicitly set the nested grace-period group exactly once
    this.gracePeriodSettings.patchValue({
      gracePeriodCount: grace.gracePeriodCount,
      gracePeriodUnitId: grace.gracePeriodUnitId,
    });

    // 4️⃣ now reset your FormArrays exactly as before…
    const resetArray = (
      fa: FormArray,
      items: any[],
      factory: () => FormGroup,
      name: string
    ) => {
      fa.clear();
      items.forEach((item) => {
        const fg = factory();
        fg.patchValue(item);
        fa.push(fg);
      });
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
  }

  private normalizeMandate(raw: any): Mandate & {
    clientId: number;
    validityUnitId: number;
    mandateGracePeriodSettingView: {
      gracePeriodCount: number | null;
      gracePeriodUnitId: number | null;
    };
  } {
    if (!this.clientId) {
      return {
        ...raw,
        // pick flat IDs first, then fallback to the nested view-model…
        clientId: raw?.clientId ?? raw?.clientView?.clientId,
        validityUnitId:
          raw?.validityUnitId ?? raw?.validityUnitView?.validityUnitId,
        // if your back-end ever renames the grace-period prop,
        // adjust the fallback here:
        mandateGracePeriodSettingView: raw?.mandateGracePeriodSettingView ??
          raw?.gracePeriodSettingView ?? {
            gracePeriodCount: null,
            gracePeriodUnitId: null,
          },
      };
    } else {
      return {
        ...raw,
        // pick flat IDs first, then fallback to the nested view-model…
        clientId: this.clientId,
        validityUnitId:
          raw?.validityUnitId ?? raw?.validityUnitView?.validityUnitId,
        // if your back-end ever renames the grace-period prop,
        // adjust the fallback here:
        mandateGracePeriodSettingView: raw?.mandateGracePeriodSettingView ??
          raw?.gracePeriodSettingView ?? {
            gracePeriodCount: null,
            gracePeriodUnitId: null,
          },
      };
    }
  }

  buildMandateShowBasicForm(): void {
    if (!this.clientId) {
      this.addMandateShowBasicForm = this.fb.group({
        id: [null],
        parentMandateId: [null],
        clientId: [null, Validators.required],
        validityUnitId: [null, Validators.required],
        productId: [null, Validators.required],
        leasingTypeId: [null, Validators.required],
        insuredById: [null, Validators.required],
      });
    } else {
      this.addMandateShowBasicForm = this.fb.group({
        id: [null],
        parentMandateId: [null],
        clientId: this.clientId,
        validityUnitId: [null, Validators.required],
        productId: [null, Validators.required],
        leasingTypeId: [null, Validators.required],
        insuredById: [null, Validators.required],
      });
    }
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
      expirationDate: [null, Validators.required],
      notes: [null, Validators.required],
      description: [null, Validators.required],
      validityCount: [null, Validators.required],
      indicativeRentals: [null, Validators.required],
      mandateGracePeriodSettingView:
        this.createMandateGracePeriodSettingGroup(),
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

  // → update to:

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
  } // ← Insert it here
  get gracePeriodSettings(): FormGroup {
    return this.moreInfoForm.get('mandateGracePeriodSettingView')! as FormGroup;
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
      console.log('  → form errors:', this.parentForm.errors);
      return;
    }

    const { assets, basic, contacts, officers, moreInfo } =
      this.parentForm.value;
    if (!this.clientId) {
      const createPayload: Partial<Mandate> = {
        ...basic,
        mandateOfficers: officers.mandateOfficers,
        mandateContactPersons: contacts.mandateContactPersons,
        mandateAssetTypes: assets.mandateAssetTypes,
        ...moreInfo,
      };
      console.log('  → assembled CREATE payload:', createPayload);
      if (this.editMode) {
        const leaseIdStr =
          this.route.snapshot.paramMap.get('leasingMandatesId');
        const leaseId = leaseIdStr ? +leaseIdStr : null;
        const mandateIdStr = this.route.snapshot.paramMap.get('leasingId');
        const mandateId = mandateIdStr ? +mandateIdStr : null;

        console.log(
          '🔍 route param leasingId:',
          leaseIdStr,
          mandateIdStr,
          'parsed →',
          leaseId,
          mandateIdStr
        );

        // Re-destructure to keep naming clear
        const {
          basic: b,
          assets: a,
          contacts: c,
          officers: o,
          moreInfo: m,
        } = this.parentForm.value;
        const updatePayload = {
          id: b.id,
          parentMandateId: b.parentMandateId,
          clientId: b.clientId,
          validityUnitId: b.validityUnitId,
          productId: b.productId,
          leasingTypeId: b.leasingTypeId,
          insuredById: b.insuredById,
          description: m.description,
          date: String(m.date),
          expirationDate: String(m.expirationDate),
          notes: m.notes,
          validityCount: m.validityCount,
          indicativeRentals: m.indicativeRentals,
          mandateGracePeriodSettingView: m.mandateGracePeriodSettingView,
          mandateAssetTypes: a.mandateAssetTypes,
          mandateContactPersons: c.mandateContactPersons,
          mandateOfficers: o.mandateOfficers,
        };
        console.log('  → assembled UPDATE payload:', updatePayload);

        console.log('✏️ Calling facade.update()');
        this.facade.update(mandateId!, updatePayload);
      } else {
        console.log('➕ Calling facade.create()');
        this.facade.create(createPayload);
      }
    } else {
      const createPayload: Partial<Mandate> = {
        ...basic,
        clientId: this.clientId,
        mandateOfficers: officers.mandateOfficers,
        mandateContactPersons: contacts.mandateContactPersons,
        mandateAssetTypes: assets.mandateAssetTypes,
        ...moreInfo,
      };
      console.log('  → assembled CREATE clientId payload:', createPayload);
      if (this.editMode) {
        const leaseIdStr =
          this.route.snapshot.paramMap.get('leasingMandatesId');
        const leaseId = leaseIdStr ? +leaseIdStr : null;
        const mandateIdStr = this.route.snapshot.paramMap.get('leasingId');
        const mandateId = mandateIdStr ? +mandateIdStr : null;
        const clientIdStr = this.route.snapshot.paramMap.get('clientId');
        const clientId = clientIdStr ? +clientIdStr : null;

        console.log(
          '🔍 route param leasingId:',
          leaseIdStr,
          mandateIdStr,
          'parsed →',
          leaseId,
          mandateIdStr,
          'parsed 2 →',
          clientId,
          clientIdStr
        );

        // Re-destructure to keep naming clear
        const {
          basic: b,
          assets: a,
          contacts: c,
          officers: o,
          moreInfo: m,
        } = this.parentForm.value;
        const updatePayload = {
          id: b.id,
          parentMandateId: b.parentMandateId,
          clientId: this.clientId,
          validityUnitId: b.validityUnitId,
          productId: b.productId,
          leasingTypeId: b.leasingTypeId,
          insuredById: b.insuredById,
          description: m.description,
          date: String(m.date),
          expirationDate: String(m.expirationDate),

          notes: m.notes,
          validityCount: m.validityCount,
          indicativeRentals: m.indicativeRentals,
          mandateGracePeriodSettingView: m.mandateGracePeriodSettingView,
          mandateAssetTypes: a.mandateAssetTypes,
          mandateContactPersons: c.mandateContactPersons,
          mandateOfficers: o.mandateOfficers,
        };
        console.log('  → assembled UPDATE payload:', updatePayload);

        console.log('✏️ Calling facade.update()');
        this.facade.update(mandateId!, updatePayload);
      } else {
        console.log('➕ Calling facade.create()');
        this.facade.create(createPayload);
      }
    }

    if (this.addMandateShowAssetTypeForm.valid) {
      this.addMandateShowAssetTypeForm.markAsPristine();
    }
    if (this.addMandateShowBasicForm.valid) {
      this.addMandateShowBasicForm.markAsPristine();
    }
    if (this.addMandateShowContactPersonsForm.valid) {
      this.addMandateShowContactPersonsForm.markAsPristine();
    }
    if (this.addMandateShowMoreInformationForm.valid) {
      this.addMandateShowMoreInformationForm.markAsPristine();
    }
    if (this.addMandateShowOfficersForm.valid) {
      this.addMandateShowOfficersForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-mandates');
    if (!this.clientId) {
      this.router.navigate([
        `/crm/leasing-mandates/view-child-mandates/${this.routeId}/${this.mandateRouteId}`,
      ]);
    } else {
      this.router.navigate([
        `/crm/leasing-mandates/view-child-mandates/${this.routeId}/${this.mandateRouteId}/${this.clientId}`,
      ]);
    }
  }

  navigateToView() {
    if (!this.clientId) {
      this.router.navigate([
        `/crm/leasing-mandates/view-child-mandates/${this.routeId}/${this.mandateRouteId}`,
      ]);
    } else {
      this.router.navigate([
        `/crm/leasing-mandates/view-child-mandates/${this.routeId}/${this.mandateRouteId}/${this.clientId}`,
      ]);
    }
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return (
      !this.addMandateShowAssetTypeForm.dirty &&
      !this.addMandateShowBasicForm.dirty &&
      !this.addMandateShowContactPersonsForm.dirty &&
      !this.addMandateShowMoreInformationForm.dirty &&
      !this.addMandateShowOfficersForm.dirty
    );
  }
}
