import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, forkJoin, Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter, take, withLatestFrom } from 'rxjs/operators';

import { loadAll } from '../../../../../lookups/store/payment-periods/payment-periods.actions';
import { loadAll as loadAllGracePeriodUnits } from '../../../../../lookups/store/period-units/period-units.actions';
import { loadAll as loadCurrencies } from '../../../../../lookups/store/currencies/currencies.actions';
import { loadCurrencyExchangeRates } from '../../../../../lookups/store/currency-exchange-rates/currency-exchange-rates.actions';
import { loadAll as loadInterestRateBenchmarks } from '../../../../../lookups/store/interest-rate-benchmarks/interest-rate-benchmarks.actions';
import { loadAll as loadPaymentTimingTerms } from '../../../../../lookups/store/payment-timing-terms/payment-timing-terms.actions';
import { loadAll as loadRentStructureTypes } from '../../../../../lookups/store/rent-structure-types/rent-structure-types.actions';
import { loadAll as loadPaymentMethods } from '../../../../../lookups/store/payment-methods/payment-methods.actions';
import { loadAll as loadPaymentMonthDays } from '../../../../../lookups/store/payment-month-days/payment-month-days.actions';

import { PaymentPeriod } from '../../../../../lookups/store/payment-periods/payment-period.model';
import { PaymentPeriodsFacade } from '../../../../../lookups/store/payment-periods/payment-periods.facade';
import { Currency } from '../../../../../lookups/store/currencies/currency.model';
import { Calculation } from '../../../../../../shared/interfaces/calculations.interface';
import { PeriodUnit } from '../../../../../lookups/store/period-units/period-unit.model';
import { InterestRateBenchMark } from '../../../../../lookups/store/interest-rate-benchmarks/interest-rate-benchmark.model';
import { PaymentTimingTerm } from '../../../../../lookups/store/payment-timing-terms/payment-timing-term.model';
import { CurrencyExchangeRate } from '../../../../../lookups/store/currency-exchange-rates/currency-exchange-rate.model';
import { RentStructureType } from '../../../../../lookups/store/rent-structure-types/rent-structure-type.model';
import { PaymentMethod } from '../../../../../lookups/store/payment-methods/payment-method.model';
import { PaymentMonthDay } from '../../../../../lookups/store/payment-month-days/payment-month-day.model';

import { GracePeriodUnitsFacade } from '../../../../../lookups/store/period-units/period-units.facade';
import { CurrenciesFacade } from '../../../../../lookups/store/currencies/currencies.facade';
import { CurrencyExchangeRatesFacade } from '../../../../../lookups/store/currency-exchange-rates/currency-exchange-rates.facade';
import { InterestRateBenchMarksFacade } from '../../../../../lookups/store/interest-rate-benchmarks/interest-rate-benchmarks.facade';
import { PaymentTimingTermsFacade } from '../../../../../lookups/store/payment-timing-terms/payment-timing-terms.facade';
import { RentStructureTypesFacade } from '../../../../../lookups/store/rent-structure-types/rent-structure-types.facade';
import { PaymentMethodsFacade } from '../../../../../lookups/store/payment-methods/payment-methods.facade';
import { PaymentMonthDaysFacade } from '../../../../../lookups/store/payment-month-days/payment-month-days.facade';
import { FinancialForm } from '../../../store/financial-form/financial-form.model';
import { FinancialFormsFacade } from '../../../store/financial-form/financial-forms.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { selectCalculatedRowsForId } from '../../../store/financial-form/financial-forms.selectors';
import { MandatesFacade } from '../../../store/leasing-mandates/leasing-mandates.facade';
import { Mandate } from '../../../store/leasing-mandates/leasing-mandate.model';
import { loadById } from '../../../store/leasing-mandates/leasing-mandates.actions';
@Component({
  selector: 'app-leasing-financial-form-compound',
  standalone: false,
  templateUrl: './leasing-financial-form-compound.component.html',
  styleUrl: './leasing-financial-form-compound.component.scss',
})
export class LeasingFinancialFormCompoundComponent implements OnDestroy {
  tableDataInside: any[] = [];
  leasingFinancialBasicForm!: FormGroup;
  leasingFinancialRateForm!: FormGroup;
  leasingFinancialCurrencyForm!: FormGroup;
  selectedGracePeriodUnit!: PeriodUnit;
  selectedCurrency!: Currency;
  currencyExchangeRateId: any;
  filteredFinancialForms: any[] = [];
  originalFinancialForms: any[] = [];
  showFilters: boolean = false;
  selectedFinancialFormId: number | null = null;
  showDeleteModal: boolean = false;
  first2: number = 0;
  financialForm$ = this.facade.selected$;
  @ViewChild('tableRef') tableRef!: TableComponent;
  private destroy$ = new Subject<void>();
  leasingMandateId: any;

