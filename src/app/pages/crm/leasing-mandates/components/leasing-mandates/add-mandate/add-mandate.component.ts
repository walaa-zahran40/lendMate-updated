import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import { CurrencyExchangeRate } from '../../../../../lookups/store/currency-exchange-rates/currency-exchange-rate.model';
import { CurrencyExchangeRatesFacade } from '../../../../../lookups/store/currency-exchange-rates/currency-exchange-rates.facade';
import { Currency } from '../../../../../lookups/store/currencies/currency.model';
import { CurrenciesFacade } from '../../../../../lookups/store/currencies/currencies.facade';
import { PaymentPeriod } from '../../../../../lookups/store/payment-periods/payment-period.model';
import { PaymentPeriodsFacade } from '../../../../../lookups/store/payment-periods/payment-periods.facade';
import { PaymentMethod } from '../../../../../lookups/store/payment-methods/payment-method.model';
import { PaymentMethodsFacade } from '../../../../../lookups/store/payment-methods/payment-methods.facade';
import { RentStructureType } from '../../../../../lookups/store/rent-structure-types/rent-structure-type.model';
import { RentStructureTypesFacade } from '../../../../../lookups/store/rent-structure-types/rent-structure-types.facade';
import { PaymentTimingTermsFacade } from '../../../../../lookups/store/payment-timing-terms/payment-timing-terms.facade';
import { PaymentTimingTerm } from '../../../../../lookups/store/payment-timing-terms/payment-timing-term.model';
import { InterestRateBenchMark } from '../../../../../lookups/store/interest-rate-benchmarks/interest-rate-benchmark.model';
import { InterestRateBenchMarksFacade } from '../../../../../lookups/store/interest-rate-benchmarks/interest-rate-benchmarks.facade';
import { PaymentMonthDay } from '../../../../../lookups/store/payment-month-days/payment-month-day.model';
import { PaymentMonthDaysFacade } from '../../../../../lookups/store/payment-month-days/payment-month-days.facade';
import {
  calcDownFromPercent,
  calcNfa,
  calcPercentFromDown,
  calcPeriodInterestRate,
  calcProvisionAmount,
  calcProvisionPercent,
  calcReservePaymentAmount,
  calcReservePaymentCount,
  calcRvAmount,
  calcRvPercent,
} from '../../../../../../shared/utils/leasing-calcs.util';

@Component({
  selector: 'app-add-mandate',
  standalone: false,
  templateUrl: './add-mandate.component.html',
  styleUrl: './add-mandate.component.scss',
})
export class AddMandateComponent {
  workFlowActionList: any[] = [];
  selectedAction: string = '';
  public mandateId: any = null;
  public leasingMandateId: any = null;
  clientId = this.route.snapshot.params['clientId'];
  show = false;
  editShow = false;
  private paymentPeriodsCache: PaymentPeriod[] = [];
  isSubmitting = false;
  parentForm!: FormGroup;
  addMandateShowBasicForm!: FormGroup;
  addMandateShowAssetTypeForm!: FormGroup;
  addMandateShowFeeForm!: FormGroup;
  addMandateShowFinancialActivityForm!: FormGroup;
  editMode: boolean = false;
  viewOnly: boolean = false;
  clientNames$!: Observable<Client[]>;
  leasingTypes$!: Observable<LeasingType[]>;
  insuredBy$!: Observable<InsuredBy[]>;
  assetTypes$!: Observable<AssetType[]>;
  feeTypes$!: Observable<FeeType[]>;
  currencyExchangeRates$!: Observable<CurrencyExchangeRate[]>;
  currencies$!: Observable<Currency[]>;
  paymentPeriods$!: Observable<PaymentPeriod[]>;
  paymentMethods$!: Observable<PaymentMethod[]>;
  rentStructureTypes$!: Observable<RentStructureType[]>;
  paymentTimingTerms$!: Observable<PaymentTimingTerm[]>;
  interestRateBenchmarks$!: Observable<InterestRateBenchMark[]>;
  paymentMonthDays$!: Observable<PaymentMonthDay[]>;
  private destroy$ = new Subject<void>();
  steps = [1, 2, 3, 4];
  stepTitles = ['Basic', 'Asset Types', 'Fees', 'Financial Activities'];
  totalSteps = this.steps.length;
  currentStep = 1;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private clientFacade: ClientsFacade,
    private leasingTypeFacade: LeasingTypesFacade,
    private insuredByFacade: InsuredByFacade,
    private assetTypesFacade: AssetTypesFacade,
    private feeTypesFacade: FeeTypesFacade,
    private facade: MandatesFacade,
    private currencyExchangeRateFacade: CurrencyExchangeRatesFacade,
    private currenciesFacade: CurrenciesFacade,
    private paymentPeriodsFacade: PaymentPeriodsFacade,
    private paymentMethodsFacade: PaymentMethodsFacade,
    private rentStructureTypesFacade: RentStructureTypesFacade,
    private paymentTimingTermsFacade: PaymentTimingTermsFacade,
    private interestRateBenchmarksFacade: InterestRateBenchMarksFacade,
    private paymentMonthDaysFacade: PaymentMonthDaysFacade,
    private route: ActivatedRoute,
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

