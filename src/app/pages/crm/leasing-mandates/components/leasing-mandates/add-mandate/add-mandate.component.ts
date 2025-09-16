import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  filter,
  map,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';

//Models
import { Client } from '../../../../clients/store/_clients/allclients/client.model';
import { LeasingType } from '../../../../../lookups/store/leasing-types/leasing-type.model';
import { InsuredBy } from '../../../../../lookups/store/insured-by/insured-by.model';
import { FeeType } from '../../../../../lookups/store/fee-types/fee-type.model';
import { AssetType } from '../../../../../lookups/store/asset-types/asset-type.model';
import { Mandate } from '../../../store/leasing-mandates/leasing-mandate.model';
//Facades
import { ClientsFacade } from '../../../../clients/store/_clients/allclients/clients.facade';
import { LeasingTypesFacade } from '../../../../../lookups/store/leasing-types/leasing-types.facade';
import { InsuredByFacade } from '../../../../../lookups/store/insured-by/insured-by.facade';
import { FeeTypesFacade } from '../../../../../lookups/store/fee-types/fee-types.facade';
import { AssetTypesFacade } from '../../../../../lookups/store/asset-types/asset-types.facade';
import { MandatesFacade } from '../../../store/leasing-mandates/leasing-mandates.facade';
//Actions
import { loadAll } from '../../../../clients/store/_clients/allclients/clients.actions';
import { loadAll as loadLeasingTypes } from '../../../../../lookups/store/leasing-types/leasing-types.actions';
import { loadAll as loadInsuredBy } from '../../../../../lookups/store/insured-by/insured-by.actions';
import { loadAll as loadAssetTypes } from '../../../../../lookups/store/asset-types/asset-types.actions';
import { loadAll as loadFeeTypes } from '../../../../../lookups/store/fee-types/fee-types.actions';
import { combineLatest, Subject } from 'rxjs';

@Component({
  selector: 'app-add-mandate',
  standalone: false,
  templateUrl: './add-mandate.component.html',
  styleUrl: './add-mandate.component.scss',
})
export class AddMandateComponent {
  addMandateShowBasicForm!: FormGroup;
  addMandateShowAssetTypeForm!: FormGroup;
  addMandateShowFinancialActivityOneForm!: FormGroup;
  addMandateShowFinancialActivityTwoForm!: FormGroup;
  addMandateShowFeeForm!: FormGroup;
  editMode: boolean = false;
  viewOnly: boolean = false;
  clientNames$!: Observable<Client[]>;
  leasingTypes$!: Observable<LeasingType[]>;
  insuredBy$!: Observable<InsuredBy[]>;
  assetTypes$!: Observable<AssetType[]>;
  feeTypes$!: Observable<FeeType[]>;
  parentForm!: FormGroup;
  private destroy$ = new Subject<void>();
  workFlowActionList: any[] = [];
  selectedAction: string = '';
  public mandateId: any = null;
  public leasingMandateId: any = null;
  clientId = this.route.snapshot.params['clientId'];
  show = false;
  editShow = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private clientFacade: ClientsFacade,
    private leasingTypeFacade: LeasingTypesFacade,
    private insuredByFacade: InsuredByFacade,
    private assetTypesFacade: AssetTypesFacade,
    private feeTypesFacade: FeeTypesFacade,
    private route: ActivatedRoute,
    private facade: MandatesFacade,
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

    // 1️⃣ Build all form‐groups
    this.buildMandateShowBasicForm();
    this.buildMandateShowAssetTypeForm();
    this.buildMandateShowFeeForm();
    this.buildMandateShowFinancialActivity1Form();
    this.buildMandateShowFinancialActivity2Form();

    // 2️⃣ Combine into parentForm
    this.parentForm = this.fb.group({
      basic: this.addMandateShowBasicForm,
      assets: this.addMandateShowAssetTypeForm,
      fees: this.addMandateShowFeeForm,
      financialActivities1: this.addMandateShowFinancialActivityOneForm,
      financialActivities2: this.addMandateShowFinancialActivityTwoForm,
    });

