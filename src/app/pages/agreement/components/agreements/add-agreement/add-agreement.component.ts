import { Component, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  AbstractControl,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subject,
  takeUntil,
  combineLatest,
  map,
  filter,
  tap,
  switchMap,
  take,
  of,
  merge,
  forkJoin,
} from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Client } from '../../../../crm/clients/store/_clients/allclients/client.model';
import { ClientsFacade } from '../../../../crm/clients/store/_clients/allclients/clients.facade';
import { FinancialForm } from '../../../../crm/leasing-mandates/store/financial-form/financial-form.model';
import { FinancialFormsFacade } from '../../../../crm/leasing-mandates/store/financial-form/financial-forms.facade';
import { selectCalculatedRowsForId } from '../../../../crm/leasing-mandates/store/financial-form/financial-forms.selectors';
import { PaymentsRequest } from '../../../../crm/leasing-mandates/store/financial-form/payments-request.model';
import { Mandate } from '../../../../crm/leasing-mandates/store/leasing-mandates/leasing-mandate.model';
import { MandatesFacade } from '../../../../crm/leasing-mandates/store/leasing-mandates/leasing-mandates.facade';
import { AssetType } from '../../../../lookups/store/asset-types/asset-type.model';
import { AssetTypesFacade } from '../../../../lookups/store/asset-types/asset-types.facade';
import { CurrenciesFacade } from '../../../../lookups/store/currencies/currencies.facade';
import { Currency } from '../../../../lookups/store/currencies/currency.model';
import { CurrencyExchangeRate } from '../../../../lookups/store/currency-exchange-rates/currency-exchange-rate.model';
import { loadCurrencyExchangeRates } from '../../../../lookups/store/currency-exchange-rates/currency-exchange-rates.actions';
import { CurrencyExchangeRatesFacade } from '../../../../lookups/store/currency-exchange-rates/currency-exchange-rates.facade';
import { FeeType } from '../../../../lookups/store/fee-types/fee-type.model';
import { FeeTypesFacade } from '../../../../lookups/store/fee-types/fee-types.facade';
import { InsuredByFacade } from '../../../../lookups/store/insured-by/insured-by.facade';
import { InsuredBy } from '../../../../lookups/store/insured-by/insured-by.model';
import { InterestRateBenchMark } from '../../../../lookups/store/interest-rate-benchmarks/interest-rate-benchmark.model';
import { InterestRateBenchMarksFacade } from '../../../../lookups/store/interest-rate-benchmarks/interest-rate-benchmarks.facade';
import { LeasingType } from '../../../../lookups/store/leasing-types/leasing-type.model';
import { LeasingTypesFacade } from '../../../../lookups/store/leasing-types/leasing-types.facade';
import { PaymentMethod } from '../../../../lookups/store/payment-methods/payment-method.model';
import { PaymentMethodsFacade } from '../../../../lookups/store/payment-methods/payment-methods.facade';
import { PaymentMonthDay } from '../../../../lookups/store/payment-month-days/payment-month-day.model';
import { PaymentMonthDaysFacade } from '../../../../lookups/store/payment-month-days/payment-month-days.facade';
import { PaymentPeriod } from '../../../../lookups/store/payment-periods/payment-period.model';
import { PaymentPeriodsFacade } from '../../../../lookups/store/payment-periods/payment-periods.facade';
import { PaymentTimingTerm } from '../../../../lookups/store/payment-timing-terms/payment-timing-term.model';
import { PaymentTimingTermsFacade } from '../../../../lookups/store/payment-timing-terms/payment-timing-terms.facade';
import { PeriodUnit } from '../../../../lookups/store/period-units/period-unit.model';
import { GracePeriodUnitsFacade } from '../../../../lookups/store/period-units/period-units.facade';
import { RentStructureType } from '../../../../lookups/store/rent-structure-types/rent-structure-type.model';
import { RentStructureTypesFacade } from '../../../../lookups/store/rent-structure-types/rent-structure-types.facade';
import { loadAll as loadAssetTypes } from '../../../../lookups/store/asset-types/asset-types.actions';
import { loadAll as loadFeeTypes } from '../../../../lookups/store/fee-types/fee-types.actions';
import { loadAll as loadInterestRateBenchmarks } from '../../../../lookups/store/interest-rate-benchmarks/interest-rate-benchmarks.actions';
import { loadAll as loadPaymentTimingTerms } from '../../../../lookups/store/payment-timing-terms/payment-timing-terms.actions';
import { loadAll as loadRentStructureTypes } from '../../../../lookups/store/rent-structure-types/rent-structure-types.actions';
import { loadAll as loadPaymentMethods } from '../../../../lookups/store/payment-methods/payment-methods.actions';
import { loadAll as loadPaymentMonthDays } from '../../../../lookups/store/payment-month-days/payment-month-days.actions';
import { loadAll as loadAllGracePeriodUnits } from '../../../../lookups/store/period-units/period-units.actions';
import { loadAll as loadCurrencies } from '../../../../lookups/store/currencies/currencies.actions';
import * as MandateActions from '../../../../crm/leasing-mandates/store/leasing-mandates/leasing-mandates.actions';
import { Branch } from '../../../../organizations/store/branches/branch.model';
import { BranchesFacade } from '../../../../organizations/store/branches/branches.facade';
import { Portfolio } from '../../../../lookups/store/portfolios/portfolio.model';
import { PortfoliosFacade } from '../../../../lookups/store/portfolios/portfolios.facade';
import { BusinessSource } from '../../../../lookups/store/business-sources/business-source.model';
import { BusinessSourcesFacade } from '../../../../lookups/store/business-sources/business-sources.facade';

