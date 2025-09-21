import { Component, ViewChild } from '@angular/core';
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
  finalize,
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
import { loadAll as loadInterestRateBenchmarks } from '../../../../../lookups/store/interest-rate-benchmarks/interest-rate-benchmarks.actions';
import { loadAll as loadPaymentTimingTerms } from '../../../../../lookups/store/payment-timing-terms/payment-timing-terms.actions';
import { loadAll as loadRentStructureTypes } from '../../../../../lookups/store/rent-structure-types/rent-structure-types.actions';
import { loadAll as loadPaymentMethods } from '../../../../../lookups/store/payment-methods/payment-methods.actions';
import { loadAll as loadPaymentMonthDays } from '../../../../../lookups/store/payment-month-days/payment-month-days.actions';
import { loadAll as loadAllGracePeriodUnits } from '../../../../../lookups/store/period-units/period-units.actions';
import { loadAll as loadCurrencies } from '../../../../../lookups/store/currencies/currencies.actions';
import { combineLatest, forkJoin, merge, of, Subject } from 'rxjs';
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
import { PeriodUnit } from '../../../../../lookups/store/period-units/period-unit.model';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { loadCurrencyExchangeRates } from '../../../../../lookups/store/currency-exchange-rates/currency-exchange-rates.actions';
import { GracePeriodUnitsFacade } from '../../../../../lookups/store/period-units/period-units.facade';
import { FinancialForm } from '../../../store/financial-form/financial-form.model';
import { FinancialFormsFacade } from '../../../store/financial-form/financial-forms.facade';
import { selectCalculatedRowsForId } from '../../../store/financial-form/financial-forms.selectors';
import { PaymentsRequest } from '../../../store/financial-form/payments-request.model';
import { Actions, ofType } from '@ngrx/effects';
import * as MandateActions from '../../../store/leasing-mandates/leasing-mandates.actions';