  readonly colsInside = [
    { field: 'paymentNumber', header: 'Payment Number' },
    { field: 'dueDate', header: 'Due Date' },
    { field: 'balanceBefore', header: 'Balance Before' },
    { field: 'balanceAfter', header: 'Balance After' },
    { field: 'interest', header: 'Interest' },
    { field: 'principal', header: 'Principal' },
    { field: 'installment', header: 'Installment' },
    { field: 'insuranceIncome', header: 'Insurance Income' },
  ];
  paymentPeriods$!: Observable<PaymentPeriod[]>;
  gracePeriodUnits$!: Observable<PeriodUnit[]>;
  currencies$!: Observable<Currency[]>;
  currencyExchangeRates$!: Observable<CurrencyExchangeRate[]>;
  interestRateBenchMarks$!: Observable<InterestRateBenchMark[]>;
  paymentTimeTerms$!: Observable<PaymentTimingTerm[]>;
  rentStructures$!: Observable<RentStructureType[]>;
  paymentMethods$!: Observable<PaymentMethod[]>;
  paymentMonthDays$!: Observable<PaymentMonthDay[]>;
  private currentMandateId!: number;
  selectedAction: string = '';
  workFlowActionList: any[] = [];
  routeId = this.route.snapshot.params['leasingMandatesId'];
  mandate!: any;
  constructor(
    private fb: FormBuilder,
    private paymentPeriodFacade: PaymentPeriodsFacade,
    private gracePeriodUnitFacade: GracePeriodUnitsFacade,
    private currenciesFacade: CurrenciesFacade,
    private currencyExchangeRatesFacade: CurrencyExchangeRatesFacade,
    private interestRateFacade: InterestRateBenchMarksFacade,
    private paymentTimingFacade: PaymentTimingTermsFacade,
    private rentStructuresFacade: RentStructureTypesFacade,
    private paymentMethodsFacade: PaymentMethodsFacade,
    private paymentMonthDaysFacade: PaymentMonthDaysFacade,
    private facade: FinancialFormsFacade,
    private mandateFacade: MandatesFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    // 1) Build the three sub-forms
    this.initializeLeasingFinancialBasicForm();
    this.initializeLeasingFinancialRatesForm();
    this.initializeLeasingFinancialCurrencyForm();

    // 2) Set up value-change listeners, etc.
    this.setupFormListeners();
    this.leasingFinancialCurrencyForm
      .get('currencyExchangeRateId')!
      .valueChanges.subscribe((val) =>
        console.log('📊 [FormControl] currencyExchangeRateId →', val)
      );
    // 3) Dispatch all lookups
    this.store.dispatch(loadAll({})); // payment periods
    this.store.dispatch(loadAllGracePeriodUnits({})); // grace units
    this.store.dispatch(loadCurrencies({})); // currencies
    this.store.dispatch(loadCurrencyExchangeRates()); // exchange rates
    this.store.dispatch(loadInterestRateBenchmarks({}));
    this.store.dispatch(loadPaymentTimingTerms({}));
    this.store.dispatch(loadRentStructureTypes({}));
    this.store.dispatch(loadPaymentMethods({}));
    this.store.dispatch(loadPaymentMonthDays({}));

    // 4) Expose your Observables
    this.paymentPeriods$ = this.paymentPeriodFacade.all$;
    this.gracePeriodUnits$ = this.gracePeriodUnitFacade.all$;
    this.currencies$ = this.currenciesFacade.all$;
    this.currencyExchangeRates$ = this.currencyExchangeRatesFacade.items$;
    this.interestRateBenchMarks$ = this.interestRateFacade.all$;
    this.paymentTimeTerms$ = this.paymentTimingFacade.all$;
    this.rentStructures$ = this.rentStructuresFacade.all$;
    this.paymentMethods$ = this.paymentMethodsFacade.all$;
    this.paymentMonthDays$ = this.paymentMonthDaysFacade.all$;

    // 5) Load the financial form for this mandate
    this.facade.loadByLeasingMandateId(
      this.route.snapshot.params['leasingMandatesId']
    );

    // 6) Patch the two sub-forms (basic + rates) as soon as the form arrives
    this.facade.selected$
      .pipe(
        filter((f) => !!f),
        takeUntil(this.destroy$)
      )
      .subscribe((form) => {
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
            paymentPeriodId: form.paymentPeriodDTO.id!,
            paymentPeriodMonthCount: form.paymentPeriodMonthCount,
            gracePeriod: form.gracePeriodCount,
            gracePeriodUnitId: form.gracePeriodUnitDTO.id!,
          },
          { emitEvent: false }
        );

        this.leasingFinancialCurrencyForm.patchValue(
          {
            currencyId: form.currencyDTO.id!,
            isManualExchangeRate: form.isManualExchangeRate,
            manualExchangeRate: form.manualSetExchangeRate,
            indicativeRentals: form.indicativeRentals,
            rent: form.rent,
            rvAmount: form.rvAmount,
            rvPercent: form.rvPercent,
            reservePaymentCount: form.reservePaymentCount,
            reservePaymentAmount: form.reservePaymentAmount,
            provisionAmount: form.provisionAmount,
            provisionPercent: form.provisionPercent,
            interestRateBenchmarkId: form.interestRateBenchmarkDTO.id!,
            paymentTimingTermId: form.paymentTimingTermDTO.id!,
            rentStructureTypeId: form.rentStructureTypeDTO.id!,
            paymentMethodId: form.paymentMethodDTO.id!,
            paymentMonthDayID: form.paymentMonthDayDTO.id!,
          },
          { emitEvent: false }
        );
      });

    // 7) **Only once** both the form **and** the rates list are loaded,
    //    patch the currencyExchangeRateId so the <p-select> can match an option.
    combineLatest([
      this.facade.selected$.pipe(filter((f) => !!f)),
      this.currencyExchangeRates$.pipe(filter((list) => list.length > 0)),
    ])
      .pipe(take(1))
      .subscribe(([form, rates]) => {
        console.log(
          '🚀 Patching currencyExchangeRateId now:',
          form.currencyExchangeRateId
        );
        this.leasingFinancialCurrencyForm.patchValue(
          {
            currencyExchangeRateId: +form.currencyExchangeRateId!,
          },
          { emitEvent: false }
        );
      });
    console.log(
      '🔧 After patch → formControl:',
      this.leasingFinancialCurrencyForm.get('currencyExchangeRateId')!.value
    );

    // 8) Finally, subscribe to the calculated rows for your table
    this.store
      .select(selectCalculatedRowsForId(this.currentMandateId))
      .pipe(takeUntil(this.destroy$))
      .subscribe((rows) => {
        this.tableDataInside = [...rows];
        this.originalFinancialForms = [...rows];
        this.filteredFinancialForms = [...rows];
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
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
      paymentPeriodMonthCount: [null, Validators.required],
      gracePeriod: [null, Validators.required],
      gracePeriodUnitId: [null, Validators.required],
    });
  }
  private initializeLeasingFinancialCurrencyForm() {
    this.leasingFinancialCurrencyForm = this.fb.group({
      currencyId: [null, Validators.required],
      currencyExchangeRateId: [null, Validators.required],
      isManualExchangeRate: [true],
      manualExchangeRate: [{ value: null, disabled: true }],
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
      paymentMethodId: [null, Validators.required],
      paymentMonthDayID: [null, Validators.required],
    });
  }

  private setupFormListeners() {
    // Basic Finance Information Listeners
    this.leasingFinancialBasicForm
      .get('assetCost')
      ?.valueChanges.subscribe(() => {
        console.log('AssetCost changed.');
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
        this.updateProvisionAmount();
      });

    // Currency and Manual Exchange Rate Listeners
    this.leasingFinancialCurrencyForm
      .get('isManualExchangeRate')
      ?.valueChanges.subscribe((isChecked: boolean) => {
        console.log('Checkbox checked:', isChecked);
        setTimeout(() => {
          const manualExchangeRateControl =
            this.leasingFinancialCurrencyForm.get('manualExchangeRate');
          if (manualExchangeRateControl) {
            manualExchangeRateControl.enable({ emitEvent: false });
            if (isChecked) {
              console.log('Enabling manualExchangeRate control.');
              manualExchangeRateControl.enable({ emitEvent: false });
            } else {
              console.log(
                'Disabling manualExchangeRate control and resetting value.'
              );
              manualExchangeRateControl.setValue(0, { emitEvent: false });
              manualExchangeRateControl.disable({ emitEvent: false });
            }
          }
        });
      });

    // Rates and Periods Listeners
    this.leasingFinancialCurrencyForm
      .get('rent')
      ?.valueChanges.subscribe(() => {
        console.log('Rent changed.');
        this.calculateReservePaymentAmount();
      });

    this.leasingFinancialRateForm
      .get('CalculatePeriodInterestRate')
      ?.valueChanges.subscribe(() => {
        console.log('InsuranceRate changed.');
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
      .get('paymentPeriodMonthCount')
      ?.valueChanges.subscribe(() => {
        console.log('MonthCount changed.');
        this.calculateReservePaymentAmount();
        this.calculateReservePaymentCount();
      });

    // NFA Dependencies
    this.leasingFinancialBasicForm.get('nfa')?.valueChanges.subscribe(() => {
      console.log('NFA changed.');
      this.updateProvisionPercent();
      this.updateProvisionAmount();
    });
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
  private calculateReservePaymentAmount() {
    const rent = this.leasingFinancialCurrencyForm.get('rent')?.value || 0;
    const assetCost =
      this.leasingFinancialBasicForm.get('assetCost')?.value || 0;
    const insuranceRate =
      this.leasingFinancialRateForm.get('insuranceRate')?.value || 0;
    const reservePaymentCount =
      this.leasingFinancialCurrencyForm.get('reservePaymentCount')?.value || 0;
    const monthCount =
      this.leasingFinancialRateForm.get('paymentPeriodMonthCount')?.value || 0;

    console.log('Calculating ReservePaymentAmount with values:', {
      rent,
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

    if (rent + othersIncome === 0) {
      console.log(
        'Rent + OthersIncome is 0. Unable to calculate ReservePaymentAmount.'
      );
      this.leasingFinancialCurrencyForm
        .get('reservePaymentAmount')
        ?.setValue(0, { emitEvent: false });
      return;
    }

    const reservePaymentAmount =
      ((rent + othersIncome) * reservePaymentCount) / monthCount;
    console.log('Calculated ReservePaymentAmount:', reservePaymentAmount);
    this.leasingFinancialCurrencyForm
      .get('reservePaymentAmount')
      ?.setValue(reservePaymentAmount, { emitEvent: false });
  }
  private updateRvPercent() {
    const rvAmount =
      this.leasingFinancialCurrencyForm.get('rvAmount')!.value || 0;
    const nfa = this.leasingFinancialBasicForm.get('nfa')!.value || 0;

    if (nfa > 0) {
      const calculatedRvPercent = (rvAmount / nfa) * 100;
      this.leasingFinancialCurrencyForm
        .get('rvPercent')!
        .setValue(calculatedRvPercent, { emitEvent: false });
    }
  }
  private updateProvisionPercent() {
    const provisionAmount =
      this.leasingFinancialCurrencyForm.get('provisionAmount')!.value || 0;
    const nfa = this.leasingFinancialBasicForm.get('nfa')!.value || 0;
    const rvAmount =
      this.leasingFinancialCurrencyForm.get('rvAmount')!.value || 0;

    const denominator = nfa - rvAmount;
    console.log('Calculating ProvisionPercent:', {
      provisionAmount,
      nfa,
      rvAmount,
      denominator,
    });

    if (denominator > 0) {
      const calculatedProvisionPercent = (provisionAmount / denominator) * 100;
      console.log('Calculated ProvisionPercent:', calculatedProvisionPercent);
      this.leasingFinancialCurrencyForm
        .get('provisionPercent')!
        .setValue(calculatedProvisionPercent, { emitEvent: false });
    } else {
      console.log('Denominator is <= 0. Setting ProvisionPercent to 0.');
      this.leasingFinancialCurrencyForm
        .get('provisionPercent')!
        .setValue(0, { emitEvent: false });
    }
  }
  private updateProvisionAmount() {
    const provisionPercent =
      this.leasingFinancialCurrencyForm.get('provisionPercent')!.value || 0;
    const nfa = this.leasingFinancialBasicForm.get('nfa')!.value || 0;
    const rvAmount =
      this.leasingFinancialCurrencyForm.get('rvAmount')!.value || 0;

    const denominator = nfa - rvAmount;
    console.log('Calculating ProvisionAmount:', {
      provisionPercent,
      nfa,
      rvAmount,
      denominator,
    });

    if (denominator > 0) {
      const calculatedProvisionAmount = (provisionPercent / 100) * denominator;
      console.log('Calculated ProvisionAmount:', calculatedProvisionAmount);
      this.leasingFinancialCurrencyForm
        .get('provisionAmount')!
        .setValue(calculatedProvisionAmount, { emitEvent: false });
    } else {
      console.log('Denominator is <= 0. Setting ProvisionAmount to 0.');
      this.leasingFinancialCurrencyForm
        .get('provisionAmount')!
        .setValue(0, { emitEvent: false });
    }
  }
  private updateRvAmount() {
    // ✅ pull rvPercent from the currency form, not the basic form:
    const rvPercent =
      this.leasingFinancialCurrencyForm.get('rvPercent')!.value || 0;
    // nfa still comes from the basic form
    const nfa = this.leasingFinancialBasicForm.get('nfa')!.value || 0;

    const calculatedRvAmount = Math.round(nfa * (rvPercent / 100));

    this.leasingFinancialCurrencyForm
      .get('rvAmount')!
      .setValue(calculatedRvAmount, { emitEvent: false });
  }

  private calculatePeriodInterestRate() {
    const interestRate =
      this.leasingFinancialRateForm.get('interestRate')?.value || 0;

    const monthCount =
      this.leasingFinancialRateForm.get('paymentPeriodMonthCount')?.value || 0;

    return ((interestRate / 100) * monthCount * 365) / 360 / 12;
  }
  private calculateReservePaymentCount() {
    const rent = this.leasingFinancialCurrencyForm.get('rent')?.value || 0;
    const assetCost =
      this.leasingFinancialBasicForm.get('assetCost')?.value || 0;
    const insuranceRate =
      this.leasingFinancialRateForm.get('insuranceRate')?.value || 0;
    const reservePaymentAmount =
      this.leasingFinancialCurrencyForm.get('reservePaymentAmount')?.value || 0;
    const monthCount =
      this.leasingFinancialCurrencyForm.get('paymentPeriodMonthCount')?.value ||
      0;

    console.log('Calculating ReservePaymentCount with values:', {
      rent,
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

    if (rent + othersIncome === 0) {
      console.log(
        'Rent + OthersIncome is 0. Unable to calculate ReservePaymentCount.'
      );
      this.leasingFinancialCurrencyForm
        .get('reservePaymentCount')
        ?.setValue(0, { emitEvent: false });
      return;
    }

    const reservePaymentCount = Math.floor(
      (reservePaymentAmount * monthCount) / (rent + othersIncome)
    );
    console.log(
      'Calculated ReservePaymentCount (rounded):',
      reservePaymentCount
    );

    this.leasingFinancialCurrencyForm
      .get('reservePaymentCount')
      ?.setValue(reservePaymentCount, { emitEvent: false });
  }
  onCheckboxChange(event: { originalEvent: Event; checked: boolean }) {
    const manualExchangeRateControl =
      this.leasingFinancialCurrencyForm.get('manualExchangeRate')!;

    // Enable the control whenever the checkbox is toggled on
    if (event?.checked) {
      console.log(
        'Manual checkbox check detected. Enabling manualExchangeRate control.'
      );
      manualExchangeRateControl.enable({ emitEvent: false });
    } else {
      console.log(
        'Manual checkbox uncheck detected. Resetting and disabling manualExchangeRate control.'
      );
      manualExchangeRateControl.reset(0, { emitEvent: false });
      manualExchangeRateControl.disable({ emitEvent: false });
    }
  }
  onPaymentPeriodSelected(event: PaymentPeriod) {
    console.log('PaymentPeriod selected:', event);
    const monthCount = event?.monthCount || 0;
    console.log('Extracted MonthCount:', monthCount);
    this.leasingFinancialRateForm
      .get('paymentPeriodMonthCount')
      ?.setValue(monthCount);
    console.log('Updated form control paymentPeriodMonthCount:', monthCount);

    this.calculateReservePaymentAmount();
    this.calculateReservePaymentCount();
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
    const id = event.value;
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
      .get('paymentMonthDayId')
      ?.setValue(paymentMonthDay.id); // Update form control
  }
  /** Return true only if all three FormGroups are valid */

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
      Object.keys(this.leasingFinancialBasicForm.controls).forEach((field) => {
        const control = this.leasingFinancialBasicForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      Object.keys(this.leasingFinancialCurrencyForm.controls).forEach(
        (field) => {
          const control = this.leasingFinancialCurrencyForm.get(field);
          control?.markAsTouched({ onlySelf: true });
        }
      );
      Object.keys(this.leasingFinancialRateForm.controls).forEach((field) => {
        const control = this.leasingFinancialRateForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      console.log('Form is invalid');
      return;
    }

    // Extract only the IDs for dropdown fields
    const formData = {
      ...this.leasingFinancialBasicForm.getRawValue(),
      ...this.leasingFinancialCurrencyForm.getRawValue(),
      ...this.leasingFinancialRateForm.getRawValue(), // includes disabled fields
      leasingMandateId: this.route.snapshot.params['leasingMandatesId'], // Ensure leasingMandateId is set here
      paymentPeriodId:
        this.leasingFinancialRateForm.get('paymentPeriodId')?.value?.id ||
        this.leasingFinancialRateForm.get('paymentPeriodId')?.value,
      currencyId:
        this.leasingFinancialCurrencyForm.get('currencyId')?.value?.id ||
        this.leasingFinancialCurrencyForm.get('currencyId')?.value,
      currencyExchangeRateId:
        this.leasingFinancialCurrencyForm.get('currencyExchangeRateId')?.value
          ?.id ||
        this.leasingFinancialCurrencyForm.get('currencyExchangeRateId')?.value,
      gracePeriodUnitId:
        this.leasingFinancialRateForm.get('gracePeriodUnitId')?.value?.id ||
        this.leasingFinancialRateForm.get('gracePeriodUnitId')?.value,
      interestRateBenchmarkId:
        this.leasingFinancialCurrencyForm.get('interestRateBenchmarkId')?.value
          ?.id ||
        this.leasingFinancialCurrencyForm.get('interestRateBenchmarkId')?.value,
      rentStructureTypeId:
        this.leasingFinancialCurrencyForm.get('rentStructureTypeId')?.value
          ?.id ||
        this.leasingFinancialCurrencyForm.get('rentStructureTypeId')?.value,
      paymentTimingTermId:
        this.leasingFinancialCurrencyForm.get('paymentTimingTermId')?.value
          ?.id ||
        this.leasingFinancialCurrencyForm.get('paymentTimingTermId')?.value,
      paymentMethodId:
        this.leasingFinancialCurrencyForm.get('paymentMethodId')?.value?.id ||
        this.leasingFinancialCurrencyForm.get('paymentMethodId')?.value,
      paymentMonthDayID:
        this.leasingFinancialCurrencyForm.get('paymentMonthDayID')?.value?.id ||
        this.leasingFinancialCurrencyForm.get('paymentMonthDayID')?.value,
      reservePaymentAmount: parseFloat(
        (
          this.leasingFinancialCurrencyForm.get('reservePaymentAmount')
            ?.value || 0
        ).toFixed(3)
      ),
      rvPercent: parseFloat(
        (
          this.leasingFinancialCurrencyForm.get('rvPercent')?.value || 0
        ).toFixed(3)
      ),
      provisionPercent: parseFloat(
        (
          this.leasingFinancialCurrencyForm.get('provisionPercent')?.value || 0
        ).toFixed(3)
      ),
    };
    this.facade.calculate(formData);
    console.log('Submitting form data:', formData);
  }

  /** “Submit” should only fire once the user has validated everything and clicked */
  onSubmitAll() {
    if (
      this.leasingFinancialBasicForm.invalid ||
      this.leasingFinancialCurrencyForm.invalid ||
      this.leasingFinancialRateForm.invalid
    ) {
      Object.keys(this.leasingFinancialBasicForm.controls).forEach((field) => {
        const control = this.leasingFinancialBasicForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      Object.keys(this.leasingFinancialCurrencyForm.controls).forEach(
        (field) => {
          const control = this.leasingFinancialCurrencyForm.get(field);
          control?.markAsTouched({ onlySelf: true });
        }
      );
      Object.keys(this.leasingFinancialRateForm.controls).forEach((field) => {
        const control = this.leasingFinancialRateForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      console.log('Form is invalid');
      return;
    }

    // Extract only the IDs for dropdown fields
    const formData = {
      ...this.leasingFinancialBasicForm.getRawValue(),
      ...this.leasingFinancialCurrencyForm.getRawValue(),
      ...this.leasingFinancialRateForm.getRawValue(), // includes disabled fields
      leasingMandateId: this.route.snapshot.params['leasingMandatesId'], // Ensure leasingMandateId is set here
      paymentPeriodId:
        this.leasingFinancialRateForm.get('paymentPeriodId')?.value?.id ||
        this.leasingFinancialRateForm.get('paymentPeriodId')?.value,
      currencyId:
        this.leasingFinancialCurrencyForm.get('currencyId')?.value?.id ||
        this.leasingFinancialCurrencyForm.get('currencyId')?.value,
      currencyExchangeRateId:
        this.leasingFinancialCurrencyForm.get('currencyExchangeRateId')?.value
          ?.id ||
        this.leasingFinancialCurrencyForm.get('currencyExchangeRateId')?.value,
      gracePeriodUnitId:
        this.leasingFinancialRateForm.get('gracePeriodUnitId')?.value?.id ||
        this.leasingFinancialRateForm.get('gracePeriodUnitId')?.value,
      interestRateBenchmarkId:
        this.leasingFinancialCurrencyForm.get('interestRateBenchmarkId')?.value
          ?.id ||
        this.leasingFinancialCurrencyForm.get('interestRateBenchmarkId')?.value,
      rentStructureTypeId:
        this.leasingFinancialCurrencyForm.get('rentStructureTypeId')?.value
          ?.id ||
        this.leasingFinancialCurrencyForm.get('rentStructureTypeId')?.value,
      paymentTimingTermId:
        this.leasingFinancialCurrencyForm.get('paymentTimingTermId')?.value
          ?.id ||
        this.leasingFinancialCurrencyForm.get('paymentTimingTermId')?.value,
      paymentMethodId:
        this.leasingFinancialCurrencyForm.get('paymentMethodId')?.value?.id ||
        this.leasingFinancialCurrencyForm.get('paymentMethodId')?.value,
      paymentMonthDayID:
        this.leasingFinancialCurrencyForm.get('paymentMonthDayID')?.value?.id ||
        this.leasingFinancialCurrencyForm.get('paymentMonthDayID')?.value,
      reservePaymentAmount: parseFloat(
        (
          this.leasingFinancialCurrencyForm.get('reservePaymentAmount')
            ?.value || 0
        ).toFixed(3)
      ),
      rvPercent: parseFloat(
        (
          this.leasingFinancialCurrencyForm.get('rvPercent')?.value || 0
        ).toFixed(3)
      ),
      provisionPercent: parseFloat(
        (
          this.leasingFinancialCurrencyForm.get('provisionPercent')?.value || 0
        ).toFixed(3)
      ),
    };
    if (this.leasingFinancialBasicForm.valid) {
      this.leasingFinancialBasicForm.markAsPristine();
    }
    if (this.leasingFinancialCurrencyForm.valid) {
      this.leasingFinancialCurrencyForm.markAsPristine();
    }
    if (this.leasingFinancialRateForm.valid) {
      this.leasingFinancialRateForm.markAsPristine();
    }
    this.facade.create(formData);
    console.log('Submitting form data:', formData);
  }
  // inside LeasingFinancialFormCompoundComponent (after onSubmitAll)
  get sumOfInterest(): number {
    return this.tableDataInside
      .map((row) => row.interest || 0)
      .reduce((acc, cur) => acc + cur, 0);
  }

  /** Sum of “installment” (i.e. “rent”) across all rows */
  get sumOfRent(): number {
    return this.tableDataInside
      .map((row) => {
        console.log('Row:', row); // 🔍 Log each row
        return row.rent || 0;
      })
      .reduce((acc, cur) => acc + cur, 0);
  }

  get sumOfInstallments(): number {
    return this.tableDataInside
      .map((row) => row.installment || 0)
      .reduce((acc, cur) => acc + cur, 0);
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
  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) => this.facade.delete(id));

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
    this.facade.loadAll();
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
    return (
      !this.leasingFinancialBasicForm.dirty &&
      !this.leasingFinancialCurrencyForm.dirty &&
      !this.leasingFinancialRateForm.dirty
    );
  }
  /**
   * Saves the current forms + table rows into localStorage under
   * "leasingFinancialForm:<mandateId>".
   */

  handleWorkflowAction(event: { actionId: number; comment: string }): void {
    const payload = {
      mandateId: this.mandate.mandateId,
      mandateStatusActionId: event.actionId,
      comment: event.comment,
      isCurrent: true,
    };

    this.mandateFacade.performWorkflowAction(event.actionId, payload);
    this.mandateFacade.workFlowActionSuccess$.subscribe({
      next: () => {
        console.log('Workflow action submitted successfully.');
        this.refreshAllowedActions();
      },
    });
  }

  refreshAllowedActions(): void {
    this.mandateFacade.loadById(this.routeId);
    this.mandateFacade.selected$.subscribe({
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
}