@Component({
  selector: 'app-add-agreement',
  standalone: false,
  templateUrl: './add-agreement.component.html',
  styleUrl: './add-agreement.component.scss',
})
export class AddAgreementComponent {
  /*Dropdowns*/
  //Main Info Form
  clientNames$!: Observable<Client[]>;
  leasingTypes$!: Observable<LeasingType[]>;
  insuredBy$!: Observable<InsuredBy[]>;
  branches$!: Observable<Branch[]>;
  portfolios$!: Observable<Portfolio[]>;
  businessSources$!: Observable<BusinessSource[]>;
  //Agreement Assets Form
  workFlowActionList: any[] = [];
  selectedAction: string = '';
  public mandateId: any = null;
  public leasingMandateId: any = null;
  raw = this.route.snapshot.paramMap.get('clientId');
  clientId: number | undefined = this.raw ? Number(this.raw) : undefined;
  show = false;
  editShow = false;
  private paymentPeriodsCache: PaymentPeriod[] = [];
  isSubmitting = false;
  parentForm!: FormGroup;
  addAgreementShowMainInformationForm!: FormGroup;
  addMandateShowAssetTypeForm!: FormGroup;
  addMandateShowFeeForm!: FormGroup;
  editMode: boolean = false;
  viewOnly: boolean = false;
  assetTypes$!: Observable<AssetType[]>;
  feeTypes$!: Observable<FeeType[]>;
  currencyExchangeRates$!: Observable<CurrencyExchangeRate[]>;
  currencies$!: Observable<Currency[]>;
  paymentPeriods$!: Observable<PaymentPeriod[]>;
  paymentMethods$!: Observable<PaymentMethod[]>;
  rentStructureTypes$!: Observable<RentStructureType[]>;
  paymentTimingTerms$!: Observable<PaymentTimingTerm[]>;
  paymentMonthDays$!: Observable<PaymentMonthDay[]>;
  private destroy$ = new Subject<void>();
  steps = [1, 2, 3, 4];
  stepTitles = [
    'Main Information',
    'Agreement Assets',
    'Fees',
    'Financial Activities',
  ];
  totalSteps = this.steps.length;
  currentStep = 1;
  //leasing financial form
  tableDataInside: any[] = [];
  leasingFinancialBasicForm!: FormGroup;
  leasingFinancialRateForm!: FormGroup;
  leasingFinancialCurrencyForm!: FormGroup;
  selectedGracePeriodUnit!: PeriodUnit;
  selectedCurrency!: Currency;
  currencyExchangeRateId: any;
  originalFinancialForms: any[] = [];
  showFilters: boolean = false;
  selectedFinancialFormId: number | null = null;
  showDeleteModal: boolean = false;
  first2: number = 0;
  financialForm$ = this.facade.selected$;
  @ViewChild('tableRef') tableRef!: TableComponent;
  private allowLeaveAfterSave = false;
  readonly colsInside = [
    { field: 'paymentNumber', header: 'Payment Number' },
    { field: 'dueDate', header: 'Due Date' },
    { field: 'balanceBefore', header: 'Balance Before' },
    { field: 'balanceAfter', header: 'Balance After' },
    { field: 'interest', header: 'Interest' },
    // { field: 'principal', header: 'Principal' },
    { field: 'installment', header: 'Installment' },
    { field: 'insuranceIncome', header: 'Insurance Income' },
  ];
  gracePeriodUnits$!: Observable<PeriodUnit[]>;
  interestRateBenchMarks$!: Observable<InterestRateBenchMark[]>;
  rentStructures$!: Observable<RentStructureType[]>;
  private currentMandateId!: number;
  routeId = this.route.snapshot.params['leasingId'];
  mandate!: any;
  private extraCurrencyRates: CurrencyExchangeRate[] = [];
  selectedIds: number[] = [];
  private patchedStep4FromMandate = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private clientFacade: ClientsFacade,
    private leasingTypeFacade: LeasingTypesFacade,
    private insuredByFacade: InsuredByFacade,
    private assetTypesFacade: AssetTypesFacade,
    private branchesFacade: BranchesFacade,
    private feeTypesFacade: FeeTypesFacade,
    private facade: MandatesFacade,
    private currenciesFacade: CurrenciesFacade,
    private paymentPeriodsFacade: PaymentPeriodsFacade,
    private paymentMethodsFacade: PaymentMethodsFacade,
    private rentStructureTypesFacade: RentStructureTypesFacade,
    private paymentTimingTermsFacade: PaymentTimingTermsFacade,
    private interestRateBenchmarksFacade: InterestRateBenchMarksFacade,
    private paymentMonthDaysFacade: PaymentMonthDaysFacade,
    private route: ActivatedRoute,
    private router: Router,
    //leasing financial form
    private gracePeriodUnitFacade: GracePeriodUnitsFacade,
    private currencyExchangeRatesFacade: CurrencyExchangeRatesFacade,
    private interestRateFacade: InterestRateBenchMarksFacade,
    private paymentTimingFacade: PaymentTimingTermsFacade,
    private rentStructuresFacade: RentStructureTypesFacade,
    private financialFormsFacade: FinancialFormsFacade,
    private actions$: Actions,
    private portfoliosFacade: PortfoliosFacade,
    private businessSourcesFacade: BusinessSourcesFacade
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
    //Dropdowns
    this.clientFacade.loadAll();
    this.clientNames$ = this.clientFacade.all$;
    this.leasingTypeFacade.loadAll();
    this.leasingTypes$ = this.leasingTypeFacade.all$;
    this.insuredByFacade.loadAll();
    this.insuredBy$ = this.insuredByFacade.all$;
    this.branchesFacade.loadAll();
    this.branches$ = this.branchesFacade.all$;
    this.portfoliosFacade.loadAll();
    this.portfolios$ = this.portfoliosFacade.all$;
    this.portfoliosFacade.loadAll();
    this.portfolios$ = this.portfoliosFacade.all$;
    this.businessSourcesFacade.loadAll();
    this.businessSources$ = this.businessSourcesFacade.all$;

    //Build all sub-forms
    this.buildAgreementShowMainForm();
    this.buildMandateShowAssetTypeForm();
    this.buildMandateShowFeeForm();
    //Build the three sub-forms
    this.initializeLeasingFinancialBasicForm();
    this.initializeLeasingFinancialRatesForm();
    this.initializeLeasingFinancialCurrencyForm();
    console.log('Basic', this.leasingFinancialBasicForm);
    console.log('Rate', this.leasingFinancialRateForm);
    console.log('Currency', this.leasingFinancialCurrencyForm);

    //Create the parent form
    this.parentForm = this.fb.group({
      basic: this.addAgreementShowMainInformationForm,
      assets: this.addMandateShowAssetTypeForm,
      fees: this.addMandateShowFeeForm,

      financialActivities: this.fb.group({
        basic: this.leasingFinancialBasicForm,
        rates: this.leasingFinancialRateForm,
        currency: this.leasingFinancialCurrencyForm,
      }),
    });

    this.store.dispatch(loadAssetTypes({}));
    this.store.dispatch(loadFeeTypes({}));

    //Leasing Types Dropdown
    this.leasingTypes$ = this.leasingTypeFacade.all$;
    //Insured By Dropdown
    //Asset Type Dropdown
    this.assetTypes$ = this.assetTypesFacade.all$;
    //Fee Types Dropdown
    this.feeTypes$ = this.feeTypesFacade.all$;
    //Currency Exchange Rates Dropdown
    this.currencyExchangeRatesFacade.loadAll();
    this.currencyExchangeRates$ = this.currencyExchangeRatesFacade.items$;
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
    this.rentStructures$ = this.rentStructureTypesFacade.all$;
    //Payment Timing Terms Dropdown
    this.paymentTimingTermsFacade.loadAll();
    this.paymentTimingTerms$ = this.paymentTimingTermsFacade.all$;
    //Interest Rate Benchmarks Dropdown
    this.interestRateBenchmarksFacade.loadAll();
    this.interestRateBenchMarks$ = this.interestRateBenchmarksFacade.all$;
    //Payment Month Days Dropdown
    this.paymentMonthDaysFacade.loadAll();
    this.paymentMonthDays$ = this.paymentMonthDaysFacade.all$;
    //leasing financial form

    //Set up value-change listeners, etc.
    this.setupFormListeners();
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

    //Dispatch all lookups
    this.store.dispatch(loadAllGracePeriodUnits({})); // grace units
    this.store.dispatch(loadCurrencies({})); // currencies
    this.store.dispatch(loadCurrencyExchangeRates()); // exchange rates
    this.store.dispatch(loadInterestRateBenchmarks({}));
    this.store.dispatch(loadPaymentTimingTerms({}));
    this.store.dispatch(loadRentStructureTypes({}));
    this.store.dispatch(loadPaymentMethods({}));
    this.store.dispatch(loadPaymentMonthDays({}));

    //Expose your Observables
    this.paymentPeriods$ = this.paymentPeriodsFacade.all$;
    this.gracePeriodUnits$ = this.gracePeriodUnitFacade.all$;
    this.currencies$ = this.currenciesFacade.all$;
    this.currencyExchangeRates$ = this.currencyExchangeRatesFacade.items$;
    this.interestRateBenchMarks$ = this.interestRateFacade.all$;
    this.paymentTimingTerms$ = this.paymentTimingFacade.all$;
    this.rentStructures$ = this.rentStructuresFacade.all$;
    this.paymentMethods$ = this.paymentMethodsFacade.all$;
    this.paymentMonthDays$ = this.paymentMonthDaysFacade.all$;

    //Load the financial form for this mandate

    // const leasingId = Number(this.route.snapshot.paramMap.get('leasingId'));
    // if (Number.isFinite(leasingId)) {
    //   this.financialFormsFacade.loadByLeasingMandateId(leasingId);
    // }

    this.facade.selected$
      .pipe(takeUntil(this.destroy$))
      .subscribe((form: Mandate | undefined) => {
        if (form === undefined) {
          return;
        }
        this.mandate = form;
        this.workFlowActionList =
          this.mandate.allowedMandateWorkFlowActions?.map(
            (action: { id: any; name: any }) => ({
              id: action.id,
              label: action.name,
              icon: 'pi pi-times',
            })
          );
        this.selectedAction =
          this.mandate.mandateCurrentWorkFlowAction.name ?? '';
        console.log('✅ this.selectedAction', this.selectedAction);
      });