    // 5️⃣ All your other setup (lookups, route handling, patching…)
    //    no early returns that skip the clientId subscription
    if (!this.clientId) {
      this.store.dispatch(loadAll({}));
    }
    this.store.dispatch(loadLeasingTypes({}));
    this.store.dispatch(loadInsuredBy({}));
    this.store.dispatch(loadAssetTypes({}));
    this.store.dispatch(loadFeeTypes({}));
    //Clients Dropdown
    if (!this.clientId) {
      this.clientNames$ = this.clientFacade.all$;
    }
    //Leasing Types Dropdown
    this.leasingTypes$ = this.leasingTypeFacade.all$;
    //Insured By Dropdown
    this.insuredBy$ = this.insuredByFacade.all$;
    //Asset Type Dropdown
    this.assetTypes$ = this.assetTypesFacade.all$;
    //Fee Types Dropdown
    this.feeTypes$ = this.feeTypesFacade.all$;

    if (!this.clientId) {
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
            console.log('clientId', this.clientId);
            // flip your flags exactly once, at the same time you load
            this.editMode = mode === 'edit';
            this.viewOnly = mode === 'view';

            // ← clear out the old entity so selectedMandate$ doesn’t emit immediately
            this.facade.clearSelected();
            // now fetch afresh
            this.facade.loadById(leasingId);
          }),
          switchMap(({ leasingId }) =>
            this.facade.selectedMandate$.pipe(
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
    } else {
      combineLatest({
        params: this.route.paramMap,
        query: this.route.queryParamMap,
      })
        .pipe(
          map(({ params, query }) => ({
            clientId: +params.get('clientId')!,
            leasingId: +params.get('leasingId')!,
            mode: query.get('mode'),
          })),
          filter(({ leasingId, clientId }) => !!leasingId && !!clientId),
          tap(({ leasingId, mode, clientId }) => {
            // flip your flags exactly once, at the same time you load
            this.show = !clientId;
            console.log('✅ clientId presence → show =', this.show);
            this.editMode = mode === 'edit';
            this.viewOnly = mode === 'view';
            this.facade.clearSelected();
            // now fetch afresh
            this.facade.loadById(leasingId);
            this.facade.loadByClientId(clientId);
          }),
          switchMap(({ leasingId, clientId }) =>
            this.facade.selectedMandate$.pipe(
              filter(
                (m) => !!m && m.id === leasingId && m.clientId === clientId
              ),
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
  }
  private patchMandate(m: Mandate) {
    if (!this.clientId) {
      this.mandateId = m.mandateId;

      // 1️⃣ patch all of the flat values, _excluding_ the nested grace group
      this.parentForm.patchValue({
        basic: {
          id: m.id,
          parentMandateId: m.parentMandateId,
          clientId: m.clientId ?? m.clientView?.clientId,
          leasingTypeId: m.leasingTypeId,
          insuredById: m.insuredById,
        },
        financialActivities: {
          date: m.date ? new Date(m.date) : null,
          notes: m.notes,
          validityDay: m.validityDay ?? null,
          description: m.description,
          downPayment: m.downPayment,
          interestRate: m.interestRate,
          insuranceRate: m.insuranceRate,

          nfa: m.nfa,
          assetCost: m.assetCost,
          indicativeRentals: m.indicativeRentals,
          percentOfFinance: m.percentOfFinance,
        },
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
        this.mandateAssetTypes,
        m.mandateAssetTypes || [],
        () => this.createAssetTypeGroup(),
        'mandateAssetTypes'
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
    } else {
      this.mandateId = m.mandateId;

      // 1️⃣ patch all of the flat values, _excluding_ the nested grace group
      this.parentForm.patchValue({
        basic: {
          id: m.id,
          parentMandateId: m.parentMandateId,
          clientId: this.clientId,
          leasingTypeId: m.leasingTypeId,
          insuredById: m.insuredById,
        },
        financialActivities: {
          date: m.date ? new Date(m.date) : null,
          notes: m.notes,
          description: m.description,
          validityCount: m.validityCount,
          downPayment: m.downPayment,
          interestRate: m.interestRate,
          insuranceRate: m.insuranceRate,

          assetCost: m.assetCost,
          nfa: m.nfa,
          percentOfFinance: m.percentOfFinance,
          indicativeRentals: m.indicativeRentals,
        },
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
        this.mandateAssetTypes,
        m.mandateAssetTypes || [],
        () => this.createAssetTypeGroup(),
        'mandateAssetTypes'
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
  }
  nextStep(nextCallback: { emit: () => void }, group: FormGroup) {
    if (group?.valid || this.viewOnly) {
      nextCallback?.emit();
    } else {
      this.markGroupTouched(group);
    }
  }
  prevStep(prevCallback: { emit: () => void }) {
    prevCallback.emit();
  }
  private markGroupTouched(group: FormGroup) {
    Object.values(group.controls).forEach((ctrl: any) => {
      if (ctrl?.controls) {
        // nested group/array
        this.markGroupTouched(ctrl);
      } else {
        ctrl?.markAsTouched();
        ctrl?.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  private normalizeMandate(raw: any): Mandate & {
    clientId: number;
  } {
    if (!this.clientId) {
      return {
        ...raw,
        // pick flat IDs first, then fallback to the nested view-model…
        clientId: raw?.clientId ?? raw?.clientView?.clientId,
      };
    } else {
      return {
        ...raw,
        // pick flat IDs first, then fallback to the nested view-model…
        clientId: this.clientId,
      };
    }
  }

  handleWorkflowAction(event: { actionId: number; comment: string }): void {
    const payload = {
      mandateId: this.mandateId,
      mandateStatusActionId: event.actionId,
      comment: event.comment,
      isCurrent: true,
    };

    this.facade.performWorkflowAction(event.actionId, payload);
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
          ...(mandate?.allowedMandateWorkFlowActions ?? []),
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
    if (!this.clientId) {
      this.addMandateShowBasicForm = this.fb.group({
        id: [null],
        parentMandateId: [null],
        clientId: [null, Validators.required],
        leasingTypeId: [null, Validators.required],
        insuredById: [null, Validators.required],
        date: [null, Validators.required],
        validityDay: [null, Validators.required],
        expireDate: [{ value: null, disabled: true }, Validators.required],
        notes: [null],
      });
    } else {
      this.addMandateShowBasicForm = this.fb.group({
        id: [null],
        parentMandateId: [null],
        clientId: this.clientId,
        leasingTypeId: [null, Validators.required],
        insuredById: [null, Validators.required],
        date: [null, Validators.required],
        validityDay: [null, Validators.required],
        expireDate: [{ value: null, disabled: true }, Validators.required],
        notes: [null],
      });
    }
    this.wireUpExpireDateAutoCalc();
  }

  buildMandateShowAssetTypeForm(): void {
    this.addMandateShowAssetTypeForm = this.fb.group({
      mandateAssetTypes: this.fb.array([this.createAssetTypeGroup()]),
    });
  }
  buildMandateShowFeeForm(): void {
    this.addMandateShowFeeForm = this.fb.group({
      mandateFees: this.fb.array([this.createFeeGroup()]),
    });
  }
  createAssetTypeGroup(): FormGroup {
    return this.fb.group({
      assetTypeId: ['', Validators.required],
      assetsTypeDescription: [null, Validators.required],
    });
  }
  buildMandateShowFinancialActivity1Form(): void {
    this.addMandateShowFinancialActivityOneForm = this.fb.group({
      assetCost: [null, Validators.required],
      downPayment: [null, Validators.required],
      percentOfFinance: [null, Validators.required],
      nfa: [null, Validators.required],
      years: [null, Validators.required],
      startDate: [null, Validators.required],
      interestRate: [null, Validators.required],
      insuranceRate: [null, Validators.required],
      tenor: [null, Validators.required],
      paymentPeriodId: [null, Validators.required],
      gracePeriodInDays: [null, Validators.required],
      currencyId: [null, Validators.required],
      currencyExchangeRateId: [null, Validators.required],
      isManuaExchangeRate: [null, Validators.required],
      manualSetExchangeRate: [null, Validators.required],
    });
  }
  buildMandateShowFinancialActivity2Form(): void {
    this.addMandateShowFinancialActivityTwoForm = this.fb.group({
      indicativeRentals: [null, Validators.required],
      rent: [null, Validators.required],
      rvPercent: [null, Validators.required],
      rvAmount: [null, Validators.required],
      reservePaymentCount: [null, Validators.required],
      reservePaymentAmount: [null, Validators.required],
      provisionPercent: [null, Validators.required],
      provisionAmount: [null, Validators.required],
      interestRateBenchmarkId: [null, Validators.required],
      paymentTimingTermId: [null, Validators.required],
      rentStructureTypeId: [null, Validators.required],
      paymentMethodID: [null, Validators.required],
      paymentMonthDayID: [null, Validators.required],
    });
  }
  //   mandateAssetTypes: this.fb.array([this.createAssetTypeGroup()]),
  // mandateFees: this.fb.array([this.createFeeGroup()]),

  /** Auto-calc expireDate = date + validityDay, whenever either changes. */
  private wireUpExpireDateAutoCalc(): void {
    const grp = this.addMandateShowBasicForm;
    const dateCtrl = grp.get('date')!;
    const daysCtrl = grp.get('validityDay')!;
    const expCtrl = grp.get('expireDate')!;

    combineLatest([
      dateCtrl.valueChanges.pipe(startWith(dateCtrl.value)),
      daysCtrl.valueChanges.pipe(startWith(daysCtrl.value)),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([dateVal, daysVal]) => {
        const d = this.toDate(dateVal);
        const days = this.toInt(daysVal);
        if (d && days !== null && days >= 0) {
          const exp = this.addDays(d, days);
          // keep it disabled and avoid loops
          expCtrl.setValue(exp, { emitEvent: false });
        } else {
          expCtrl.setValue(null, { emitEvent: false });
        }
      });
  }
  // --- tiny helpers ---
  private toDate(v: any): Date | null {
    if (!v) return null;
    return v instanceof Date ? v : new Date(v);
  }
  private toInt(v: any): number | null {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  private addDays(d: Date, days: number): Date {
    const out = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    out.setDate(out.getDate() + days);
    return out;
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

  createFeeGroup(): FormGroup {
    return this.fb.group({
      feeTypeId: [null, Validators.required],
      actualAmount: [null, Validators.required],
      actualPercentage: [null, Validators.required],
    });
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

  get mandateAssetTypes(): FormArray {
    return this.addMandateShowAssetTypeForm.get(
      'mandateAssetTypes'
    ) as FormArray;
  }

  get assetsForm(): FormGroup {
    // this never returns null at runtime, so we assert with `!` then cast
    return this.parentForm.get('assets')! as FormGroup;
  }
  get financialActivityForm(): FormGroup {
    // the `!` tells TS “I guarantee there’s a value here”
    // and the `as FormGroup` tells it the exact type
    return this.parentForm.get('financialActivity')! as FormGroup;
  }

  get basicForm(): FormGroup {
    return this.parentForm?.get('basic')! as FormGroup;
  }
  get mandateFees(): FormArray {
    return this.addMandateShowFeeForm.get('mandateFees') as FormArray;
  }
  addFee() {
    console.log('Adding new mandate Fees group');
    this.mandateFees?.push(this.createFeeGroup());
  }

  removeFee(i: number) {
    console.log('Removing mandate Fees at index', i);
    if (this.mandateFees.length > 1) {
      this.mandateFees.removeAt(i);
    }
  }
  onSubmit() {
    if (!this.clientId) {
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

      const { assets, basic, financialActivities } =
        this.parentForm.getRawValue();

      const payload: Partial<Mandate> = {
        ...basic,
        mandateAssetTypes: assets.mandateAssetTypes,

        ...financialActivities,
      };
      console.log('  → payload object:', payload);

      // Double-check your route param
      // console.log('  route.snapshot.paramMap.get(clientId):', routeId);

      if (this.editMode) {
        const leaseId = +this.route.snapshot.paramMap.get('leasingId')!;

        // pull out each group
        const { basic, assets, financialActivities } = this.parentForm.value;
        console.log('ffff', this.parentForm.value);
        // build the flat payload
        const payload = {
          id: basic.id,
          parentMandateId: basic.parentMandateId,
          clientId: basic.clientId,
          leasingTypeId: basic.leasingTypeId,
          insuredById: basic.insuredById,

          // from your "financialActivities" group
          description: financialActivities.description,
          date: financialActivities.date,
          expireDate: financialActivities.expireDate,
          validityDay: +financialActivities.validityDay,
          nfa: financialActivities.nfa,
          percentOfFinance: financialActivities.percentOfFinance,
          downPayment: financialActivities.downPayment,
          assetCost: financialActivities.assetCost,
          notes: financialActivities.notes,
          validityCount: financialActivities.validityCount,
          indicativeRentals: financialActivities.indicativeRentals,
          mandateGracePeriodSettingView:
            financialActivities.mandateGracePeriodSettingView,

          // your array groups, renamed to match the API
          mandateAssetTypes: assets.mandateAssetTypes,
        };

        console.log('→ PUT payload:', payload);
        this.facade.update(leaseId, payload);
      } else {
        console.log('➕ Dispatching CREATE payload=', payload);
        this.facade.create(payload);
      }

      if (this.addMandateShowBasicForm.valid) {
        this.addMandateShowBasicForm.markAsPristine();
      }
      if (this.addMandateShowAssetTypeForm.valid) {
        this.addMandateShowAssetTypeForm.markAsPristine();
      }

      if (this.addMandateShowFinancialActivityOneForm.valid) {
        this.addMandateShowFinancialActivityOneForm.markAsPristine();
      }
      console.log('🧭 Navigating away to view-mandates');
      this.router.navigate(['/crm/leasing-mandates/view-mandates']);
    } else {
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

      const { assets, basic, contacts, officers, financialActivities } =
        this.parentForm.value;
      const payload: Partial<Mandate> = {
        ...basic,
        clientId: this.clientId,
        mandateOfficers: officers.mandateOfficers,
        mandateContactPersons: contacts.mandateContactPersons,
        mandateAssetTypes: assets.mandateAssetTypes,

        ...financialActivities,
      };
      console.log('  → payload object:', payload);

      // Double-check your route param
      // console.log('  route.snapshot.paramMap.get(clientId):', routeId);

      if (this.editMode) {
        const leaseId = +this.route.snapshot.paramMap.get('leasingId')!;

        // pull out each group
        const { basic, assets, contacts, officers, financialActivities } =
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

          // from your "financialActivities" group
          description: financialActivities.description,
          date: financialActivities.date,
          expireDate: financialActivities.expireDate,
          validityDay: +financialActivities.validityDay,
          nfa: financialActivities.nfa,
          percentOfFinance: financialActivities.percentOfFinance,
          downPayment: financialActivities.downPayment,
          assetCost: financialActivities.assetCost,
          notes: financialActivities.notes,
          validityCount: financialActivities.validityCount,
          indicativeRentals: financialActivities.indicativeRentals,
          mandateGracePeriodSettingView:
            financialActivities.mandateGracePeriodSettingView,

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

      if (this.addMandateShowBasicForm.valid) {
        this.addMandateShowBasicForm.markAsPristine();
      }
      if (this.addMandateShowAssetTypeForm.valid) {
        this.addMandateShowAssetTypeForm.markAsPristine();
      }

      if (this.addMandateShowFinancialActivityOneForm.valid) {
        this.addMandateShowFinancialActivityOneForm.markAsPristine();
      }
      console.log('🧭 Navigating away to view-mandates');
      this.router.navigate([
        `/crm/leasing-mandates/view-mandates/${this.clientId}`,
      ]);
    }
  }

  navigateToView() {
    if (!this.clientId) {
      this.router.navigate(['/crm/leasing-mandates/view-mandates']);
    } else {
      this.router.navigate([
        `/crm/leasing-mandates/view-mandates/${this.clientId}`,
      ]);
    }
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return (
      !this.addMandateShowBasicForm.dirty &&
      !this.addMandateShowFinancialActivityOneForm.dirty &&
      !this.addMandateShowAssetTypeForm.dirty
    );
  }
}
