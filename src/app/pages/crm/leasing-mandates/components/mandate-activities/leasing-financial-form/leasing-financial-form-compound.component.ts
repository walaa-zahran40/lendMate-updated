import { Component } from '@angular/core';
import { Calculation } from '../../../../../../shared/interfaces/calculations.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PaymentPeriod } from '../../../../../lookups/store/payment-periods/payment-period.model';
import { PaymentPeriodsFacade } from '../../../../../lookups/store/payment-periods/payment-periods.facade';
import { Store } from '@ngrx/store';
import { loadAll } from '../../../../../lookups/store/payment-periods/payment-periods.actions';
@Component({
  selector: 'app-leasing-financial-form-compound',
  standalone: false,
  templateUrl: './leasing-financial-form-compound.component.html',
  styleUrl: './leasing-financial-form-compound.component.scss',
})
export class LeasingFinancialFormCompoundComponent {
  tableDataInside: Calculation[] = [];
  leasingFinancialBasicForm!: FormGroup;
  leasingFinancialRateForm!: FormGroup;
  leasingFinancialCurrencyForm!: FormGroup;
  readonly colsInside = [
    { field: 'code', header: 'Code' },
    { field: 'paymentNumber', header: 'Payment Number' },
    { field: 'dueDate', header: 'Due Date' },
    { field: 'balanceBefore', header: 'Balance Before' },
    { field: 'balanceAfter', header: 'Balance After' },
    { field: 'insuranceOutcome', header: 'Insurance Outcome' },
    { field: 'principal', header: 'Principal' },
    { field: 'installment', header: 'Installment' },
    { field: 'interest', header: 'Interest' },
    { field: 'nameEN', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
  ];
  paymentPeriods$!: Observable<PaymentPeriod[]>;

  constructor(
    private fb: FormBuilder,
    private paymentPeriodFacade: PaymentPeriodsFacade,
    private store: Store
  ) {}
  ngOnInit() {
    //   this.tableDataInside = [
    //     {
    //       code: 1,
    //       paymentNumber: 1,
    //       dueDate: new Date('01/10/2025'),
    //       balanceBefore: 50000,
    //       balanceAfter: 70000,
    //       insuranceOutcome: 0,
    //       principal: 7948,
    //       installment: 18000,
    //       interest: 7,
    //       nameAR: 'name ar',
    //       nameEN: 'name en',
    //     },
    //     {
    //       code: 1,
    //       paymentNumber: 1,
    //       dueDate: new Date('01/10/2025'),
    //       balanceBefore: 50000,
    //       balanceAfter: 70000,
    //       insuranceOutcome: 0,
    //       principal: 7948,
    //       installment: 18000,
    //       interest: 7,
    //       nameAR: 'name ar',
    //       nameEN: 'name en',
    //     },
    //     {
    //       code: 1,
    //       paymentNumber: 1,
    //       dueDate: new Date('01/10/2025'),
    //       balanceBefore: 50000,
    //       balanceAfter: 70000,
    //       insuranceOutcome: 0,
    //       principal: 7948,
    //       installment: 18000,
    //       interest: 7,
    //       nameAR: 'name ar',
    //       nameEN: 'name en',
    //     },
    //     {
    //       code: 1,
    //       paymentNumber: 1,
    //       dueDate: new Date('01/10/2025'),
    //       balanceBefore: 50000,
    //       balanceAfter: 70000,
    //       insuranceOutcome: 0,
    //       principal: 7948,
    //       installment: 18000,
    //       interest: 7,
    //       nameAR: 'name ar',
    //       nameEN: 'name en',
    //     },
    //     {
    //       code: 1,
    //       paymentNumber: 1,
    //       dueDate: new Date('01/10/2025'),
    //       balanceBefore: 50000,
    //       balanceAfter: 70000,
    //       insuranceOutcome: 0,
    //       principal: 7948,
    //       installment: 18000,
    //       interest: 7,
    //       nameAR: 'name ar',
    //       nameEN: 'name en',
    //     },
    //     {
    //       code: 1,
    //       paymentNumber: 1,
    //       dueDate: new Date('01/10/2025'),
    //       balanceBefore: 50000,
    //       balanceAfter: 70000,
    //       insuranceOutcome: 0,
    //       principal: 7948,
    //       installment: 18000,
    //       interest: 7,
    //       nameAR: 'name ar',
    //       nameEN: 'name en',
    //     },
    //     {
    //       code: 1,
    //       paymentNumber: 1,
    //       dueDate: new Date('01/10/2025'),
    //       balanceBefore: 50000,
    //       balanceAfter: 70000,
    //       insuranceOutcome: 0,
    //       principal: 7948,
    //       installment: 18000,
    //       interest: 7,
    //       nameAR: 'name ar',
    //       nameEN: 'name en',
    //     },
    //     {
    //       code: 1,
    //       paymentNumber: 1,
    //       dueDate: new Date('01/10/2025'),
    //       balanceBefore: 50000,
    //       balanceAfter: 70000,
    //       insuranceOutcome: 0,
    //       principal: 7948,
    //       installment: 18000,
    //       interest: 7,
    //       nameAR: 'name ar',
    //       nameEN: 'name en',
    //     },
    //     {
    //       code: 1,
    //       paymentNumber: 1,
    //       dueDate: new Date('01/10/2025'),
    //       balanceBefore: 50000,
    //       balanceAfter: 70000,
    //       insuranceOutcome: 0,
    //       principal: 7948,
    //       installment: 18000,
    //       interest: 7,
    //       nameAR: 'name ar',
    //       nameEN: 'name en',
    //     },
    //     {
    //       code: 1,
    //       paymentNumber: 1,
    //       dueDate: new Date('01/10/2025'),
    //       balanceBefore: 50000,
    //       balanceAfter: 70000,
    //       insuranceOutcome: 0,
    //       principal: 7948,
    //       installment: 18000,
    //       interest: 7,
    //       nameAR: 'name ar',
    //       nameEN: 'name en',
    //     },
    //   ];
    // }
    //Build Forms
    this.initializeLeasingFinancialBasicForm();
    this.initializeLeasingFinancialRatesForm();
    this.initializeLeasingFinancialCurrencyForm();
    //Setup Listeners
    this.setupFormListeners();
    //Load Dropdowns
    this.store.dispatch(loadAll({}));
    this.paymentPeriods$ = this.paymentPeriodFacade.all$;
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
      manualExchangeRate: [{ value: 0, disabled: true }],
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
    const rvPercent =
      this.leasingFinancialBasicForm.get('rvPercent')!.value || 0;
    const nfa = this.leasingFinancialBasicForm.get('nfa')!.value || 0;
    debugger;
    let calculatedRvAmount = nfa * (rvPercent / 100);
    calculatedRvAmount = Math.round(calculatedRvAmount);

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
}