    this.currencyExchangeRates$ = this.currencyExchangeRatesFacade.items$;
    combineLatest([
      this.currencyExchangeRatesFacade.items$.pipe(take(1)),
      this.financialFormsFacade.selected$.pipe(
        filter((f) => !!f),
        take(1)
      ),
    ]).subscribe(([rates, form]) => {
      const injectedRate = form.currencyExchangeRateDto;
      const exists = rates.some((rate) => rate.id === injectedRate?.id);

      //Assign merged observable with full list
      if (!exists && injectedRate) {
        this.extraCurrencyRates = [injectedRate];
      } else {
        this.extraCurrencyRates = [];
      }

      this.currencyExchangeRates$ = combineLatest([
        this.currencyExchangeRatesFacade.items$,
        of(this.extraCurrencyRates),
      ]).pipe(
        map(([storeRates, extras]) => {
          const allRates = [...storeRates];
          extras.forEach((r: any) => {
            if (!allRates.find((x) => x.id === r.id)) {
              allRates.push(r);
            }
          });
          return allRates;
        })
      );

      this.leasingFinancialCurrencyForm.patchValue({
        currencyExchangeRateId: injectedRate?.id,
      });
    });

    //Patch the two sub-forms (basic + rates) as soon as the form arrives
    this.financialFormsFacade.selected$
      .pipe(
        filter((f) => !!f),
        takeUntil(this.destroy$)
      )
      .subscribe((form) => {
        if (this.patchedStep4FromMandate) {
          // still OK to use its payments if you want:
          if (form?.payments?.length && !this.originalFinancialForms?.length) {
            this.tableDataInside = [...form.payments];
            this.originalFinancialForms = [...form.payments];
            this.filteredFinancialForms = [...form.payments];
          }
          return;
        }
      });

    //Only once both the form and the rates list are loaded,
    //patch the currencyExchangeRateId so the <p-select> can match an option.
    this.store
      .select(selectCalculatedRowsForId(this.currentMandateId))
      .pipe(takeUntil(this.destroy$))
      .subscribe((rows) => {
        this.tableDataInside = [...rows];
        this.originalFinancialForms = [...rows];
        //this.filteredFinancialForms = [...rows];
      });

    const isManual = this.leasingFinancialCurrencyForm.get(
      'isManuaExchangeRate'
    )?.value;
    const manualSetExchangeRateControl = this.leasingFinancialCurrencyForm.get(
      'manualSetExchangeRate'
    );
    if (manualSetExchangeRateControl) {
      if (isManual) {
        manualSetExchangeRateControl.enable({ emitEvent: false });
      } else {
        manualSetExchangeRateControl.disable({ emitEvent: false });
      }
    }
    // ⬇️ when create succeeds → go back to View Mandates
    const navigateToList = () => {
      const tree = this.clientId
        ? ['/crm/leasing-mandates/view-mandates', +this.clientId]
        : ['/crm/leasing-mandates/view-mandates'];

      console.log('[Navigate] Preparing to navigate to:', tree);

      // Important: allow the guard
      this.allowLeaveAfterSave = true;
      this.markAllPristine();

      // (optional) ensure latest list from backend
      console.log('[Navigate] Reloading list before navigation…');

      this.router.navigate(tree).then(
        (ok) => console.log('[Navigate] router.navigate resolved. ok=', ok),
        (err) => console.error('[Navigate] router.navigate rejected:', err)
      );
    };