    // 1) Build all sub-forms
    this.buildMandateShowBasicForm();
    this.buildMandateShowAssetTypeForm();
    this.buildMandateShowFeeForm();
    this.buildMandateShowFinancialActivityForm();

    // 2) Create the parent form
    this.parentForm = this.fb.group({
      basic: this.addMandateShowBasicForm,
      assets: this.addMandateShowAssetTypeForm,
      fees: this.addMandateShowFeeForm,
      financialActivities: this.addMandateShowFinancialActivityForm,
    });

    // 3) Wire listeners and do initial recompute
    this.setupCalcListeners();
    this.recalcNfaAndPercent();
    this.recalcRvAndProvision();
    this.recalcReserveAmounts();
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
    //Currency Exchange Rates Dropdown
    this.currencyExchangeRateFacade.loadAll();
    this.currencyExchangeRates$ = this.currencyExchangeRateFacade.items$;
    //Currencies Dropdown
    this.currenciesFacade.loadAll();
    this.currencies$ = this.currenciesFacade.all$;
    //Payment Periods Dropdown
    this.paymentPeriodsFacade.loadAll();
    this.paymentPeriods$ = this.paymentPeriodsFacade.all$;
    this.paymentPeriods$
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => (this.paymentPeriodsCache = list ?? []));
    //Payment Methods Dropdown
    this.paymentMethodsFacade.loadAll();
    this.paymentMethods$ = this.paymentMethodsFacade.all$;
    //Rent Structure Types Dropdown
    this.rentStructureTypesFacade.loadAll();
    this.rentStructureTypes$ = this.rentStructureTypesFacade.all$;
    //Payment Timing Terms Dropdown
    this.paymentTimingTermsFacade.loadAll();
    this.paymentTimingTerms$ = this.paymentTimingTermsFacade.all$;
    //Interest Rate Benchmarks Dropdown
    this.interestRateBenchmarksFacade.loadAll();
    this.interestRateBenchmarks$ = this.interestRateBenchmarksFacade.all$;
    //Payment Month Days Dropdown
    this.paymentMonthDaysFacade.loadAll();
    this.paymentMonthDays$ = this.paymentMonthDaysFacade.all$;
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
  /** Progress bar width in %, discrete per step. */
  get progressWidth(): number {
    if (!this.totalSteps) return 0;
    return (this.currentStep / this.totalSteps) * 100; // step 1 => 20% for 5 steps
  }
  get segmentWidth(): number {
    return 100 / this.totalSteps;
  }

  get thumbLeft(): number {
    if (!this.totalSteps) return 0;
    const pos = (this.currentStep - 1) * (100 / this.totalSteps);
    return Math.min(pos, 100 - this.segmentWidth);
  }

  /** Return the current step's form group to validate navigation. */
  get currentStepForm(): FormGroup | null {
    switch (this.currentStep) {
      case 1:
        return this.addMandateShowBasicForm;
      case 2:
        return this.addMandateShowAssetTypeForm;
      case 3:
        return this.addMandateShowFeeForm;
      case 4:
        return this.addMandateShowFinancialActivityForm;
      default:
        return null;
    }
  }

  /** Block Next unless current step is valid (or view-only). */
  get canMoveNext(): boolean {
    if (this.viewOnly) return true;
    const fg = this.currentStepForm;
    return !!fg && fg.valid;
  }
  next(): void {
    if (this.currentStep >= this.totalSteps) return;
    this.currentStepForm?.markAllAsTouched();
    this.currentStep++;
  }

  previous(): void {
    if (this.currentStep <= 1) return;
    this.currentStep--;
  }

  private getMonthCount(): number {
    const pid = +this.fa1.get('paymentPeriodId')?.value || 0;
    if (!pid) return 0;
    return this.paymentPeriodsCache.find((p) => p.id === pid)?.monthCount ?? 0;
  }
  private patchMandate(m: Mandate) {
    this.mandateId = m.mandateId;

    // basic
    this.addMandateShowBasicForm.patchValue({
      id: m.id,
      parentMandateId: m.parentMandateId,
      clientId: this.clientId ?? m.clientId ?? m.clientView?.clientId,
      leasingTypeId: m.leasingTypeId,
      insuredById: m.insuredById,
      date: m.date ? new Date(m.date) : null,
      validityDay: m.validityDay ?? null,
      expireDate: m.expireDate ? new Date(m.expireDate) : null,
      notes: m.notes,
    });

    // fa1
    this.addMandateShowFinancialActivityForm.patchValue({
      assetCost: m.assetCost,
      downPayment: m.downPayment,
      percentOfFinance: m.percentOfFinance,
      nfa: m.nfa,
      years: m.years,
      startDate: m.startDate ? new Date(m.startDate) : null,
      interestRate: m.interestRate,
      insuranceRate: m.insuranceRate,
      tenor: m.tenor,
      paymentPeriodId: m.paymentPeriodId,
      gracePeriodInDays: m.gracePeriodInDays,
      currencyId: m.currencyId,
      currencyExchangeRateId: m.currencyExchangeRateId,
      isManuaExchangeRate: m.isManuaExchangeRate,
      manualSetExchangeRate: m.manualSetExchangeRate,
    });
    const manual = !!m.isManuaExchangeRate;
    const manualCtrl = this.addMandateShowFinancialActivityForm.get(
      'manualSetExchangeRate'
    );
    if (manual) manualCtrl?.enable({ emitEvent: false });
    else manualCtrl?.disable({ emitEvent: false });
    // recompute derived fields after patch
    this.recalcNfaAndPercent();
    this.recalcRvAndProvision();
    this.recalcReserveAmounts();

    // fa1
    this.addMandateShowFinancialActivityForm.patchValue({
      indicativeRentals: m.indicativeRentals,
      rent: m.rent,
      rvPercent: m.rvPercent,
      rvAmount: m.rvAmount,
      reservePaymentCount: m.reservePaymentCount,
      reservePaymentAmount: m.reservePaymentAmount,
      provisionPercent: m.provisionPercent,
      provisionAmount: m.provisionAmount,
      interestRateBenchmarkId: m.interestRateBenchmarkId,
      paymentTimingTermId: m.paymentTimingTermId,
      rentStructureTypeId: m.rentStructureTypeId,
      paymentMethodID: m.paymentMethodId, // Id -> ID back to control
      paymentMonthDayID: m.paymentMonthDayId, // Id -> ID back to control
    });

    // arrays
    const resetArray = (
      fa: FormArray,
      items: any[],
      factory: () => FormGroup
    ) => {
      fa.clear();
      (items || []).forEach((item) => {
        const fg = factory();
        fg.patchValue(item);
        fa.push(fg);
      });
    };

    resetArray(this.mandateAssetTypes, m.mandateAssetTypes || [], () =>
      this.createAssetTypeGroup()
    );

    const feesFa = this.addMandateShowFeeForm.get('mandateFees') as FormArray;
    resetArray(feesFa, m.mandateFees || [], () => this.createFeeGroup());

    // workflow UI bits (unchanged)
    this.workFlowActionList = (m.allowedMandateWorkFlowActions ?? []).map(
      (a) => ({
        id: a.id,
        label: a.name,
        icon: 'pi pi-times',
      })
    );
    this.selectedAction = m.mandateCurrentWorkFlowAction?.name ?? '';
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
  buildMandateShowFinancialActivityForm(): void {
    this.addMandateShowFinancialActivityForm = this.fb.group({
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
      isManuaExchangeRate: [false],
      manualSetExchangeRate: [{ value: null, disabled: true }],
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
  // ✅ do NOT reach into parentForm here
  get fa1(): FormGroup {
    return this.addMandateShowFinancialActivityForm;
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

  private logStepStatuses(): void {
    const log = (label: string, g: FormGroup) =>
      console.log(
        `${label} -> touched=${g.touched}, dirty=${g.dirty}, valid=${g.valid}, status=${g.status}`,
        g.errors
      );

    log('Step1 basic', this.addMandateShowBasicForm);
    log('Step2 assets', this.addMandateShowAssetTypeForm);
    log('Step3 fees', this.addMandateShowFeeForm);
    log('Step4 FA1', this.addMandateShowFinancialActivityForm);
    console.log(
      'ParentForm -> touched=%s, dirty=%s, valid=%s, status=%s',
      this.parentForm.touched,
      this.parentForm.dirty,
      this.parentForm.valid,
      this.parentForm.status,
      this.parentForm.errors
    );
  }

  /** Deep log of every control (FormGroup/FormArray/FormControl) with its path */
  private logControlTree(ctrl: AbstractControl, path = 'parentForm'): void {
    const head = `${path} -> touched=${ctrl.touched}, dirty=${ctrl.dirty}, valid=${ctrl.valid}, status=${ctrl.status}`;
    if (ctrl instanceof FormGroup) {
      console.log(head, ctrl.errors);
      Object.keys(ctrl.controls).forEach((k) =>
        this.logControlTree(ctrl.controls[k], `${path}.${k}`)
      );
    } else if (ctrl instanceof FormArray) {
      console.log(`${head} [Array length=${ctrl.length}]`, ctrl.errors);
      ctrl.controls.forEach((c, i) => this.logControlTree(c, `${path}[${i}]`));
    } else if (ctrl instanceof FormControl) {
      console.log(`${head}, value=`, ctrl.value, 'errors=', ctrl.errors);
    }
  }

  /** Optional: find the first invalid control path to focus/highlight */
  private findFirstInvalidPath(
    ctrl: AbstractControl,
    path = 'parentForm'
  ): string | null {
    if (ctrl.valid) return null;
    if (ctrl instanceof FormGroup) {
      for (const k of Object.keys(ctrl.controls)) {
        const p = this.findFirstInvalidPath(ctrl.controls[k], `${path}.${k}`);
        if (p) return p;
      }
      return path;
    }
    if (ctrl instanceof FormArray) {
      for (let i = 0; i < ctrl.length; i++) {
        const p = this.findFirstInvalidPath(ctrl.at(i), `${path}[${i}]`);
        if (p) return p;
      }
      return path;
    }
    return path; // FormControl
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
      !this.addMandateShowFinancialActivityForm.dirty &&
      !this.addMandateShowAssetTypeForm.dirty
    );
  }
  private mapToPayload(): Partial<Mandate> {
    const basic = this.addMandateShowBasicForm.getRawValue(); // includes disabled expireDate
    const fa1 = this.addMandateShowFinancialActivityForm.getRawValue();
    const assets = this.addMandateShowAssetTypeForm.getRawValue();
    const fees = this.addMandateShowFeeForm.getRawValue();

    return {
      // --- basic ---
      description: undefined, // add a form control for description later if your API requires it
      date: basic.date,
      clientId: this.clientId ?? basic.clientId,
      parentMandateId: basic.parentMandateId,
      leasingTypeId: basic.leasingTypeId,
      validityDay: basic.validityDay,
      expireDate: basic.expireDate,
      notes: basic.notes,
      insuredById: basic.insuredById,

      // --- financialActivities1 ---
      assetCost: fa1.assetCost,
      downPayment: fa1.downPayment,
      percentOfFinance: fa1.percentOfFinance,
      nfa: fa1.nfa,
      interestRate: fa1.interestRate,
      insuranceRate: fa1.insuranceRate,
      tenor: fa1.tenor,
      paymentPeriodId: fa1.paymentPeriodId,
      gracePeriodInDays: fa1.gracePeriodInDays,
      currencyId: fa1.currencyId,
      currencyExchangeRateId: fa1.currencyExchangeRateId,
      manualSetExchangeRate: fa1.manualSetExchangeRate,
      isManuaExchangeRate: fa1.isManuaExchangeRate,
      startDate: fa1.startDate,
      years: fa1.years,

      // --- financialActivities2 ---
      indicativeRentals: fa1.indicativeRentals,
      rent: fa1.rent,
      rvAmount: fa1.rvAmount,
      rvPercent: fa1.rvPercent,
      provisionAmount: fa1.provisionAmount,
      provisionPercent: fa1.provisionPercent,
      reservePaymentAmount: fa1.reservePaymentAmount,
      reservePaymentCount: fa1.reservePaymentCount,
      interestRateBenchmarkId: fa1.interestRateBenchmarkId,
      rentStructureTypeId: fa1.rentStructureTypeId,
      paymentTimingTermId: fa1.paymentTimingTermId,
      paymentMethodId: fa1.paymentMethodID, // ID -> Id for API
      paymentMonthDayId: fa1.paymentMonthDayID,

      // --- arrays ---
      mandateAssetTypes: assets.mandateAssetTypes,
      mandateFees: fees.mandateFees,
    };
  }
  // Add inside AddMandateComponent (class body)
  private setupCalcListeners(): void {
    // === FA1: Core finance ===
    this.fa1.get('assetCost')?.valueChanges.subscribe(() => {
      this.recalcNfaAndPercent();
      this.recalcReserveAmounts();
    });

    this.fa1.get('downPayment')?.valueChanges.subscribe(() => {
      this.recalcNfaAndPercent();
      this.recalcReserveAmounts();
    });

    this.fa1.get('percentOfFinance')?.valueChanges.subscribe(() => {
      this.recalcNfaAndPercent();
      this.recalcReserveAmounts();
    });

    this.fa1.get('insuranceRate')?.valueChanges.subscribe(() => {
      this.recalcReserveAmounts();
    });

    this.fa1.get('paymentPeriodId')?.valueChanges.subscribe(() => {
      this.recalcReserveAmounts();
    });
    this.fa1.get('interestRate')?.valueChanges.subscribe(() => {
      this.calcPeriodInterestRate();
    });
    this.fa1.get('paymentPeriodId')?.valueChanges.subscribe(() => {
      this.calcPeriodInterestRate();
    });

    // Toggle manual exchange rate box
    this.fa1
      .get('isManuaExchangeRate')
      ?.valueChanges.subscribe((checked: boolean) => {
        const ctrl = this.fa1.get('manualSetExchangeRate');
        if (!ctrl) return;
        if (checked) ctrl.enable({ emitEvent: false });
        else {
          ctrl.setValue(0, { emitEvent: false });
          ctrl.disable({ emitEvent: false });
        }
      });

    // === FA1: RV / Provision / Reserve ===
    this.fa1.get('rvAmount')?.valueChanges.subscribe(() => {
      this.calcRvPercentFromAmount();
      this.calcProvisionPercent(); // depends on nfa & rv
      this.calcProvisionAmount();
    });

    this.fa1.get('rvPercent')?.valueChanges.subscribe(() => {
      this.calcRvAmountFromPercent();
      this.calcProvisionPercent();
      this.calcProvisionAmount();
    });

    this.fa1.get('provisionAmount')?.valueChanges.subscribe(() => {
      this.calcProvisionPercent();
    });

    this.fa1.get('provisionPercent')?.valueChanges.subscribe(() => {
      this.calcProvisionAmount();
    });

    this.fa1.get('rent')?.valueChanges.subscribe(() => {
      this.recalcReserveAmounts();
    });

    this.fa1.get('reservePaymentAmount')?.valueChanges.subscribe(() => {
      this.calcReservePaymentCount();
    });

    this.fa1.get('reservePaymentCount')?.valueChanges.subscribe(() => {
      this.calcReservePaymentAmount();
    });
  }
  // Add inside AddMandateComponent (class body)

  // --- small helpers ---
  private num(v: any, def = 0): number {
    const n = +v;
    return Number.isFinite(n) ? n : def;
  }
  private round(n: number, dp = 3): number {
    return +parseFloat(String(n)).toFixed(dp);
  }

  /** Get monthCount for a paymentPeriodId from the store once, then call cb. */
  private withMonthCount(cb: (monthCount: number) => void): void {
    const pid = this.num(this.fa1.get('paymentPeriodId')?.value);
    if (!pid) return cb(0);
    this.paymentPeriods$?.pipe(take(1)).subscribe((periods) => {
      const mm = periods?.find((p) => p.id === pid)?.monthCount ?? 0;
      cb(this.num(mm));
    });
  }

  // --- NFA & % of finance (FA1) ---
  private recalcNfaAndPercent(): void {
    const assetCost = this.fa1.get('assetCost')?.value;
    const downPayment = this.fa1.get('downPayment')?.value;
    const percentOfFinance = this.fa1.get('percentOfFinance')?.value;

    let dp = +downPayment || 0;
    let p = +percentOfFinance || 0;

    if (+assetCost > 0 && p > 0 && dp === 0) {
      dp = calcDownFromPercent(assetCost, p);
      this.fa1.get('downPayment')?.setValue(dp, { emitEvent: false });
    } else if (+assetCost > 0 && dp > 0) {
      p = calcPercentFromDown(assetCost, dp);
      this.fa1.get('percentOfFinance')?.setValue(p, { emitEvent: false });
    }

    const nfa = calcNfa(assetCost, dp);
    this.fa1.get('nfa')?.setValue(nfa, { emitEvent: false });
    this.recalcRvAndProvision();
  }
  // --- RV & Provision (FA1) ---
  private recalcRvAndProvision(): void {
    this.calcRvAmountFromPercent();
    this.calcProvisionPercent();
    this.calcProvisionAmount();
  }

  private calcRvPercentFromAmount(): void {
    const nfa = this.fa1.get('nfa')?.value;
    const rvAmount = this.fa1.get('rvAmount')?.value;
    const pct = calcRvPercent(nfa, rvAmount);
    this.fa1.get('rvPercent')?.setValue(pct, { emitEvent: false });
  }

  private calcRvAmountFromPercent(): void {
    const nfa = this.fa1.get('nfa')?.value;
    const rvPercent = this.fa1.get('rvPercent')?.value;
    const amt = calcRvAmount(nfa, rvPercent);
    this.fa1.get('rvAmount')?.setValue(amt, { emitEvent: false });
  }
  private calcProvisionPercent(): void {
    const nfa = this.fa1.get('nfa')?.value;
    const rvAmount = this.fa1.get('rvAmount')?.value;
    const provAmt = this.fa1.get('provisionAmount')?.value;
    const pct = calcProvisionPercent(nfa, rvAmount, provAmt);
    this.fa1.get('provisionPercent')?.setValue(pct, { emitEvent: false });
  }

  private calcProvisionAmount(): void {
    const nfa = this.fa1.get('nfa')?.value;
    const rvAmount = this.fa1.get('rvAmount')?.value;
    const provPct = this.fa1.get('provisionPercent')?.value;
    const amt = calcProvisionAmount(nfa, rvAmount, provPct);
    this.fa1.get('provisionAmount')?.setValue(amt, { emitEvent: false });
  }

  // --- Reserve (FA1) ---
  private recalcReserveAmounts(): void {
    this.calcReservePaymentAmount();
  }

  private calcReservePaymentAmount(): void {
    const rent = this.fa1.get('rent')?.value;
    const assetCost = this.fa1.get('assetCost')?.value;
    const insuranceRate = this.fa1.get('insuranceRate')?.value;
    const reserveCount = this.fa1.get('reservePaymentCount')?.value;
    const monthCount = this.getMonthCount(); // you already cache this

    const amount = calcReservePaymentAmount(
      reserveCount,
      rent,
      assetCost,
      insuranceRate,
      monthCount
    );
    this.fa1
      .get('reservePaymentAmount')
      ?.setValue(amount, { emitEvent: false });
  }

  private calcReservePaymentCount(): void {
    const rent = this.fa1.get('rent')?.value;
    const assetCost = this.fa1.get('assetCost')?.value;
    const insuranceRate = this.fa1.get('insuranceRate')?.value;
    const reserveAmount = this.fa1.get('reservePaymentAmount')?.value;
    const monthCount = 0;

    const count = calcReservePaymentCount(
      reserveAmount,
      rent,
      assetCost,
      insuranceRate,
      monthCount
    );
    this.fa1.get('reservePaymentCount')?.setValue(count, { emitEvent: false });
  }

  private calcPeriodInterestRate(): number {
    const annual = this.fa1.get('interestRate')?.value;
    const m = this.getMonthCount();
    const value = calcPeriodInterestRate(annual, m);

    // save into a control if you want to persist it
    this.fa1.get('periodInterestRate')?.setValue(value, { emitEvent: false });

    return value;
  }

  onSubmit() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // mark + validate
    this.parentForm.markAllAsTouched();
    this.parentForm.updateValueAndValidity({ emitEvent: true });
    this.addMandateShowFinancialActivityForm.updateValueAndValidity({
      emitEvent: true,
    }); // because updateOn: 'submit'

    // 🔎 logs
    console.log('===== SUBMIT DEBUG =====');
    this.logStepStatuses();
    this.logControlTree(this.parentForm);
    const firstBad = this.findFirstInvalidPath(this.parentForm);
    if (!this.viewOnly && this.parentForm.invalid) {
      console.warn('First invalid control:', firstBad);
      return;
    }
    if (this.viewOnly) return;

    if (this.parentForm.invalid) {
      this.parentForm.markAllAsTouched();
      return;
    }

    const payload = this.mapToPayload();

    if (this.editMode) {
      const leaseId = +this.route.snapshot.paramMap.get('leasingId')!;
      this.facade.update(leaseId, payload);
    } else {
      this.facade.create(payload);
    }

    // (optional) mark clean
    this.addMandateShowBasicForm.markAsPristine();
    this.addMandateShowAssetTypeForm.markAsPristine();
    this.addMandateShowFinancialActivityForm.markAsPristine();
    this.isSubmitting = false;
  }
}