@Component({
  selector: 'app-add-mandate',
  standalone: false,
  templateUrl: './add-mandate.component.html',
  styleUrls: ['./add-mandate.component.scss'],
})
export class AddMandateComponent {
  workFlowActionList: any[] = [];
  selectedAction: string = '';
  public mandateId: any = null;
  public leasingMandateId: any = null;
  clientId = +this.route.snapshot.params['clientId'];
  show = false;
  editShow = false;
  private paymentPeriodsCache: PaymentPeriod[] = [];
  isSubmitting = false;
  parentForm!: FormGroup;
  addMandateShowBasicForm!: FormGroup;
  addMandateShowAssetTypeForm!: FormGroup;
  addMandateShowFeeForm!: FormGroup;
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
  paymentMonthDays$!: Observable<PaymentMonthDay[]>;
  private destroy$ = new Subject<void>();
  steps = [1, 2, 3, 4];
  stepTitles = ['Basic', 'Asset Types', 'Fees', 'Financial Activities'];
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
  routeId = this.route.snapshot.params['leasingMandatesId'];
  mandate!: any;
  private extraCurrencyRates: CurrencyExchangeRate[] = [];
  selectedIds: number[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private clientFacade: ClientsFacade,
    private leasingTypeFacade: LeasingTypesFacade,
    private insuredByFacade: InsuredByFacade,
    private assetTypesFacade: AssetTypesFacade,
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
    private actions$: Actions
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

    //Build all sub-forms
    this.buildMandateShowBasicForm();
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
      basic: this.addMandateShowBasicForm,
      assets: this.addMandateShowAssetTypeForm,
      fees: this.addMandateShowFeeForm,

      financialActivities: this.fb.group({
        basic: this.leasingFinancialBasicForm,
        rates: this.leasingFinancialRateForm,
        currency: this.leasingFinancialCurrencyForm,
      }),
    });

    //All your other setup (lookups, route handling, patching…)
    //no early returns that skip the clientId subscription
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
    this.store.dispatch(loadAll({})); // payment periods
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

    this.financialFormsFacade.loadByLeasingMandateId(
      this.route.snapshot.params['leasingMandatesId']
    );

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
        console.log('form', form);
        this.leasingFinancialBasicForm.patchValue(
          {
            assetCost: form.assetCost,
            downPayment: form.downPayment,
            percentOfFinance: form.percentOfFinance,
            nfa: form.nfa,
            startDate: form.startDate,
            years: form.years,
          },
          { emitEvent: false }
        );

        this.leasingFinancialRateForm.patchValue(
          {
            interestRate: form.interestRate,
            insuranceRate: form.insuranceRate,
            tenor: form.tenor,
            paymentPeriodId: form.paymentPeriodDTO?.id ?? null,
            paymentPeriodMonthCount: form.paymentPeriodMonthCount,
            gracePeriodInDays: form.gracePeriodCount,
            gracePeriodUnitId: form.gracePeriodUnitDTO?.id ?? null,
          },
          { emitEvent: false }
        );

        this.leasingFinancialCurrencyForm.patchValue(
          {
            currencyId: form.currencyDTO?.id ?? null,
            currencyExchangeRateId: form.currencyExchangeRateDto?.id ?? null,
            isManuaExchangeRate: form.isManuaExchangeRate,
            manualSetExchangeRate: form.manualSetExchangeRate,
            indicativeRentals: form.indicativeRentals,
            referenceRent: form.rent,
            rvAmount: form.rvAmount,
            rvPercent: form.rvPercent,
            reservePaymentCount: form.reservePaymentCount,
            reservePaymentAmount: form.reservePaymentAmount,
            provisionAmount: form.provisionAmount,
            provisionPercent: form.provisionPercent,
            interestRateBenchmarkId: form.interestRateBenchmarkDTO?.id ?? null,
            paymentTimingTermId: form.paymentTimingTermDTO?.id ?? null,
            rentStructureTypeId: form.rentStructureTypeDTO?.id ?? null,
            paymentMethodId: form.paymentMethodDTO?.id ?? null,
            paymentMonthDayID: form.paymentMonthDayDTO?.id ?? null,
          },
          { emitEvent: false }
        );

        if (form.payments?.length) {
          console.log('✅ Using payments from backend form');
          this.tableDataInside = [...form.payments];
          this.originalFinancialForms = [...form.payments];
          this.filteredFinancialForms = [...form.payments];
        } else {
          console.log('⏳ Waiting for calculated rows from selector...');
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
      const tree = +this.clientId
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
        return this.addMandateShowBasicForm;
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

    const manual = !!m.isManuaExchangeRate;
    const manualCtrl = this.leasingFinancialCurrencyForm.get(
      'manualSetExchangeRate'
    );
    if (manual) manualCtrl?.enable({ emitEvent: false });
    else manualCtrl?.disable({ emitEvent: false });

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
    this.facade.workFlowActionSuccess$.pipe(take(1)).subscribe({
      next: () => {
        console.log('Workflow action submitted successfully.');
        this.refreshAllowedActions();
      },
      error: (err) => console.error('Workflow action failed:', err),
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
        clientId: +this.clientId,
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

  // Auto-calc expireDate = date + validityDay, whenever either changes.
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
  private computeDownPayment(): void {
    console.log('down payment compute');
    const assetCost = +this.leasingFinancialBasicForm.get('assetCost')?.value;
    const percentOfFinance =
      +this.leasingFinancialBasicForm.get('percentOfFinance')?.value;
    let downPayment = assetCost * (1 - percentOfFinance / 100);
    this.leasingFinancialBasicForm.get('downPayment')?.setValue(downPayment);
  }
  private computeNFA(): void {
    console.log('NFA payment compute');
    const assetCost = +this.leasingFinancialBasicForm.get('assetCost')?.value;
    const downPayment =
      +this.leasingFinancialBasicForm.get('downPayment')?.value;

    const nfa = assetCost - downPayment;
    this.leasingFinancialBasicForm.get('nfa')?.setValue(nfa);
  }

  private setPeriodInterestRate(): void {
    const interestRate =
      +this.leasingFinancialRateForm.get('interestRate')?.value || 0;
    const monthCount = this.getMonthCountFromRates();
    const value = ((interestRate / 100) * monthCount * 365) / 360 / 12;
    this.leasingFinancialRateForm
      .get('periodInterestRate')
      ?.setValue(value, { emitEvent: false });
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
  private round(n: number, dp = 3): number {
    return +parseFloat(String(n)).toFixed(dp);
  }

  /** Get monthCount for a paymentPeriodId from the store once, then call cb. */
  private withMonthCount(cb: (monthCount: number) => void): void {
    const pid = this.num(
      this.addMandateShowBasicForm.get('paymentPeriodId')?.value
    );
    if (!pid) return cb(0);
    this.paymentPeriods$?.pipe(take(1)).subscribe((periods) => {
      const mm = periods?.find((p) => p.id === pid)?.monthCount ?? 0;
      cb(this.num(mm));
    });
  }

  // --- RV & Provision (ADDMANDATESHOWBASICFORM) ---
  private recalcRvAndProvision(): void {
    this.calcRvAmountFromPercent();
    this.calcProvisionPercent();
    this.calcProvisionAmount();
  }

  private calcRvPercentFromAmount(): void {
    const nfa = this.addMandateShowBasicForm.get('nfa')?.value;
    const rvAmount = this.addMandateShowBasicForm.get('rvAmount')?.value;
    const pct = calcRvPercent(nfa, rvAmount);
    this.addMandateShowBasicForm
      .get('rvPercent')
      ?.setValue(pct, { emitEvent: false });
  }

  private calcRvAmountFromPercent(): void {
    const nfa = this.addMandateShowBasicForm.get('nfa')?.value;
    const rvPercent = this.addMandateShowBasicForm.get('rvPercent')?.value;
    const amt = calcRvAmount(nfa, rvPercent);
    this.addMandateShowBasicForm
      .get('rvAmount')
      ?.setValue(amt, { emitEvent: false });
  }
  private calcProvisionPercent(): void {
    const nfa = this.addMandateShowBasicForm.get('nfa')?.value;
    const rvAmount = this.addMandateShowBasicForm.get('rvAmount')?.value;
    const provAmt = this.addMandateShowBasicForm.get('provisionAmount')?.value;
    const pct = calcProvisionPercent(nfa, rvAmount, provAmt);
    this.addMandateShowBasicForm
      .get('provisionPercent')
      ?.setValue(pct, { emitEvent: false });
  }

  private calcProvisionAmount(): void {
    const nfa = this.addMandateShowBasicForm.get('nfa')?.value;
    const rvAmount = this.addMandateShowBasicForm.get('rvAmount')?.value;
    const provPct = this.addMandateShowBasicForm.get('provisionPercent')?.value;
    const amt = calcProvisionAmount(nfa, rvAmount, provPct);
    this.addMandateShowBasicForm
      .get('provisionAmount')
      ?.setValue(amt, { emitEvent: false });
  }

  /** Build the single payload for `facade.create(...)` */
  private buildCreatePayload(): any {
    // ✅ always use getRawValue() so disabled controls (like expireDate / manualSetExchangeRate) are included
    const basic = this.addMandateShowBasicForm.getRawValue();
    const assets = this.addMandateShowAssetTypeForm.getRawValue();
    const fees = this.addMandateShowFeeForm.getRawValue();

    const finBasic = this.leasingFinancialBasicForm.getRawValue();
    const finRate = this.leasingFinancialRateForm.getRawValue();
    const finCurr = this.leasingFinancialCurrencyForm.getRawValue();

    // If some selects bind whole objects, normalize to IDs
    const idOf = (v: any) => (v && typeof v === 'object' ? v.id : v);
    // optional: 3dp rounding for money-like fields
    const to3 = (n: any) => +parseFloat(n ?? 0).toFixed(3);

    return {
      // ===== Step 1: Basic Mandate =====
      description: basic.description ?? 'string', // or null if not used
      date: basic.date, // ISO string or Date (Angular HttpClient will serialize)
      clientId: this.clientId ?? idOf(basic.clientId),
      parentMandateId: basic.parentMandateId,
      leasingTypeId: idOf(basic.leasingTypeId),
      validityDay: +basic.validityDay,
      expireDate: basic.expireDate, // comes from disabled control -> getRawValue() captures it
      notes: basic.notes,

      // ===== Step 4.A: Currency (has a couple of fields you listed near top) =====
      indicativeRentals: finCurr.indicativeRentals,
      insuredById: idOf(basic.insuredById),

      // ===== Step 4.B: Basic financials =====
      assetCost: finBasic.assetCost,
      downPayment: finBasic.downPayment,
      percentOfFinance: finBasic.percentOfFinance,
      nfa: finBasic.nfa,

      // ===== Step 4.C: Rates =====
      interestRate: finRate.interestRate,
      insuranceRate: finRate.insuranceRate,
      tenor: finRate.tenor,
      paymentPeriodId: idOf(finRate.paymentPeriodId),

      // ===== Step 4.D: Currency (continued) =====
      // NOTE: API expects lowerCamelCase: paymentMonthDayId / paymentMethodId
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

      // Name in your JSON is `gracePeriodInDays`
      gracePeriodInDays: finRate.gracePeriodInDays,

      rentStructureTypeId: idOf(finCurr.rentStructureTypeId),
      paymentTimingTermId: idOf(finCurr.paymentTimingTermId),

      startDate: finBasic.startDate,
      years: finBasic.years,
      rent: finCurr.referenceRent,

      // ===== Step 2 & 3: Arrays =====
      mandateAssetTypes: (assets.mandateAssetTypes ?? []).map((a: any) => ({
        assetTypeId: idOf(a.assetTypeId),
        assetsTypeDescription: a.assetsTypeDescription,
      })),
      mandateFees: (fees.mandateFees ?? []).map((f: any) => ({
        feeTypeId: idOf(f.feeTypeId),
        actualAmount: f.actualAmount,
        actualPercentage: f.actualPercentage,
      })),
    };
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
    if (hasClient) {
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
      this.addMandateShowBasicForm.dirty ||
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
    mark(this.addMandateShowBasicForm);
    mark(this.addMandateShowAssetTypeForm);
    mark(this.addMandateShowFeeForm);
    // parent as well
    if (this.parentForm) mark(this.parentForm);
  }
}