    // 1) Success via createEntitySuccess
    this.facade.createSuccess$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (entity) => {
        console.log('[Create Success] entity:', entity);
        this.isSubmitting = false;
        navigateToList();
      },
      error: (e) => {
        console.error('[Create Success] stream error:', e);
        this.isSubmitting = false;
      },
    });

    // 2) Generic operation success (create/update)
    this.facade.operationSuccess$
      .pipe(
        takeUntil(this.destroy$),
        tap((s) => console.log('[Op Success] lastOperation:', s)),
        filter(
          (s) =>
            !!s &&
            s.entity === 'Mandate' &&
            (s.operation === 'create' || s.operation === 'update')
        )
      )
      .subscribe(() => {
        console.log('[Op Success] Matched Mandate create/update. Navigating…');
        this.isSubmitting = false;
        navigateToList();
      });

    // 3) Also log any error$ from mandates slice so we see failures
    this.facade.error$.pipe(takeUntil(this.destroy$)).subscribe((err) => {
      if (err) {
        console.error('[Mandates Error] from store slice:', err);
        this.isSubmitting = false;
      }
    });
    this.actions$
      .pipe(
        takeUntil(this.destroy$),
        ofType(MandateActions.createEntitySuccess as any)
      )
      .subscribe(() => {
        this.isSubmitting = false;
        this.navigateToList();
      });

    this.actions$
      .pipe(
        takeUntil(this.destroy$),
        ofType(MandateActions.createEntityFailure as any)
      )
      .subscribe((err) => {
        console.error('[Create] failed:', err);
        this.isSubmitting = false;
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Progress bar width in %, discrete per step.
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

  //Return the current step's form group to validate navigation.
  get currentStepForm(): FormGroup | null {
    switch (this.currentStep) {
      case 1:
        return this.addAgreementShowMainInformationForm;
      case 2:
        return this.addMandateShowAssetTypeForm;
      case 3:
        return this.addMandateShowFeeForm;
      case 4:
        return null;
      default:
        return null;
    }
  }

  //Block Next unless current step is valid (or view-only).
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

  private patchMandate(m: Mandate) {
    this.leasingMandateId = (m as any)?.id ?? this.leasingMandateId;

    // ===== BASIC (already in your code) =====
    this.addAgreementShowMainInformationForm.patchValue({
      id: m.id,
      parentMandateId: m.parentMandateId,
      clientId: this.clientId ?? m.clientId ?? (m as any)?.clientView?.clientId,
      leasingTypeId: (m as any)?.leasingTypeId,
      insuredById: (m as any)?.insuredById,
      date: m.date ? new Date(m.date) : null,
      validityDay: (m as any)?.validityDay ?? null,
      notes: (m as any)?.notes,
    });

    const manual = !!m.isManuaExchangeRate;
    const manualCtrl = this.leasingFinancialCurrencyForm.get(
      'manualSetExchangeRate'
    );
    if (manual) manualCtrl?.enable({ emitEvent: false });
    else manualCtrl?.disable({ emitEvent: false });
    // ===== ARRAYS (already in your code) =====
    const resetArray = (
      fa: FormArray,
      items: any[],
      factory: () => FormGroup
    ) => {
      fa.clear();
      (items || []).forEach((item) => {
        const fg = factory();
        fg.patchValue(item, { emitEvent: false });
        fa.push(fg);
      });
    };
    resetArray(
      this.mandateAssetTypes,
      (m as any)?.mandateAssetTypes || [],
      () => this.createAssetTypeGroup()
    );
    resetArray(this.mandateFees, (m as any)?.mandateFees || [], () =>
      this.createFeeGroup()
    );

    // ===== STEP 4: Patch from mandatePaymentSettings and mandate/leasingMandate =====
    const settings = Array.isArray((m as any)?.mandatePaymentSettings)
      ? (m as any).mandatePaymentSettings[0]
      : null;

    const leasingMandate =
      (m as any)?.leasingMandate ?? settings?.mandate?.leasingMandate ?? null; // tolerate shapes
    const mandateNode =
      (m as any)?.mandate ?? leasingMandate?.mandate ?? (m as any);

    if (settings) {
      // currency + payments selection (Step 4 → Currency group)
      const currencyId = settings?.currencyExchangeRate?.currencyId ?? null;

      this.leasingFinancialCurrencyForm.patchValue(
        {
          currencyId,
          currencyExchangeRateId: settings?.currencyExchangeRateId ?? null,
          isManuaExchangeRate: !!settings?.isManuaExchangeRate,
          manualSetExchangeRate: settings?.manualSetExchangeRate ?? null,
          reservePaymentAmount: m.reservePaymentAmount ?? null,
          reservePaymentCount: m.reservePaymentCount ?? null,
          paymentMethodId: settings?.paymentMethodId ?? null,
          paymentMonthDayID: settings?.paymentMonthDayId ?? null,
          provisionPercent: m.provisionPercent ?? null,
          provisionAmount: m.provisionAmount ?? null,
          // from mandate or leasingMandate nodes:
          interestRateBenchmarkId: mandateNode?.interestRateBenchmarkId ?? null,
          paymentTimingTermId: m.paymentTimingTermId ?? null,
          rentStructureTypeId: m.rentStructureTypeId ?? null,
          indicativeRentals: m.indicativeRentals ?? null,
          referenceRent: m.rent ?? null,
          rvPercent: m.rvPercent ?? null,
          rvAmount: m.rvAmount ?? null,
        },
        { emitEvent: false }
      );

      // enable/disable manual rate textbox to match the flag
      const manualCtrl = this.leasingFinancialCurrencyForm.get(
        'manualSetExchangeRate'
      );
      if (settings?.isManuaExchangeRate)
        manualCtrl?.enable({ emitEvent: false });
      else {
        manualCtrl?.disable({ emitEvent: false });
        // keep its value if you want it shown disabled; or reset(null) if you prefer cleared
        // manualCtrl?.reset(null, { emitEvent: false });
      }

      // rates group (Step 4 → Rates group)
      const pid = settings?.paymentPeriodId ?? null;
      const monthCount = pid
        ? this.paymentPeriodsCache.find((p) => p.id === pid)?.monthCount ?? null
        : null;

      console.log(
        '[Edit] paymentPeriodId =',
        pid,
        '→ monthCount =',
        monthCount
      ); // 👈 add this

      this.leasingFinancialRateForm.patchValue(
        {
          paymentPeriodId: pid,
          paymentPeriodMonthCount: monthCount,
          gracePeriodInDays:
            mandateNode?.gracePeriodInDays ??
            (m as any)?.gracePeriodInDays ??
            null,
          interestRate: m.interestRate ?? null,
          insuranceRate: m.insuranceRate ?? null,
          tenor: m.tenor ?? null,
          fixedInterestRate: m.fixedInterestRate ?? null,
        },
        { emitEvent: false }
      );

      // basic finance (Step 4 → Basic group): only patch if your API returns them
      this.leasingFinancialBasicForm.patchValue(
        {
          assetCost: (m as any)?.assetCost ?? null,
          downPayment: (m as any)?.downPayment ?? null,
          percentOfFinance: (m as any)?.percentOfFinance ?? null,
          nfa: (m as any)?.nfa ?? null,
          years: (m as any)?.years ?? null,
          startDate: (m as any)?.startDate
            ? new Date((m as any)?.startDate)
            : null,
        },
        { emitEvent: false }
      );

      // recompute any derived field (periodInterestRate) after patching
      this.calculatePeriodInterestRate();

      this.patchedStep4FromMandate = true;
    }

    // ===== TABLE rows from API payments =====
    // Your GET includes a flat `payments` array – use it if present.
    const apiPayments = (m as any)?.payments;
    if (Array.isArray(apiPayments) && apiPayments.length) {
      const rows = apiPayments.map((p: any) => ({
        paymentNumber: p.paymentNumber,
        dueDate: p.dueDate ? new Date(p.dueDate) : null,
        balanceBefore: p.balanceBefore,
        balanceAfter: p.balanceAfter,
        interest: p.interest,
        installment: p.installment,
        insuranceIncome: p.insuranceIncome,
        referenceRent: p.referenceRent,
      }));

      this.tableDataInside = rows;
      this.originalFinancialForms = [...rows];
      this.filteredFinancialForms = [...rows];
    }

    // ===== Workflow bits (unchanged) =====
    this.workFlowActionList = (m.allowedMandateWorkFlowActions ?? []).map(
      (a) => ({
        id: a.id,
        label: a.name,
        icon: 'pi pi-times',
      })
    );
    this.selectedAction = (m as any)?.mandateCurrentWorkFlowAction?.name ?? '';
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
    this.facade.workFlowActionSuccess$.pipe(take(1)).subscribe({
      next: () => {
        console.log('Workflow action submitted successfully.');
        this.refreshAllowedActions();
      },
      error: (err) => console.error('Workflow action failed:', err),
    });
  }

  buildAgreementShowMainForm(): void {
    this.addAgreementShowMainInformationForm = this.fb.group(
      {
        id: [null],
        parentMandateId: [null],
        clientId: [null, Validators.required],
        leasingTypeId: [null, Validators.required],
        insuredById: [null, Validators.required],
        date: [null, Validators.required],
        endDate: [null, Validators.required],
        branchId: [null, Validators.required],
        portfolioId: [null, Validators.required],
        businessSourceId: [null, Validators.required],
        deliveryNumber: [null, Validators.required],
        notes: [null],
      },
      { validators: [this.endAfterStartValidator('date', 'endDate')] }
    ); // keep endDate in sync when date changes (optional)
    this.addAgreementShowMainInformationForm
      .get('date')
      ?.valueChanges.subscribe(() => {
        this.addAgreementShowMainInformationForm
          .get('endDate')
          ?.updateValueAndValidity({ onlySelf: true });
      });
  }
  endAfterStartValidator(startKey: string, endKey: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const g = group as FormGroup;
      const start = g.get(startKey)?.value as Date | null;
      const end = g.get(endKey)?.value as Date | null;

      if (!start || !end) return null; // "required" will handle empties

      // compare as date-only (ignore time)
      const startOnly = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate()
      );
      const endOnly = new Date(
        end.getFullYear(),
        end.getMonth(),
        end.getDate()
      );

      const isValid = endOnly.getTime() > startOnly.getTime();
      // attach the error to endDate control for easier UI display
      const endCtrl = g.get(endKey)!;
      if (!isValid) {
        endCtrl.setErrors({ ...(endCtrl.errors || {}), endBeforeStart: true });
      } else {
        if (endCtrl.hasError('endBeforeStart')) {
          const { endBeforeStart, ...rest } = endCtrl.errors || {};
          endCtrl.setErrors(Object.keys(rest).length ? rest : null);
        }
      }
      return null; // return null so form-level stays valid except for control error
    };
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

  // --- tiny helpers ---
  private toDate(v: any): Date | null {
    if (!v) return null;
    return v instanceof Date ? v : new Date(v);
  }
  private toInt(v: any): number | null {
    if (v === '' || v == null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  private toDateOnlyString(v: Date | string | null): string | null {
    if (!v) return null;
    const d = v instanceof Date ? v : new Date(v);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
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

    log('Step1 basic', this.addAgreementShowMainInformationForm);
    log('Step2 assets', this.addMandateShowAssetTypeForm);
    log('Step3 fees', this.addMandateShowFeeForm);
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

  recalculateAndValidateFinancialFields(): void {
    const assetCost =
      +this.leasingFinancialBasicForm.get('assetCost')?.value || 0;
    const percentOfFinance =
      +this.leasingFinancialBasicForm.get('percentOfFinance')?.value || 0;
    const downPayment = assetCost * (1 - percentOfFinance / 100);
    const nfa = assetCost - downPayment;
    const rvPercent =
      +this.leasingFinancialCurrencyForm.get('rvPercent')?.value || 0;
    const rvAmount = Math.round((rvPercent / 100) * nfa);
    const provisionPercent =
      +this.leasingFinancialCurrencyForm.get('provisionPercent')?.value || 0;
    const provisionAmount = (provisionPercent / 100) * (nfa - rvAmount);

    // Update form controls with recalculated values
    this.leasingFinancialBasicForm
      .get('downPayment')
      ?.setValue(downPayment, { emitEvent: false });
    this.leasingFinancialBasicForm
      .get('nfa')
      ?.setValue(nfa, { emitEvent: false });
    this.leasingFinancialCurrencyForm
      .get('rvAmount')
      ?.setValue(rvAmount, { emitEvent: false });
    this.leasingFinancialCurrencyForm
      .get('provisionAmount')
      ?.setValue(provisionAmount, { emitEvent: false });

    // Optionally, add validation or error handling here
  }
  private updateNfaAndCalculations() {
    const assetCost =
      this.leasingFinancialBasicForm.get('assetCost')!.value || 0;
    const downPayment =
      this.leasingFinancialBasicForm.get('downPayment')!.value || 0;
    const nfa = assetCost - downPayment;

    this.leasingFinancialBasicForm
      .get('nfa')!
      .setValue(nfa, { emitEvent: false });

    if (assetCost > 0) {
      const percentOfFinance = ((assetCost - downPayment) / assetCost) * 100;
      this.leasingFinancialBasicForm
        .get('percentOfFinance')!
        .setValue(percentOfFinance, { emitEvent: false });
    }
  }
  private calculateReservePaymentCount() {
    const referenceRent =
      this.leasingFinancialCurrencyForm.get('referenceRent')?.value || 0;
    const assetCost =
      this.leasingFinancialBasicForm.get('assetCost')?.value || 0;
    const insuranceRate =
      this.leasingFinancialRateForm.get('insuranceRate')?.value || 0;
    const reservePaymentAmount =
      this.leasingFinancialCurrencyForm.get('reservePaymentAmount')?.value || 0;
    const paymentPeriodId =
      this.leasingFinancialRateForm.get('paymentPeriodId')?.value || 0;
    let monthCount = 0;
    this.paymentPeriods$.pipe(take(1)).subscribe((periods) => {
      const match = periods.find((p) => p.id === paymentPeriodId);
      monthCount = match?.monthCount || 0;

      console.log('Month Count:', monthCount);
      // Use monthCount here
    });
    console.log('Calculating ReservePaymentCount with values:', {
      referenceRent,
      assetCost,
      insuranceRate,
      reservePaymentAmount,
      monthCount,
    });

    if (monthCount === 0) {
      console.log('MonthCount is 0. Setting ReservePaymentCount to 0.');
      this.leasingFinancialCurrencyForm
        .get('reservePaymentCount')
        ?.setValue(0, { emitEvent: false });
      return;
    }

    const othersIncome = (assetCost * insuranceRate * monthCount) / 12;
    console.log('Calculated OthersIncome:', othersIncome);

    if (referenceRent + othersIncome === 0) {
      console.log(
        'Rent + OthersIncome is 0. Unable to calculate ReservePaymentCount.'
      );
      this.leasingFinancialCurrencyForm
        .get('reservePaymentCount')
        ?.setValue(0, { emitEvent: false });
      return;
    }

    const reservePaymentCount = Math.floor(
      (reservePaymentAmount * monthCount) / (referenceRent + othersIncome)
    );
    console.log(
      'Calculated ReservePaymentCount (rounded):',
      reservePaymentCount
    );

    this.leasingFinancialCurrencyForm
      .get('reservePaymentCount')
      ?.setValue(reservePaymentCount, { emitEvent: false });
  }

  private calculateReservePaymentAmount() {
    const referenceRent =
      this.leasingFinancialCurrencyForm.get('referenceRent')?.value || 0;
    const assetCost =
      this.leasingFinancialBasicForm.get('assetCost')?.value || 0;
    const insuranceRate =
      this.leasingFinancialRateForm.get('insuranceRate')?.value || 0;
    const reservePaymentCount =
      this.leasingFinancialCurrencyForm.get('reservePaymentCount')?.value || 0;
    const paymentPeriodId =
      this.leasingFinancialRateForm.get('paymentPeriodId')?.value || 0;
    let monthCount = 0;
    this.paymentPeriods$.pipe(take(1)).subscribe((periods) => {
      const match = periods.find((p) => p.id === paymentPeriodId);
      monthCount = match?.monthCount || 0;

      console.log('Month Count:', monthCount);
      // Use monthCount here
    });
    console.log('Calculating ReservePaymentAmount with values:', {
      referenceRent,
      assetCost,
      insuranceRate,
      reservePaymentCount,
      monthCount,
    });

    if (monthCount === 0) {
      console.log('MonthCount is 0. Setting ReservePaymentAmount to 0.');
      this.leasingFinancialCurrencyForm
        .get('reservePaymentAmount')
        ?.setValue(0, { emitEvent: false });
      return;
    }

    const othersIncome = (assetCost * insuranceRate * monthCount) / 12;
    console.log('Calculated OthersIncome:', othersIncome);

    if (referenceRent + othersIncome === 0) {
      console.log(
        'Rent + OthersIncome is 0. Unable to calculate ReservePaymentAmount.'
      );
      this.leasingFinancialCurrencyForm
        .get('reservePaymentAmount')
        ?.setValue(0, { emitEvent: false });
      return;
    }

    const reservePaymentAmount =
      ((referenceRent + othersIncome) * reservePaymentCount) / monthCount;
    console.log('Calculated ReservePaymentAmount:', reservePaymentAmount);
    this.leasingFinancialCurrencyForm
      .get('reservePaymentAmount')
      ?.setValue(reservePaymentAmount, { emitEvent: false });
  }
  private setupFormListeners() {
    // Basic Finance Information Listeners
    this.leasingFinancialBasicForm
      .get('assetCost')
      ?.valueChanges.subscribe(() => {
        console.log('AssetCost changed.');
        this.recalculateAndValidateFinancialFields();
        this.updateNfaAndCalculations();
        this.calculateReservePaymentAmount();
      });

    this.leasingFinancialBasicForm
      .get('downPayment')
      ?.valueChanges.subscribe(() => {
        console.log('DownPayment changed.');
        this.updateNfaAndCalculations();
        this.calculateReservePaymentAmount();
      });

    // RV Listeners
    this.leasingFinancialCurrencyForm
      .get('rvAmount')
      ?.valueChanges.subscribe(() => {
        console.log('RVAmount changed.');
        this.updateRvPercent();
        this.updateProvisionPercent();
        this.updateProvisionAmount();
      });

    this.leasingFinancialCurrencyForm
      .get('rvPercent')
      ?.valueChanges.subscribe(() => {
        console.log('RVPercent changed.');
        this.recalculateAndValidateFinancialFields();
        this.updateRvAmount();
        this.updateProvisionPercent();
        this.updateProvisionAmount();
      });

    // Provision Listeners
    this.leasingFinancialCurrencyForm
      .get('provisionAmount')
      ?.valueChanges.subscribe(() => {
        console.log('ProvisionAmount changed.');
        this.updateProvisionPercent();
      });

    this.leasingFinancialCurrencyForm
      .get('provisionPercent')
      ?.valueChanges.subscribe(() => {
        console.log('ProvisionPercent changed.');
        this.recalculateAndValidateFinancialFields();
        this.updateProvisionAmount();
      });

    // Currency and Manual Exchange Rate Listeners
    this.leasingFinancialCurrencyForm
      .get('isManuaExchangeRate')
      ?.valueChanges.subscribe((isChecked: boolean) => {
        const ctrl = this.leasingFinancialCurrencyForm.get(
          'manualSetExchangeRate'
        );
        if (!ctrl) return;
        if (isChecked) {
          ctrl.enable({ emitEvent: false });
        } else {
          ctrl.reset(null, { emitEvent: false });
          ctrl.disable({ emitEvent: false });
        }
      });

    // Rates and Periods Listeners
    this.leasingFinancialCurrencyForm
      .get('referenceRent')
      ?.valueChanges.subscribe(() => {
        console.log('Rent changed.');
        this.calculateReservePaymentAmount();
      });

    this.leasingFinancialRateForm
      .get('insuranceRate')
      ?.valueChanges.subscribe(() => {
        this.calculateReservePaymentAmount();
      });
    this.leasingFinancialRateForm
      .get('interestRate')
      ?.valueChanges.subscribe(() => {
        console.log('interestRate changed.');
        this.calculatePeriodInterestRate();
      });
    this.leasingFinancialRateForm.get('tenor')?.valueChanges.subscribe(() => {
      console.log('tenor changed.');
      this.calculateReservePaymentAmount();
    });

    this.leasingFinancialCurrencyForm
      .get('reservePaymentAmount')
      ?.valueChanges.subscribe(() => {
        console.log('ReservePaymentAmount changed.');
        this.calculateReservePaymentCount();
      });

    this.leasingFinancialCurrencyForm
      .get('reservePaymentCount')
      ?.valueChanges.subscribe(() => {
        console.log('ReservePaymentCount changed.');
        this.calculateReservePaymentAmount();
      });

    this.leasingFinancialRateForm
      .get('paymentPeriodId')
      ?.valueChanges.subscribe(() => {
        console.log('paymentPeriodId');
        this.calculateReservePaymentAmount();
        this.calculateReservePaymentCount();
      });

    this.leasingFinancialBasicForm
      .get('percentOfFinance')
      ?.valueChanges.subscribe(() => {
        this.recalculateAndValidateFinancialFields();
        this.updateNfaAndCalculations();
        this.calculateReservePaymentAmount();
      });

    // NFA Dependencies
    this.leasingFinancialBasicForm.get('nfa')?.valueChanges.subscribe(() => {
      console.log('NFA changed.');
      this.updateProvisionPercent();
      this.updateProvisionAmount();
    });
  }

  private getMonthCountFromRates(): number {
    const pid =
      +this.leasingFinancialRateForm.get('paymentPeriodId')?.value || 0;
    if (!pid) return 0;
    return this.paymentPeriodsCache.find((p) => p.id === pid)?.monthCount ?? 0;
  }

  // --- small helpers ---
  private num(v: any, def = 0): number {
    const n = +v;
    return Number.isFinite(n) ? n : def;
  }

  /** Build the single payload for `facade.create(...)` */
  private buildCreatePayload(): any {
    const basic = this.addAgreementShowMainInformationForm.getRawValue();
    const assets = this.addMandateShowAssetTypeForm.getRawValue();
    const fees = this.addMandateShowFeeForm.getRawValue();
    const finBasic = this.leasingFinancialBasicForm.getRawValue();
    const finRate = this.leasingFinancialRateForm.getRawValue();
    const finCurr = this.leasingFinancialCurrencyForm.getRawValue();
    const resolvedClientId = this.resolveClientId(basic);
    if (resolvedClientId == null) {
      throw new Error('Client is required'); // or show a toast and return
    }

    const idOf = (v: any) => (v && typeof v === 'object' ? v.id : v);
    const to3 = (n: any) => +parseFloat(n ?? 0).toFixed(3);

    const payload: any = {
      description: basic.description ?? 'string',
      date: basic.date,
      clientId: resolvedClientId,
      parentMandateId: basic.parentMandateId,
      leasingTypeId: idOf(basic.leasingTypeId),
      validityDay: +basic.validityDay,
      expireDate: basic.expireDate,
      notes: basic.notes,

      indicativeRentals: finCurr.indicativeRentals,
      insuredById: idOf(basic.insuredById),

      assetCost: finBasic.assetCost,
      downPayment: finBasic.downPayment,
      percentOfFinance: finBasic.percentOfFinance,
      nfa: finBasic.nfa,

      interestRate: finRate.interestRate,
      insuranceRate: finRate.insuranceRate,
      tenor: finRate.tenor,
      paymentPeriodId: idOf(finRate.paymentPeriodId),

      paymentMonthDayId: idOf(finCurr.paymentMonthDayID),
      paymentMethodId: idOf(finCurr.paymentMethodId),
      interestRateBenchmarkId: idOf(finCurr.interestRateBenchmarkId),

      rvAmount: finCurr.rvAmount,
      rvPercent: to3(finCurr.rvPercent),

      provisionAmount: finCurr.provisionAmount,
      provisionPercent: to3(finCurr.provisionPercent),

      reservePaymentAmount: to3(finCurr.reservePaymentAmount),
      reservePaymentCount: finCurr.reservePaymentCount,

      currencyId: idOf(finCurr.currencyId),
      currencyExchangeRateId: idOf(finCurr.currencyExchangeRateId),
      manualSetExchangeRate: finCurr.manualSetExchangeRate ?? 0,
      isManuaExchangeRate: !!finCurr.isManuaExchangeRate,

      gracePeriodInDays: finRate.gracePeriodInDays,
      rentStructureTypeId: idOf(finCurr.rentStructureTypeId),
      paymentTimingTermId: idOf(finCurr.paymentTimingTermId),

      startDate: finBasic.startDate,
      years: finBasic.years,
      rent: finCurr.referenceRent,

      mandateAssetTypes: (assets.mandateAssetTypes ?? []).map((a: any) => ({
        // include id if editing existing row
        id: a.id ?? undefined,
        assetTypeId: idOf(a.assetTypeId),
        assetsTypeDescription: a.assetsTypeDescription,
      })),
      mandateFees: (fees.mandateFees ?? []).map((f: any) => ({
        id: f.id ?? undefined,
        feeTypeId: idOf(f.feeTypeId),
        actualAmount: f.actualAmount,
        actualPercentage: f.actualPercentage,
      })),
    };

    // === IMPORTANT: add IDs for update ===
    const leasingMandateIdFromRoute = Number(
      this.route.snapshot.paramMap.get('leasingId')
    );
    const leasingMandateId = Number.isFinite(leasingMandateIdFromRoute)
      ? leasingMandateIdFromRoute
      : this.leasingMandateId;

    if (this.editMode && Number.isFinite(leasingMandateId)) {
      payload.id = leasingMandateId; // leasing mandate id in the body
    }

    return payload;
  }
  onSubmit() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    console.log('[Submit] Start. editMode=', this.editMode);

    // Validate all forms
    this.parentForm.markAllAsTouched();
    this.parentForm.updateValueAndValidity();
    const financialInvalid =
      this.leasingFinancialBasicForm.invalid ||
      this.leasingFinancialCurrencyForm.invalid ||
      this.leasingFinancialRateForm.invalid;

    if (this.viewOnly || this.parentForm.invalid || financialInvalid) {
      console.warn('[Submit] Blocked.', {
        viewOnly: this.viewOnly,
        parentInvalid: this.parentForm.invalid,
        financialInvalid,
      });
      this.isSubmitting = false;
      return;
    }

    // One-shot listeners for this submit
    const success$ = merge(
      this.actions$.pipe(ofType(MandateActions.createEntitySuccess as any)),
      this.actions$.pipe(ofType(MandateActions.updateEntitySuccess as any)),
      // fallback in case your slice emits a generic op success
      this.facade.operationSuccess$.pipe(
        filter(
          (s: any) =>
            !!s &&
            s.entity === 'Mandate' &&
            (s.operation === 'create' || s.operation === 'update')
        )
      )
    ).pipe(take(1));

    const failure$ = merge(
      this.actions$.pipe(ofType(MandateActions.createEntityFailure as any)),
      this.actions$.pipe(ofType(MandateActions.updateEntityFailure as any)),
      this.facade.error$.pipe(filter(Boolean))
    ).pipe(take(1));

    const cleanupAndGoHome = () => {
      this.isSubmitting = false;
      // let the guard through & tidy forms
      this.allowLeaveAfterSave = true;
      this.markAllPristine();
      this.facade.loadAll();
      this.navigateToList();
    };

    // Subscribe BEFORE dispatch so we don't miss a fast response
    const successSub = success$.subscribe({
      next: (evt) => {
        console.log('[Submit] Success event:', evt);
        cleanupAndGoHome();
      },
      error: (e) => {
        console.error('[Submit] success$ stream error:', e);
        this.isSubmitting = false;
      },
    });

    const failureSub = failure$.subscribe({
      next: (err) => {
        console.error('[Submit] Failure event:', err);
        this.isSubmitting = false;
        // optional: show a toast here
      },
      error: (e) => {
        console.error('[Submit] failure$ stream error:', e);
        this.isSubmitting = false;
      },
    });

    try {
      const payload = this.buildCreatePayload();
      console.log('[Submit] Payload →', payload);
      if (this.editMode) {
        const leaseId = +this.route.snapshot.paramMap.get('leasingId')!;
        this.facade.update(leaseId, payload);
      } else {
        this.facade.create(payload);
      }
    } catch (err) {
      console.error('[Submit] build payload failed:', err);
      this.isSubmitting = false;
      // prevent leaks if we threw before any action could fire
      successSub.unsubscribe();
      failureSub.unsubscribe();
    }
  }

  private buildListCommands(): (string | number)[] {
    const base = '/crm/leasing-mandates/view-mandates';
    const id = this.clientId; // already parsed with '+', may be NaN

    // If clientId is missing/NaN → navigate to the generic list
    if (typeof id !== 'number' || !Number.isFinite(id)) {
      return [base];
    }

    // Otherwise route to the client-scoped list
    return [base, id];
  }
  private navigateToList = () => {
    const cmds = this.buildListCommands();
    const hasClient = cmds.length === 2; // ['/..../view-mandates', clientId]

    console.log('[Navigate] commands=', cmds);

    this.allowLeaveAfterSave = true;
    this.markAllPristine();

    // 🔑 Load only what the destination list needs
    if (
      hasClient &&
      typeof this.clientId === 'number' &&
      Number.isFinite(this.clientId)
    ) {
      this.facade.loadByClientId(this.clientId);
    } else {
      // If your list page loads itself on init, you can remove this line entirely.
      this.facade.loadAll();
    }

    this.router.navigate(cmds).then(
      (ok) => console.log('[Navigate] ok=', ok),
      (err) => console.error('[Navigate] failed:', err)
    );
  };

  // Leasing Financials form
  private initializeLeasingFinancialBasicForm() {
    this.leasingFinancialBasicForm = this.fb.group({
      assetCost: [null, Validators.required],
      downPayment: [null, Validators.required],
      percentOfFinance: [null, Validators.required],
      nfa: [null, Validators.required],
      years: [null, Validators.required],
      startDate: [null, Validators.required],
    });
  }
  private initializeLeasingFinancialRatesForm() {
    this.leasingFinancialRateForm = this.fb.group({
      interestRate: [null, Validators.required],
      insuranceRate: [null, Validators.required],
      tenor: [null, Validators.required],
      paymentPeriodId: [null, Validators.required],
      paymentPeriodMonthCount: [null],
      gracePeriodInDays: [null, Validators.required],
      periodInterestRate: [{ value: null, disabled: true }],
      fixedInterestRate: [null, Validators.required],
    });
  }
  private initializeLeasingFinancialCurrencyForm() {
    this.leasingFinancialCurrencyForm = this.fb.group({
      currencyId: [null, Validators.required],
      currencyExchangeRateId: [null, Validators.required],
      isManuaExchangeRate: [false],
      manualSetExchangeRate: [{ value: null, disabled: true }],
      indicativeRentals: [null, Validators.required],
      referenceRent: [null, Validators.required],
      rvPercent: [null, Validators.required],
      rvAmount: [null, Validators.required],
      reservePaymentCount: [null, Validators.required],
      reservePaymentAmount: [null, Validators.required],
      provisionPercent: [null, Validators.required],
      provisionAmount: [null, Validators.required],
      interestRateBenchmarkId: [null, Validators.required],
      paymentTimingTermId: [null, Validators.required],
      rentStructureTypeId: [null, Validators.required],
      paymentMethodId: [null, Validators.required],
      paymentMonthDayID: [null, Validators.required],
    });
  }

  /** === RV & Provision (FINANCIAL CURRENCY FORM + BASIC.NFA) === */
  private updateRvPercent() {
    const rvAmount = this.num(
      this.leasingFinancialCurrencyForm.get('rvAmount')?.value
    );
    const nfa = this.num(this.leasingFinancialBasicForm.get('nfa')?.value);
    const rvPct = nfa > 0 ? (rvAmount / nfa) * 100 : 0;
    this.leasingFinancialCurrencyForm
      .get('rvPercent')
      ?.setValue(rvPct, { emitEvent: false });
  }

  private updateProvisionPercent() {
    const provisionAmount = this.num(
      this.leasingFinancialCurrencyForm.get('provisionAmount')?.value
    );
    const nfa = this.num(this.leasingFinancialBasicForm.get('nfa')?.value);
    const rvAmount = this.num(
      this.leasingFinancialCurrencyForm.get('rvAmount')?.value
    );
    const denom = nfa - rvAmount;
    const pct = denom > 0 ? (provisionAmount / denom) * 100 : 0;
    this.leasingFinancialCurrencyForm
      .get('provisionPercent')
      ?.setValue(pct, { emitEvent: false });
  }

  private updateProvisionAmount() {
    const provisionPercent = this.num(
      this.leasingFinancialCurrencyForm.get('provisionPercent')?.value
    );
    const nfa = this.num(this.leasingFinancialBasicForm.get('nfa')?.value);
    const rvAmount = this.num(
      this.leasingFinancialCurrencyForm.get('rvAmount')?.value
    );
    const denom = nfa - rvAmount;
    const amt = denom > 0 ? (provisionPercent / 100) * denom : 0;
    this.leasingFinancialCurrencyForm
      .get('provisionAmount')
      ?.setValue(amt, { emitEvent: false });
  }

  private updateRvAmount() {
    const rvPercent = this.num(
      this.leasingFinancialCurrencyForm.get('rvPercent')?.value
    );
    const nfa = this.num(this.leasingFinancialBasicForm.get('nfa')?.value);
    const rvAmount = Math.round(nfa * (rvPercent / 100));
    this.leasingFinancialCurrencyForm
      .get('rvAmount')
      ?.setValue(rvAmount, { emitEvent: false });
  }

  /** === Period interest rate (FINANCIAL RATE FORM) === */
  private calculatePeriodInterestRate() {
    const annualRate = this.num(
      this.leasingFinancialRateForm.get('interestRate')?.value
    );
    const monthCount = this.getMonthCountFromRates();
    const pir = ((annualRate / 100) * monthCount * 365) / 360 / 12;
    this.leasingFinancialRateForm
      .get('periodInterestRate')
      ?.setValue(pir, { emitEvent: false });
    return pir;
  }

  onCheckboxChange(event: { originalEvent: Event; checked: boolean }) {
    const manualSetExchangeRateControl = this.leasingFinancialCurrencyForm.get(
      'manualSetExchangeRate'
    );
    if (!manualSetExchangeRateControl) return;

    if (event.checked) {
      manualSetExchangeRateControl.enable({ emitEvent: false });
    } else {
      manualSetExchangeRateControl.setValue(null, { emitEvent: false });
      manualSetExchangeRateControl.disable({ emitEvent: false });
    }
  }
  // onCheckboxChange(event: { originalEvent: Event; checked: boolean }) {
  //   const manualSetExchangeRateControl =
  //     this.leasingFinancialCurrencyForm.get('manualSetExchangeRate')!;

  //   // Enable the control whenever the checkbox is toggled on
  //   if (event?.checked) {
  //     console.log(
  //       'Manual checkbox check detected. Enabling manualSetExchangeRate control.'
  //     );
  //     manualSetExchangeRateControl.enable({ emitEvent: false });
  //   } else {
  //     console.log(
  //       'Manual checkbox uncheck detected. Resetting and disabling manualSetExchangeRate control.'
  //     );
  //     manualSetExchangeRateControl.reset(0, { emitEvent: false });
  //     manualSetExchangeRateControl.disable({ emitEvent: false });
  //   }
  // }
  onPaymentPeriodSelected(event: PaymentPeriod) {
    console.log('PaymentPeriod selected:', event);
    const monthCount = event?.monthCount || 0;
    console.log('Extracted MonthCount:', monthCount);
    this.leasingFinancialRateForm
      .get('paymentPeriodMonthCount')
      ?.setValue(monthCount);
    console.log('Updated form control paymentPeriodMonthCount:', monthCount);

    {
    }
  }
  onGracePeriodUnitSelected(unit: any) {
    console.log('Full Grace Period Unit object:', unit);
    // If you only want the ID:
    this.selectedGracePeriodUnit = unit.id;
    console.log('Grace Period Unit ID:', this.selectedGracePeriodUnit);
    // …do whatever calculations or form updates you need…
  }
  onCurrencySelected(event: any) {
    console.log('Full selectedCurrency object:', event);
    this.selectedCurrency = event.id;
    console.log('selectedCurrency ID:', this.selectedCurrency);
    // this.leasingFinancialCurrencyForm
    //   .get('currencyId')
    //   ?.setValue(this.selectedCurrency);
  }
  onCurrencyExchangeRateSelected(event: {
    originalEvent: Event;
    value: number;
  }) {
    console.log('Full selectedCurrencyExchange event:', event);

    // Grab the numeric ID from event.value
    const id = event;
    console.log('Exchange-Rate ID from event.value →', id);

    // Update your reactive form control
    this.leasingFinancialCurrencyForm
      .get('currencyExchangeRateId')!
      .setValue(id, { emitEvent: true });
  }

  onInterestRateBenchmarkSelected(
    interestRateBenchmark: InterestRateBenchMark
  ) {
    console.log('Interest Rate Benchmark selected:', interestRateBenchmark);
    // This time interestRateBenchmark.id is a real number
    this.leasingFinancialCurrencyForm
      .get('interestRateBenchmarkId')
      ?.setValue(interestRateBenchmark.id);
  }
  onPaymentTimingTermSelected(paymentTimingTerm: PaymentTimingTerm) {
    console.log('Payment Timing Term selected:', paymentTimingTerm);
    // This time interestRateBenchmark.id is a real number
    this.leasingFinancialCurrencyForm
      .get('paymentTimingTermId')
      ?.setValue(paymentTimingTerm.id);
  }
  onRentStructureSelected(rentStructure: RentStructureType) {
    console.log('Rent Structure selected:', rentStructure);
    this.leasingFinancialCurrencyForm
      .get('rentStructureTypeId')
      ?.setValue(rentStructure.id); // Update form control
  }
  onPaymentMethodSelected(paymentMethod: PaymentMethod) {
    console.log('Payment Method selected:', paymentMethod);
    this.leasingFinancialCurrencyForm
      .get('paymentMethodId')
      ?.setValue(paymentMethod.id); // Update form control
  }
  onPaymentMonthDaySelected(paymentMonthDay: PaymentMonthDay) {
    console.log('PaymentMonthDay selected:', paymentMonthDay);
    this.leasingFinancialCurrencyForm
      .get('paymentMonthDayID')
      ?.setValue(paymentMonthDay.id); // Update form control
  }
  /** Return true only if all three FormGroups are valid */

  // isAllValid(): boolean {
  //   return (
  //     this.leasingFinancialBasicForm.valid &&
  //     this.leasingFinancialRateForm.valid &&
  //     this.leasingFinancialCurrencyForm.valid
  //   );
  // }
  isAllValid(): boolean {
    return (
      this.leasingFinancialBasicForm.valid &&
      this.leasingFinancialRateForm.valid &&
      this.leasingFinancialCurrencyForm.valid
    );
  }
  /** “Calculate” should run whatever calc logic you need on all three forms */
  onCalculateAll(): void {
    if (
      this.leasingFinancialBasicForm.invalid ||
      this.leasingFinancialCurrencyForm.invalid ||
      this.leasingFinancialRateForm.invalid
    ) {
      [
        this.leasingFinancialBasicForm,
        this.leasingFinancialCurrencyForm,
        this.leasingFinancialRateForm,
      ].forEach((form) =>
        Object.keys(form.controls).forEach((c) =>
          form.get(c)?.markAsTouched({ onlySelf: true })
        )
      );
      console.log('Form is invalid');
      return;
    }

    const b = this.leasingFinancialBasicForm.getRawValue();
    const r = this.leasingFinancialRateForm.getRawValue();
    const c = this.leasingFinancialCurrencyForm.getRawValue();

    const to3 = (x: any) => +parseFloat(x ?? 0).toFixed(3);
    const toISO = (d: any) =>
      d instanceof Date ? d.toISOString() : new Date(d).toISOString();

    const payload: PaymentsRequest = {
      assetCost: +b.assetCost,
      downPayment: +b.downPayment,
      percentOfFinance: +b.percentOfFinance,
      nfa: +b.nfa,

      interestRate: +r.interestRate,
      insuranceRate: +r.insuranceRate,
      tenor: +r.tenor,
      paymentPeriodId: +r.paymentPeriodId,

      rvAmount: +c.rvAmount,
      rvPercent: to3(c.rvPercent),

      provisionAmount: +c.provisionAmount,
      provisionPercent: to3(c.provisionPercent),

      reservePaymentAmount: to3(c.reservePaymentAmount),

      // ✅ correct key name for API (was gracePeriodCount before)
      gracePeriodInDays: +r.gracePeriodInDays,

      paymentTimingTermId: +c.paymentTimingTermId,
      startDate: toISO(b.startDate), // ✅ send ISO string
      rent: +c.referenceRent, // ✅ map referenceRent → rent
    };

    console.log('Submitting PaymentsRequest:', payload);

    this.financialFormsFacade.calculate(payload).subscribe({
      next: (rows) => {
        this.filteredFinancialForms = [...rows];
        this.originalFinancialForms = [...rows];
      },
      error: (err) => console.error('Calculate failed:', err),
    });
  }

  // this is what your table actually uses:
  filteredFinancialForms: Array<{
    referenceRent?: number;
    interest?: number;
    installment?: number;
  }> = [];

  // Sum of interest
  get sumOfInterest(): number {
    return this.filteredFinancialForms.reduce(
      (acc, row) => acc + (row.interest || 0),
      0
    );
  }

  // Sum of rent
  get sumOfRent(): number {
    return this.filteredFinancialForms.reduce(
      (acc, row) => acc + (row.referenceRent || 0),
      0
    );
  }

  // Sum of installments
  get sumOfInstallments(): number {
    return this.filteredFinancialForms.reduce(
      (acc, row) => acc + (row.installment || 0),
      0
    );
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredFinancialForms = this.originalFinancialForms.filter(
      (financial) =>
        Object.values(financial).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) =>
      this.financialFormsFacade.delete(id)
    );

    forkJoin(deleteCalls).subscribe({
      next: () => {
        this.selectedIds = [];
        this.showDeleteModal = false; // CLOSE MODAL HERE
        this.refreshCalls();
      },
      error: (err) => {
        this.showDeleteModal = false; // STILL CLOSE IT
      },
    });
  }

  refreshCalls() {
    this.financialFormsFacade.loadAll();
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedFinancialFormId = null;
  }
  onViewFinancialForms(financial: FinancialForm) {
    console.log('financial view', financial);
  }
  onEditFinancialForm(financial: FinancialForm) {
    console.log('financial edit', financial);
  }
  onDeleteFinancialForm(financialId: number): void {
    this.selectedIds = [financialId];
    this.showDeleteModal = true;
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    const dirty =
      this.leasingFinancialBasicForm.dirty ||
      this.leasingFinancialCurrencyForm.dirty ||
      this.leasingFinancialRateForm.dirty ||
      this.addAgreementShowMainInformationForm.dirty ||
      this.addMandateShowAssetTypeForm.dirty ||
      this.addMandateShowFeeForm.dirty;

    console.log(
      '[Guard] canDeactivate? allowLeaveAfterSave=',
      this.allowLeaveAfterSave,
      'dirty=',
      dirty
    );

    // If we just saved successfully, let navigation through
    if (this.allowLeaveAfterSave) return true;

    // Original behavior
    return !dirty;
  }

  private setWorkFlowActions(mandate?: Mandate | null): void {
    const list = [...(mandate?.allowedMandateWorkFlowActions ?? [])];
    this.workFlowActionList = list.map((a) => ({
      id: a.id,
      label: a.name,
      icon: 'pi pi-times',
    }));
  }
  refreshAllowedActions(): void {
    const id = this.leasingMandateId ?? this.routeId;
    if (!id) {
      console.warn('refreshAllowedActions: no mandate id available');
      return;
    }

    this.facade.loadById(id);
    this.facade.selected$.pipe(take(1)).subscribe({
      next: (mandate) => this.setWorkFlowActions(mandate),
      error: (err) => console.error('Failed to refresh actions:', err),
    });
  } // helper: mark all forms pristine (call after successful save)
  private markAllPristine(): void {
    const mark = (fg: FormGroup | FormArray) => {
      fg.markAsPristine();
      fg.markAsUntouched();
      Object.values(fg.controls).forEach((ctrl: any) => {
        if (ctrl?.controls) mark(ctrl);
        else {
          ctrl.markAsPristine();
          ctrl.markAsUntouched();
        }
      });
    };

    console.log('[Forms] Marking all forms pristine before navigation...');
    mark(this.leasingFinancialBasicForm);
    mark(this.leasingFinancialCurrencyForm);
    mark(this.leasingFinancialRateForm);
    mark(this.addAgreementShowMainInformationForm);
    mark(this.addMandateShowAssetTypeForm);
    mark(this.addMandateShowFeeForm);
    // parent as well
    if (this.parentForm) mark(this.parentForm);
  }
  private resolveClientId(basic: any): number | null {
    const fromRoute = this.clientId;
    if (Number.isFinite(fromRoute)) return Number(fromRoute);

    const v = basic?.clientId;
    const fromForm = v && typeof v === 'object' ? v.id : v;
    return Number.isFinite(Number(fromForm)) ? Number(fromForm) : null;
  } // Normalize "id or {id:...}" → number|null
  private toNumId(v: any): number | null {
    const raw = v && typeof v === 'object' ? v.id : v;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }

  // Reset a FormArray with mapped items
  private resetArrayWith<T>(
    fa: FormArray,
    items: T[] | undefined | null,
    factory: () => FormGroup,
    mapItem: (x: T) => any
  ): void {
    fa.clear();
    (items ?? []).forEach((it) => {
      const fg = factory();
      fg.patchValue(mapItem(it), { emitEvent: false });
      fa.push(fg);
    });
  }
}
