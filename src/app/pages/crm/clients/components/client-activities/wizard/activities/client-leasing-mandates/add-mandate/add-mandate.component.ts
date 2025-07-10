import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

//Models
import { Client } from '../../../../../../../clients/store/_clients/allclients/client.model';
import { MandateValidityUnit } from '../../../../../../../../lookups/store/mandate-validity-units/mandate-validity-unit.model';
import { Product } from '../../../../../../../../lookups/store/products/product.model';
import { LeasingType } from '../../../../../../../../lookups/store/leasing-types/leasing-type.model';
import { InsuredBy } from '../../../../../../../../lookups/store/insured-by/insured-by.model';
import { Officer } from '../../../../../../../../organizations/store/officers/officer.model';
import { PeriodUnit } from '../../../../../../../../lookups/store/period-units/period-unit.model';
import { FeeType } from '../../../../../../../../lookups/store/fee-types/fee-type.model';
import { AssetType } from '../../../../../../../../lookups/store/asset-types/asset-type.model';
import { Mandate } from '../../../../../../../leasing-mandates/store/leasing-mandates/leasing-mandate.model';
//Facades
import { ClientsFacade } from '../../../../../../../clients/store/_clients/allclients/clients.facade';
import { MandateValidityUnitsFacade } from '../../../../../../../../lookups/store/mandate-validity-units/mandate-validity-units.facade';
import { ProductsFacade } from '../../../../../../../../lookups/store/products/products.facade';
import { LeasingTypesFacade } from '../../../../../../../../lookups/store/leasing-types/leasing-types.facade';
import { InsuredByFacade } from '../../../../../../../../lookups/store/insured-by/insured-by.facade';
import { OfficersFacade } from '../../../../../../../../organizations/store/officers/officers.facade';
import { ClientContactPersonsFacade } from '../../../../../../../clients/store/client-contact-persons/client-contact-persons.facade';
import { FeeTypesFacade } from '../../../../../../../../lookups/store/fee-types/fee-types.facade';
import { GracePeriodUnitsFacade } from '../../../../../../../../lookups/store/period-units/period-units.facade';
import { AssetTypesFacade } from '../../../../../../../../lookups/store/asset-types/asset-types.facade';
import { MandatesFacade } from '../../../../../../../leasing-mandates/store/leasing-mandates/leasing-mandates.facade';
//Actions
import { loadAll } from '../../../../../../../clients/store/_clients/allclients/clients.actions';
import { loadAll as loadValidityUnits } from '../../../../../../../../lookups/store/mandate-validity-units/mandate-validity-units.actions';
import { loadAll as loadProducts } from '../../../../../../../../lookups/store/products/products.actions';
import { loadAll as loadLeasingTypes } from '../../../../../../../../lookups/store/leasing-types/leasing-types.actions';
import { loadAll as loadInsuredBy } from '../../../../../../../../lookups/store/insured-by/insured-by.actions';
import { loadOfficers } from '../../../../../../../../organizations/store/officers/officers.actions';
import { loadAll as loadAssetTypes } from '../../../../../../../../lookups/store/asset-types/asset-types.actions';
import { loadAll as loadFeeTypes } from '../../../../../../../../lookups/store/fee-types/fee-types.actions';
import { loadAll as loadGracePeriods } from '../../../../../../../../lookups/store/period-units/period-units.actions';
import { combineLatest, Subject } from 'rxjs';
import { ClientMandatesFacade } from '../../../../../../store/client-leasing-mandates/client-leasing-mandates.facade';

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
  private destroy$ = new Subject<void>();
  workFlowActionList: any[] = [];
  selectedAction: string = '';
  public mandateId: any = null;
  public leasingMandateId: any = null;
  clientId = this.route.snapshot.params['clientId'];
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
    private facade: ClientMandatesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    // 1️⃣ Build all form‐groups
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
    // 3️⃣ Hook up client → contact-persons

    this.contactPersonsFacade.loadByClientId(this.clientId);

    // 4️⃣ If you want the initial load on edit, do it here too

    this.contactPersonsFacade.loadByClientId(this.clientId);

    // 5️⃣ All your other setup (lookups, route handling, patching…)
    //    no early returns that skip the clientId subscription
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

    combineLatest({
      params: this.route.paramMap,
      query: this.route.queryParamMap,
    })
      .pipe(
        map(({ params, query }) => ({
          leasingId: +params.get('leasingId')!,
          mode: query.get('mode'),
        })),
        filter(({ leasingId }) => !!leasingId),
        tap(({ leasingId, mode }) => {
          // flip your flags exactly once, at the same time you load
          this.editMode = mode === 'edit';
          this.viewOnly = mode === 'view';
          // ← clear out the old entity so selectedMandate$ doesn’t emit immediately
          this.facade.clearSelected();
          // now fetch afresh
          this.facade.loadByLeasingId(leasingId);
        }),
        switchMap(({ leasingId }) =>
          this.facade.selected$.pipe(
            filter((m) => m != null && m.id === leasingId),
            take(1)
          )
        )
      )
      .subscribe((mandate: any) =>
        this.patchMandate(this.normalizeMandate(mandate))
      );

    const idParam = this.route.snapshot.paramMap.get('leasingId');
    if (!idParam) {
      console.log('No edit/view mode detected, skipping load.');
      return;
    }
    this.leasingMandateId = +idParam;
  }
  private patchMandate(
    m: Mandate & {
      mandateGracePeriodSettingView?: {
        gracePeriodCount?: number | null;
        gracePeriodUnitId?: number | null;
      };
    }
  ) {
    this.mandateId = m.mandateId;
    console.log('rrrrrrrrrr', this.mandateId);
    const grace = m.mandateGracePeriodSettingView ?? {
      gracePeriodCount: null,
      gracePeriodUnitId: null,
    };

    // 1️⃣ patch all of the flat values, _excluding_ the nested grace group
    this.parentForm.patchValue({
      basic: {
        id: m.id,
        parentMandateId: m.parentMandateId,
        clientId: this.clientId,
        validityUnitId: m.validityUnitId ?? m.validityUnitView?.validityUnitId,
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
        mandateGracePeriodSettingView: {
          gracePeriodCount: grace.gracePeriodCount,
          gracePeriodUnitId: grace.gracePeriodUnitId,
        },
      },
    });
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
    resetArray(
      this.mandateFees,
      m.mandateFees || [],
      () => this.createMandateFeesGroup(),
      'mandateFees'
    );

    this.workFlowActionList = m.allowedMandateWorkFlowActions?.map(
      (action) => ({
        id: action.id,
        label: action.name,
        icon: 'pi pi-times',
      })
    );
    this.selectedAction = m.mandateCurrentWorkFlowAction.name ?? '';
    console.log('✅ this.selectedAction', this.selectedAction);
  }

  private normalizeMandate(raw: any): Mandate & {
    clientId: number;
    validityUnitId: number;
    mandateGracePeriodSettingView: {
      gracePeriodCount: number | null;
      gracePeriodUnitId: number | null;
    };
  } {
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

  handleWorkflowAction(event: { actionId: number; comment: string }): void {
    const payload = {
      id: this.mandateId,
      mandateStatusActionId: event.actionId,
      comment: event.comment,
      isCurrent: true,
    };

    this.facade.performWorkflowAction(this.clientId, this.mandateId, payload);
    this.facade.workFlowActionSuccess$.subscribe({
      next: () => {
        console.log('Workflow action submitted successfully.');
        this.refreshAllowedActions();
      },
    });
  }

  refreshAllowedActions(): void {
    this.facade.loadById(this.leasingMandateId);
    this.facade.selected$.subscribe({
      next: (mandate) => {
        var workFlowAction = [
          ...(mandate?.allowedMandateWorkflowActions ?? []),
        ];
        this.workFlowActionList = workFlowAction.map((action) => ({
          id: action.id,
          label: action.name,
          icon: 'pi pi-times',
        })); // clone to ensure change detection
      },
      error: (err) => {
        console.error('Failed to refresh actions:', err);
      },
    });
  }

  buildMandateShowBasicForm(): void {
    this.addMandateShowBasicForm = this.fb.group({
      id: [null],
      parentMandateId: [null],
      // clientId: [null, Validators.required],
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
      mandateGracePeriodSettingView:
        this.createMandateGracePeriodSettingGroup(),
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
      return;
    }

    const { assets, basic, contacts, officers, moreInfo } =
      this.parentForm.value;
    const payload: Partial<Mandate> = {
      ...basic,
      clientId: this.clientId,
      mandateOfficers: officers.mandateOfficers,
      mandateContactPersons: (contacts.mandateContactPersons || []).map(
        (cp: any) => ({
          contactPersonId: cp.contactPersonId,
          contactPersonName: cp.contactPersonName || '',
          contactPersonNameAr: cp.contactPersonNameAr || '',
        })
      ),
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
        clientId: this.clientId,
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
        mandateGracePeriodSettingView: moreInfo.mandateGracePeriodSettingView,

        // your array groups, renamed to match the API
        mandateAssetTypes: assets.mandateAssetTypes,
        mandateContactPersons: contacts.mandateContactPersons,
        mandateOfficers: officers.mandateOfficers,
      };

      console.log('→ PUT payload:', payload);
      this.facade.update(this.clientId, leaseId, payload);
    } else {
      console.log('➕ Dispatching CREATE payload=', payload);
      this.facade.create(this.clientId, payload);
    }
    if (this.addMandateShowOfficersForm.valid) {
      this.addMandateShowOfficersForm.markAsPristine();
    }
    if (this.addMandateShowBasicForm.valid) {
      this.addMandateShowBasicForm.markAsPristine();
    }
    if (this.addMandateShowAssetTypeForm.valid) {
      this.addMandateShowAssetTypeForm.markAsPristine();
    }
    if (this.addMandateShowContactPersonsForm.valid) {
      this.addMandateShowContactPersonsForm.markAsPristine();
    }
    if (this.addMandateShowMoreInformationForm.valid) {
      this.addMandateShowMoreInformationForm.markAsPristine();
    }
    console.log('🧭 Navigating away to view-mandates');
    this.router.navigate([
      `/crm/leasing-mandates/view-mandates/${this.clientId}`,
    ]);
  }

  navigateToView() {
    this.router.navigate(['/crm/leasing-mandates/view-mandates']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return (
      !this.addMandateShowBasicForm.dirty &&
      !this.addMandateShowOfficersForm.dirty &&
      !this.addMandateShowContactPersonsForm.dirty &&
      !this.addMandateShowMoreInformationForm.dirty &&
      !this.addMandateShowAssetTypeForm.dirty
    );
  }
}
