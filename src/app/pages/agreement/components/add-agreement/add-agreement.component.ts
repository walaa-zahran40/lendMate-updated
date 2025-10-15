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
  forkJoin,
  shareReplay,
} from 'rxjs';
import { FinancialForm } from '../../../crm/leasing-mandates/store/financial-form/financial-form.model';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Client } from '../../../crm/clients/store/_clients/allclients/client.model';
import { ClientsFacade } from '../../../crm/clients/store/_clients/allclients/clients.facade';
import { AssetType } from '../../../lookups/store/asset-types/asset-type.model';
import { AssetTypesFacade } from '../../../lookups/store/asset-types/asset-types.facade';
import { CurrenciesFacade } from '../../../lookups/store/currencies/currencies.facade';
import { Currency } from '../../../lookups/store/currencies/currency.model';
import { CurrencyExchangeRate } from '../../../lookups/store/currency-exchange-rates/currency-exchange-rate.model';
import { CurrencyExchangeRatesFacade } from '../../../lookups/store/currency-exchange-rates/currency-exchange-rates.facade';
import { FeeType } from '../../../lookups/store/fee-types/fee-type.model';
import { FeeTypesFacade } from '../../../lookups/store/fee-types/fee-types.facade';
import { InsuredByFacade } from '../../../lookups/store/insured-by/insured-by.facade';
import { InsuredBy } from '../../../lookups/store/insured-by/insured-by.model';
import { InterestRateBenchMark } from '../../../lookups/store/interest-rate-benchmarks/interest-rate-benchmark.model';
import { InterestRateBenchMarksFacade } from '../../../lookups/store/interest-rate-benchmarks/interest-rate-benchmarks.facade';
import { LeasingType } from '../../../lookups/store/leasing-types/leasing-type.model';
import { LeasingTypesFacade } from '../../../lookups/store/leasing-types/leasing-types.facade';
import { PaymentMethod } from '../../../lookups/store/payment-methods/payment-method.model';
import { PaymentMethodsFacade } from '../../../lookups/store/payment-methods/payment-methods.facade';
import { PaymentMonthDay } from '../../../lookups/store/payment-month-days/payment-month-day.model';
import { PaymentMonthDaysFacade } from '../../../lookups/store/payment-month-days/payment-month-days.facade';
import { PaymentPeriod } from '../../../lookups/store/payment-periods/payment-period.model';
import { PaymentPeriodsFacade } from '../../../lookups/store/payment-periods/payment-periods.facade';
import { PaymentTimingTerm } from '../../../lookups/store/payment-timing-terms/payment-timing-term.model';
import { PaymentTimingTermsFacade } from '../../../lookups/store/payment-timing-terms/payment-timing-terms.facade';
import { PeriodUnit } from '../../../lookups/store/period-units/period-unit.model';
import { GracePeriodUnitsFacade } from '../../../lookups/store/period-units/period-units.facade';
import { RentStructureType } from '../../../lookups/store/rent-structure-types/rent-structure-type.model';
import { RentStructureTypesFacade } from '../../../lookups/store/rent-structure-types/rent-structure-types.facade';
import * as AgreementActions from '../../store/agreements/agreements.actions';
import { Branch } from '../../../organizations/store/branches/branch.model';
import { BranchesFacade } from '../../../organizations/store/branches/branches.facade';
import { Portfolio } from '../../../lookups/store/portfolios/portfolio.model';
import { PortfoliosFacade } from '../../../lookups/store/portfolios/portfolios.facade';
import { BusinessSource } from '../../../lookups/store/business-sources/business-source.model';
import { BusinessSourcesFacade } from '../../../lookups/store/business-sources/business-sources.facade';
import { LeasingAgreementsFacade } from '../../store/agreements/agreements.facade';
import { FinancialFormsFacade } from '../../../crm/leasing-mandates/store/financial-form/financial-forms.facade';
import { LeasingAgreement } from '../../store/agreements/agreement.model';
import { selectCalculatedRowsForId } from '../../../crm/leasing-mandates/store/financial-form/financial-forms.selectors';
import { PaymentsRequest } from '../../../crm/leasing-mandates/store/financial-form/payments-request.model';

@Component({
  selector: 'app-add-agreement',
  standalone: false,
  templateUrl: './add-agreement.component.html',
  styleUrl: './add-agreement.component.scss',
})
export class AddAgreementComponent {
  /*Dropdowns*/
  clientNames$!: Observable<Client[]>;
  leasingTypes$!: Observable<LeasingType[]>;
  insuredBy$!: Observable<InsuredBy[]>;
  branches$!: Observable<Branch[]>;
  portfolios$!: Observable<Portfolio[]>;
  businessSources$!: Observable<BusinessSource[]>;
  assetTypes$!: Observable<AssetType[]>;
  feeTypes$!: Observable<FeeType[]>;
  workFlowActionList: any[] = [];
  selectedAction: string = '';
  public agreementId: any = null;
  public leasingAgreementId: any = null;
  raw = this.route.snapshot.paramMap.get('clientId');
  clientId: number | undefined = this.raw ? Number(this.raw) : undefined;
  show = false;
  editShow = false;
  private paymentPeriodsCache: PaymentPeriod[] = [];
  isSubmitting = false;
  parentForm!: FormGroup;
  addAgreementShowMainInformationForm!: FormGroup;
  addAgreementShowAssetTypeForm!: FormGroup;
  addAgreementShowFeeForm!: FormGroup;
  editMode: boolean = false;
  viewOnly: boolean = false;
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
  private suppressRecalc = false;

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
  private currentAgreementId!: number;
  routeId = this.route.snapshot.params['leasingId'];
  agreement!: any;
  private extraCurrencyRates: CurrencyExchangeRate[] = [];
  selectedIds: number[] = [];
  private patchedStep4FromAgreement = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private clientFacade: ClientsFacade,
    private leasingTypeFacade: LeasingTypesFacade,
    private insuredByFacade: InsuredByFacade,
    private assetTypesFacade: AssetTypesFacade,
    private branchesFacade: BranchesFacade,
    private feeTypesFacade: FeeTypesFacade,
    private facade: LeasingAgreementsFacade,
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
    //Build all sub-forms
    this.buildAgreementShowMainForm();
    this.buildAgreementShowAssetTypeForm();
    this.buildAgreementShowFeeForm();
    //Build the three sub-forms
    this.initializeLeasingFinancialBasicForm();
    this.initializeLeasingFinancialRatesForm();
    this.initializeLeasingFinancialCurrencyForm();
    console.log('Basic', this.leasingFinancialBasicForm);
    console.log('Rate', this.leasingFinancialRateForm);
    console.log('Currency', this.leasingFinancialCurrencyForm);
    console.log('main', this.addAgreementShowMainInformationForm);
    console.log('assets', this.addAgreementShowAssetTypeForm);
    console.log('fees', this.addAgreementShowFeeForm);

    //Create the parent form
    this.parentForm = this.fb.group({
      basic: this.addAgreementShowMainInformationForm,
      assets: this.addAgreementShowAssetTypeForm,
      fees: this.addAgreementShowFeeForm,

      financialActivities: this.fb.group({
        basic: this.leasingFinancialBasicForm,
        rates: this.leasingFinancialRateForm,
        currency: this.leasingFinancialCurrencyForm,
      }),
    });

    //Set up value-change listeners, etc.
    this.setupFormListeners();
    console.log('show', this.show);
    if (!this.clientId || (!this.clientId && this.editMode)) {
      console.log("there isn't a client id");
      this.show = true;
    } else {
      console.log('there is a client id');
      this.show = false;
    } // 1) Parse params once
    const params = this.route.snapshot.paramMap;
    const query = this.route.snapshot.queryParamMap;

    // accept either :leasingId or :id
    const leasingIdStr = params.get('leasingId') ?? params.get('id');
    this.leasingAgreementId = leasingIdStr ? +leasingIdStr : undefined;

    // accept either /.../:clientId or none
    const clientIdStr = params.get('clientId');
    this.clientId = clientIdStr ? +clientIdStr : undefined;

    // set flags ASAP (don’t gate behind an ID)
    const mode = query.get('mode');
    this.editMode = mode === 'edit';
    this.viewOnly = mode === 'view';

    // set `show` once, using the flags you just set
    this.show = !this.clientId;

    // ... init dropdowns/forms etc. ...
    // then load by id if present
    if (Number.isFinite(this.leasingAgreementId)) {
      this.facade.loadById(this.leasingAgreementId!);
    }
    // Call this when the button looks disabled

    // subscribe once to selected and patch when it matches
    this.facade.selected$
      .pipe(
        filter(
          (m) =>
            !!m &&
            (!this.leasingAgreementId || m.id === this.leasingAgreementId)
        ),
        take(1)
      )
      .subscribe((agreement: any) => {
        this.patchAgreement(this.normalizeAgreement(agreement));
      });
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
    this.assetTypesFacade.loadAll();
    this.assetTypes$ = this.assetTypesFacade.all$;
    this.feeTypesFacade.loadAll();
    // when you define feeTypes$
    this.feeTypes$ = this.feeTypesFacade.all$.pipe(
      map((list) => (list ?? []).map((ft) => ({ ...ft, id: +ft.id }))),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.paymentPeriodsFacade.loadAll();
    this.paymentPeriods$ = this.paymentPeriodsFacade.all$;
    this.paymentPeriods$
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => (this.paymentPeriodsCache = list ?? []));
    this.currenciesFacade.loadAll();
    this.currencies$ = this.currenciesFacade.all$;
    this.currencyExchangeRatesFacade.loadAll();
    this.currencyExchangeRates$ = this.currencyExchangeRatesFacade.items$;
    this.interestRateBenchmarksFacade.loadAll();
    this.interestRateBenchMarks$ = this.interestRateBenchmarksFacade.all$;
    this.paymentTimingTermsFacade.loadAll();
    this.paymentTimingTerms$ = this.paymentTimingTermsFacade.all$;
    this.rentStructureTypesFacade.loadAll();
    this.rentStructures$ = this.rentStructureTypesFacade.all$;
    this.paymentMethodsFacade.loadAll();
    this.paymentMethods$ = this.paymentMethodsFacade.all$;
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

            // now fetch afresh
            this.facade.loadById(leasingId);
          }),
          switchMap(({ leasingId }) =>
            this.facade.selected$.pipe(
              filter((m) => !!m && m.id === leasingId),
              take(1)
            )
          )
        )
        .subscribe((agreement: any) =>
          this.patchAgreement(this.normalizeAgreement(agreement))
        );

      const idParam = this.route.snapshot.paramMap.get('leasingId');
      if (!idParam) {
        return;
      }
      this.leasingAgreementId = +idParam;
    } else {
      combineLatest({
        params: this.route.paramMap,
        query: this.route.queryParamMap,
      })
        .pipe(
          map(({ params, query }) => ({
            id: +(params.get('leasingId') ?? params.get('id') ?? NaN),
            clientId: +(params.get('clientId') ?? NaN),
            mode: query.get('mode'),
          })),
          tap(({ mode }) => {
            this.editMode = mode === 'edit';
            this.viewOnly = mode === 'view';
            this.show = isNaN(this.clientId!);
          }),
          filter(({ id }) => Number.isFinite(id)), // only gate loading by id
          tap(({ id, clientId }) => {
            if (Number.isFinite(id)) this.facade.loadById(id);
            if (Number.isFinite(clientId)) this.facade.loadByClient(clientId);
          }),
          switchMap(({ id }) =>
            this.facade.selected$.pipe(
              filter((m) => !!m && m.id === id),
              take(1)
            )
          )
        )

        .subscribe((agreement: any) =>
          this.patchAgreement(this.normalizeAgreement(agreement))
        );

      const idParam = this.route.snapshot.paramMap.get('leasingId');
      if (!idParam) {
        return;
      }
      this.leasingAgreementId = +idParam;
    }

    //Dispatch all lookups

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

    //Load the financial form for this agreement

    // const leasingId = Number(this.route.snapshot.paramMap.get('leasingId'));
    // if (Number.isFinite(leasingId)) {
    //   this.financialFormsFacade.loadByLeasingAgreementId(leasingId);
    // }

    this.facade.selected$
      .pipe(takeUntil(this.destroy$))
      .subscribe((form: LeasingAgreement | null) => {
        if (form === undefined) {
          return;
        }
        this.agreement = form;
        this.workFlowActionList =
          this.agreement.allowedAgreementWorkFlowActions?.map(
            (action: { id: any; name: any }) => ({
              id: action.id,
              label: action.name,
              icon: 'pi pi-times',
            })
          );
        this.selectedAction =
          this.agreement.agreementCurrentWorkFlowAction.name ?? '';
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
        if (this.patchedStep4FromAgreement) {
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
      .select(selectCalculatedRowsForId(this.currentAgreementId))
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

    // 3) Also log any error$ from agreements slice so we see failures
    this.facade.error$.pipe(takeUntil(this.destroy$)).subscribe((err) => {
      if (err) {
        console.error('[Agreements Error] from store slice:', err);
        this.isSubmitting = false;
      }
    });
    this.actions$
      .pipe(
        takeUntil(this.destroy$),
        ofType(
          AgreementActions.LeasingAgreementsActions.createSuccess,
          AgreementActions.LeasingAgreementsActions.updateSuccess // optional
        )
      )
      .subscribe(() => {
        this.isSubmitting = false;
        this.navigateToList(); // ✅ go back to view page
      });

    this.actions$
      .pipe(
        takeUntil(this.destroy$),
        ofType(
          AgreementActions.LeasingAgreementsActions.createFailure,
          AgreementActions.LeasingAgreementsActions.updateFailure
        )
      )
      .subscribe((err) => {
        console.error('[Save] failed:', err);
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
        return this.addAgreementShowAssetTypeForm;
      case 3:
        return this.addAgreementShowFeeForm;
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

  private patchAgreement(m: LeasingAgreement) {
    this.suppressRecalc = true;
    this.leasingAgreementId = (m as any)?.id ?? this.leasingAgreementId;
    console.log('mmmmm', m);
    this.addAgreementShowMainInformationForm.patchValue(
      {
        clientId: this.toNum(
          this.clientId ?? m.clientId ?? (m as any)?.clientView?.clientId
        ),
        leasingTypeId: this.toNum((m as any)?.leasingTypeId),
        insuredById: this.toNum((m as any)?.insuredById),
        branchId: this.toNum((m as any)?.branchId),
        portfolioId: this.toNum((m as any)?.portfolioId),
        businessSourceId: this.toNum((m as any)?.businessSourceId),
        date: this.toDateOrNull(m.date),
        endDate: this.toDateOrNull(m.endDate),
        deliveryNumber: m.deliveryNumber,
        notes: m.notes,
      },
      { emitEvent: false }
    );

    // === STEP 2: Agreement Assets (FormArray) ===
    {
      const assetsFa = this.addAgreementShowAssetTypeForm.get(
        'agreementAssetTypes'
      ) as FormArray;

      // Accept a few possible shapes from the API:
      const sourceAssets =
        (m as any)?.agreementAssets ??
        (m as any)?.agreementAssetTypes ??
        // fallback: build one row from flat fields if present
        ((m as any)?.assetTypeId ||
        (m as any)?.assetDescription ||
        (m as any)?.assetDescriptionAR
          ? [
              {
                id: (m as any)?.assetId ?? null,
                assetTypeId: (m as any)?.assetTypeId,
                assetDescription: (m as any)?.assetDescription,
                assetDescriptionAR: (m as any)?.assetDescriptionAR,
              },
            ]
          : []);

      assetsFa.clear();
      if (Array.isArray(sourceAssets) && sourceAssets.length) {
        for (const a of sourceAssets) {
          const fg = this.createAssetTypeGroup();
          fg.patchValue(
            {
              id: a?.id ?? null,
              assetTypeId: this.toNum(a?.assetTypeId ?? a?.assetType?.id),
              assetDescription: a?.assetDescription ?? null,
              assetDescriptionAR: a?.assetDescriptionAR ?? null,
            },
            { emitEvent: false }
          );

          assetsFa.push(fg);
        }
      } else {
        assetsFa.push(this.createAssetTypeGroup()); // keep one empty row for UI
      }
    }

    // === STEP 3: Fees (FormArray) ===
    {
      const feesFa = this.addAgreementShowFeeForm.get(
        'agreementFees'
      ) as FormArray;

      const sourceFees =
        (m as any)?.agreementFees ??
        (m as any)?.fees ??
        ((m as any)?.feeTypeId ||
        (m as any)?.actualAmount ||
        (m as any)?.actualPercentage
          ? [
              {
                id: (m as any)?.feeId ?? null,
                feeTypeId: (m as any)?.feeTypeId,
                actualAmount: (m as any)?.actualAmount,
                actualPercentage: (m as any)?.actualPercentage,
              },
            ]
          : []);

      console.log('[FEES:patch] sourceFees', sourceFees);
      this.logFeesState('before-clear');

      feesFa.clear();
      if (Array.isArray(sourceFees) && sourceFees.length) {
        sourceFees.forEach((f) => {
          const fg = this.createFeeGroup();
          const feeTypeIdRaw = f?.feeTypeId ?? f?.feeType?.id ?? null; // do NOT fall back to f.id

          fg.patchValue(
            {
              id: f?.id ?? null,
              feeTypeId: this.toNum(feeTypeIdRaw),
              actualAmount: f?.actualAmount ?? null,
              actualPercentage: f?.actualPercentage ?? null,
            },
            { emitEvent: false }
          );
          feesFa.push(fg);
        });
      } else {
        feesFa.push(this.createFeeGroup());
      }
      this.logFeesState('after-patch');

      // 👇 ensure selection sticks even if options arrive later
      this.reapplyFeeTypeSelectionsOnceOptionsArrive();
      this.feeTypes$?.pipe(take(1)).subscribe((opts) => {
        const v = (
          this.addAgreementShowFeeForm.get('agreementFees') as FormArray
        )
          .at(0)
          ?.get('feeTypeId')?.value;
        console.log(
          '[FEES:sanity] first feeTypeId',
          v,
          typeof v,
          'first option id',
          opts?.[0]?.id,
          typeof opts?.[0]?.id
        );
      });
    }

    const manual = !!m.isManuaExchangeRate;
    const manualCtrl = this.leasingFinancialCurrencyForm.get(
      'manualSetExchangeRate'
    );
    if (manual) manualCtrl?.enable({ emitEvent: false });
    else manualCtrl?.disable({ emitEvent: false });

    // ===== STEP 4: Patch from agreementPaymentSettings and agreement/leasingAgreement =====
    const settings = Array.isArray((m as any)?.agreementPaymentSettings)
      ? (m as any).agreementPaymentSettings[0]
      : null;

    const leasingAgreement =
      (m as any)?.leasingAgreement ??
      settings?.agreement?.leasingAgreement ??
      null; // tolerate shapes
    const agreementNode =
      (m as any)?.agreement ?? leasingAgreement?.agreement ?? (m as any);

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
          // from agreement or leasingAgreement nodes:
          interestRateBenchmarkId:
            agreementNode?.interestRateBenchmarkId ?? null,
          paymentTimingTermId: m.paymentTimingTermId ?? null,
          rentStructureTypeId: m.rentStructureTypeId ?? null,
          referenceRent: m.rent ?? null,
          rvPercent: m.rvPercent ?? null,
          rvAmount: m.rvAmount ?? null,
          isRentInArrear: m.isRentInArrear,
          isFixedContractEnd: m.isFixedContractEnd,
          isFixedRent: m.isFixedRent,
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
          paymentPeriodId: this.toNum(settings?.paymentPeriodId),
          gracePeriodInDays: this.toNum(
            agreementNode?.gracePeriod ?? (m as any)?.gracePeriod
          ),
          interestRate: m.interestRate,
          insuranceRate: m.insuranceRate,
          tenor: m.tenor,
        },
        { emitEvent: false }
      );

      this.leasingFinancialCurrencyForm.patchValue(
        {
          currencyId: this.toNum(settings?.currencyExchangeRate?.currencyId),
          currencyExchangeRateId: this.toNum(settings?.currencyExchangeRateId),
          interestRateBenchmarkId: this.toNum(
            agreementNode?.interestRateBenchmarkId
          ),
          paymentTimingTermId: this.toNum(m.paymentTimingTermId),
          rentStructureTypeId: this.toNum(m.rentStructureTypeId),
          paymentMethodId: this.toNum(settings?.paymentMethodId),
          paymentMonthDayID: this.toNum(settings?.paymentMonthDayId),
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
          firstBookingDate: (m as any)?.firstBookingDate
            ? new Date((m as any)?.firstBookingDate)
            : null,
          isRentInArrear: (m as any)?.isRentInArrear ?? null,
          isFixedContractEnd: (m as any)?.isFixedContractEnd ?? null,
          isFixedRent: (m as any)?.isFixedRent ?? null,
        },
        { emitEvent: false }
      );
      this.patchedStep4FromAgreement = true;

      // recompute any derived field (periodInterestRate) after patching
      this.calculatePeriodInterestRate();
      this.suppressRecalc = false;

      this.markAllPristine();
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
    this.workFlowActionList = (m.allowedAgreementWorkFlowActions ?? []).map(
      (a: any) => ({
        id: a.id,
        label: a.name,
        icon: 'pi pi-times',
      })
    );
    this.selectedAction =
      (m as any)?.agreementCurrentWorkFlowAction?.name ?? '';
    this.applyViewMode();
  }
  private toDateOrNull(v: any): Date | null {
    if (!v) return null;
    if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  }
  private logFeesState(tag: string) {
    const fa = this.addAgreementShowFeeForm.get('agreementFees') as FormArray;
    const rows =
      fa?.controls?.map((g, i) => {
        const v = g.get('feeTypeId')?.value;
        return {
          index: i,
          feeTypeId: v,
          feeTypeIdType: typeof v,
          actualAmount: g.get('actualAmount')?.value,
          actualPercentage: g.get('actualPercentage')?.value,
        };
      }) ?? [];
    console.log(`[FEES:${tag}] formArray length=${fa?.length ?? 0}`, rows);

    this.feeTypes$?.pipe(take(1)).subscribe((opts) => {
      console.log(`[FEES:${tag}] options (len=${opts?.length ?? 0})`, opts);
      rows.forEach((r) => {
        const match = opts?.find((o) => +o.id === +r.feeTypeId);
        console.log(
          `[FEES:${tag}] row#${r.index} value=${r.feeTypeId} (${r.feeTypeIdType}) -> match?`,
          !!match,
          match
        );
      });
    });
  }

  /** Force the select to re-evaluate after options exist, with logs */
  private reapplyFeeTypeSelectionsOnceOptionsArrive() {
    this.feeTypes$?.pipe(take(1)).subscribe((opts) => {
      console.log('[FEES:reapply] options arrived len=', opts?.length ?? 0);
      const fa = this.addAgreementShowFeeForm.get('agreementFees') as FormArray;
      fa.controls.forEach((g, i) => {
        const ctrl = g.get('feeTypeId')!;
        const before = ctrl.value;
        ctrl.setValue(before != null ? +before : null, { emitEvent: false });
        console.log(
          `[FEES:reapply] row#${i} rewrite ${before}(${typeof before}) ->`,
          ctrl.value,
          typeof ctrl.value
        );
      });

      // log immediately after
      this.logFeesState('after-reapply');

      // and once more on the next microtask (lets CD flush)
      queueMicrotask(() => this.logFeesState('after-reapply-microtask'));
    });
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

  private normalizeAgreement(raw: any): LeasingAgreement & {
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
      agreementId: this.agreementId,
      agreementStatusActionId: event.actionId,
      comment: event.comment,
      isCurrent: true,
    };
  }

  buildAgreementShowMainForm(): void {
    this.addAgreementShowMainInformationForm = this.fb.group(
      {
        id: [null],
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
    const toDate = (v: any): Date | null => {
      if (!v) return null;
      if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
      const d = new Date(v);
      return isNaN(d.getTime()) ? null : d;
    };

    return (group: AbstractControl): ValidationErrors | null => {
      const g = group as FormGroup;
      const start = toDate(g.get(startKey)?.value);
      const end = toDate(g.get(endKey)?.value);

      // Don’t block the form here; “required” validators handle empties/invalids
      if (!start || !end) {
        // clear our specific error if it exists
        const endCtrl = g.get(endKey)!;
        if (endCtrl.hasError('endBeforeStart')) {
          const { endBeforeStart, ...rest } = endCtrl.errors || {};
          endCtrl.setErrors(Object.keys(rest).length ? rest : null);
        }
        return null;
      }

      // compare as date-only
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
      const endCtrl = g.get(endKey)!;

      if (!isValid) {
        endCtrl.setErrors({ ...(endCtrl.errors || {}), endBeforeStart: true });
      } else if (endCtrl.hasError('endBeforeStart')) {
        const { endBeforeStart, ...rest } = endCtrl.errors || {};
        endCtrl.setErrors(Object.keys(rest).length ? rest : null);
      }

      return null;
    };
  }

  buildAgreementShowAssetTypeForm(): void {
    this.addAgreementShowAssetTypeForm = this.fb.group({
      agreementAssetTypes: this.fb.array([this.createAssetTypeGroup()]),
    });
  }
  buildAgreementShowFeeForm(): void {
    this.addAgreementShowFeeForm = this.fb.group({
      agreementFees: this.fb.array([this.createFeeGroup()]),
    });
  }
  createAssetTypeGroup(): FormGroup {
    const fg = this.fb.group({
      id: [null],
      assetTypeId: ['', Validators.required],
      assetDescription: [null, Validators.required],
      assetDescriptionAR: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\u0600-\u06FF\s0-9\u0660-\u0669]+$/),
        ],
      ],
    });

    // If the step or parent is disabled, keep the new group disabled
    if (
      this.viewOnly ||
      this.addAgreementShowAssetTypeForm?.disabled ||
      this.parentForm?.disabled
    ) {
      fg.disable({ emitEvent: false });
    }
    return fg;
  }

  createFeeGroup(): FormGroup {
    const fg = this.fb.group({
      id: [null],
      feeTypeId: [null, Validators.required],
      actualAmount: [null, Validators.required],
      actualPercentage: [null, Validators.required],
    });

    if (
      this.viewOnly ||
      this.addAgreementShowFeeForm?.disabled ||
      this.parentForm?.disabled
    ) {
      fg.disable({ emitEvent: false });
    }
    return fg;
  }

  addAssetType() {
    if (this.viewOnly) return; // 👈 no-op in view mode
    this.agreementAssetTypes?.push(this.createAssetTypeGroup());
  }

  removeAssetType(i: number) {
    console.log('Removing Asset Type at index', i);
    if (this.agreementAssetTypes.length > 1) {
      this.agreementAssetTypes.removeAt(i);
    }
  }

  get agreementAssetTypes(): FormArray {
    return this.addAgreementShowAssetTypeForm.get(
      'agreementAssetTypes'
    ) as FormArray;
  }

  get assetsForm(): FormGroup {
    // this never returns null at runtime, so we assert with `!` then cast
    return this.parentForm.get('assets')! as FormGroup;
  }

  get basicForm(): FormGroup {
    return this.parentForm?.get('basic')! as FormGroup;
  }
  get agreementFees(): FormArray {
    return this.addAgreementShowFeeForm.get('agreementFees') as FormArray;
  }
  addFee() {
    if (this.viewOnly) return; // 👈 no-op in view mode
    this.agreementFees?.push(this.createFeeGroup());
  }

  removeFee(i: number) {
    console.log('Removing agreement Fees at index', i);
    if (this.agreementFees.length > 1) {
      this.agreementFees.removeAt(i);
    }
  }

  private logStepStatuses(): void {
    const log = (label: string, g: FormGroup) =>
      console.log(
        `${label} -> touched=${g.touched}, dirty=${g.dirty}, valid=${g.valid}, status=${g.status}`,
        g.errors
      );

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
      this.router.navigate(['/agreement/view-agreements']);
    } else {
      this.router.navigate([`/agreement/view-agreements/${this.clientId}`]);
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
    const safeSet = (ctrl: AbstractControl | null, value: any) => {
      if (!ctrl) return;
      this.suppressRecalc = true;
      ctrl.setValue(value, { emitEvent: false });
      this.suppressRecalc = false;
    };
    // Basic Finance Information Listeners
    this.leasingFinancialBasicForm
      .get('assetCost')
      ?.valueChanges.subscribe(() => {
        if (this.suppressRecalc) return;
        console.log('AssetCost changed.');
        this.recalculateAndValidateFinancialFields();
        this.updateNfaAndCalculations();
        this.calculateReservePaymentAmount();
      });

    this.leasingFinancialBasicForm
      .get('downPayment')
      ?.valueChanges.subscribe(() => {
        if (this.suppressRecalc) return;
        console.log('DownPayment changed.');
        this.updateNfaAndCalculations();
        this.calculateReservePaymentAmount();
      });

    // RV Listeners
    this.leasingFinancialCurrencyForm
      .get('rvAmount')
      ?.valueChanges.subscribe(() => {
        if (this.suppressRecalc) return;
        console.log('RVAmount changed.');
        this.updateRvPercent();
        this.updateProvisionPercent();
        this.updateProvisionAmount();
      });

    this.leasingFinancialCurrencyForm
      .get('rvPercent')
      ?.valueChanges.subscribe(() => {
        if (this.suppressRecalc) return;
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
        if (this.suppressRecalc) return;
        console.log('ProvisionAmount changed.');
        this.updateProvisionPercent();
      });

    this.leasingFinancialCurrencyForm
      .get('provisionPercent')
      ?.valueChanges.subscribe(() => {
        if (this.suppressRecalc) return;
        console.log('ProvisionPercent changed.');
        this.recalculateAndValidateFinancialFields();
        this.updateProvisionAmount();
      });

    // Currency and Manual Exchange Rate Listeners
    this.leasingFinancialCurrencyForm
      .get('isManuaExchangeRate')
      ?.valueChanges.subscribe((isChecked: boolean) => {
        if (this.suppressRecalc) return;
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
        if (this.suppressRecalc) return;
        console.log('Rent changed.');
        this.calculateReservePaymentAmount();
      });

    this.leasingFinancialRateForm
      .get('insuranceRate')
      ?.valueChanges.subscribe(() => {
        if (this.suppressRecalc) return;
        this.calculateReservePaymentAmount();
      });
    this.leasingFinancialRateForm
      .get('interestRate')
      ?.valueChanges.subscribe(() => {
        if (this.suppressRecalc) return;
        console.log('interestRate changed.');
        this.calculatePeriodInterestRate();
      });
    this.leasingFinancialRateForm.get('tenor')?.valueChanges.subscribe(() => {
      if (this.suppressRecalc) return;
      console.log('tenor changed.');
      this.calculateReservePaymentAmount();
    });

    this.leasingFinancialCurrencyForm
      .get('reservePaymentAmount')
      ?.valueChanges.subscribe(() => {
        if (this.suppressRecalc) return;
        console.log('ReservePaymentAmount changed.');
        this.calculateReservePaymentCount();
      });

    this.leasingFinancialCurrencyForm
      .get('reservePaymentCount')
      ?.valueChanges.subscribe(() => {
        if (this.suppressRecalc) return;
        console.log('ReservePaymentCount changed.');
        this.calculateReservePaymentAmount();
      });

    this.leasingFinancialRateForm
      .get('paymentPeriodId')
      ?.valueChanges.subscribe(() => {
        if (this.suppressRecalc) return;
        console.log('paymentPeriodId');
        this.calculateReservePaymentAmount();
        this.calculateReservePaymentCount();
      });

    this.leasingFinancialBasicForm
      .get('percentOfFinance')
      ?.valueChanges.subscribe(() => {
        if (this.suppressRecalc) return;
        this.recalculateAndValidateFinancialFields();
        this.updateNfaAndCalculations();
        this.calculateReservePaymentAmount();
      });

    // NFA Dependencies
    this.leasingFinancialBasicForm.get('nfa')?.valueChanges.subscribe(() => {
      if (this.suppressRecalc) return;
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
    const assets = this.addAgreementShowAssetTypeForm.getRawValue();
    const fees = this.addAgreementShowFeeForm.getRawValue();
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
      date: basic.date,
      clientId: resolvedClientId,
      leasingTypeId: idOf(basic.leasingTypeId),
      endDate: basic.endDate,
      notes: basic.notes,
      branchId: basic.branchId,
      portfolioId: basic.portfolioId,
      businessSourceId: basic.businessSourceId,
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
      deliveryNumber: basic.deliveryNumber,
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

      firstBookingDate: finBasic.firstBookingDate,
      years: finBasic.years,
      rent: finCurr.referenceRent,
      isRentInArrear: basic.isRentInArrear,
      isFixedContractEnd: basic.isFixedContractEnd,
      isFixedRent: basic.isFixedRent,

      agreementAssets: (assets.agreementAssetTypes ?? []).map((a: any) => ({
        // include id if editing existing row
        id: a.id ?? undefined,
        assetTypeId: idOf(a.assetTypeId),
        assetDescription: a.assetDescription,
        assetDescriptionAR: a.assetDescriptionAR,
      })),
      agreementFees: (fees.agreementFees ?? []).map((f: any) => ({
        id: f.id ?? undefined,
        feeTypeId: idOf(f.feeTypeId),
        actualAmount: f.actualAmount,
        actualPercentage: f.actualPercentage,
      })),
    };

    // === IMPORTANT: add IDs for update ===
    const leasingAgreementIdFromRoute = Number(
      this.route.snapshot.paramMap.get('id')
    );
    const leasingAgreementId = Number.isFinite(leasingAgreementIdFromRoute)
      ? leasingAgreementIdFromRoute
      : this.leasingAgreementId;

    if (this.editMode && Number.isFinite(leasingAgreementId)) {
      payload.id = leasingAgreementId; // leasing agreement id in the body
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

    try {
      const payload = this.buildCreatePayload();
      console.log('[Submit] Payload →', payload);
      if (this.editMode) {
        const leaseId = +(
          this.route.snapshot.paramMap.get('leasingId') ??
          this.route.snapshot.paramMap.get('id') ??
          NaN
        );

        if (!Number.isFinite(leaseId)) {
          console.error('[Submit] Missing leasing id in route params');
          this.isSubmitting = false;
          return;
        }
        this.facade.update(leaseId, payload);
      } else {
        this.facade.create(payload);
      }
    } catch (err) {
      console.error('[Submit] build payload failed:', err);
      this.isSubmitting = false;
    }
  }

  private buildListCommands(): (string | number)[] {
    const base = '/crm/leasing-agreements/view-agreements';
    const id = this.clientId; // already parsed with '+', may be NaN

    // If clientId is missing/NaN → navigate to the generic list
    if (typeof id !== 'number' || !Number.isFinite(id)) {
      return [base];
    }

    // Otherwise route to the client-scoped list
    return [base, id];
  }
  private navigateToList = () => {
    const cmds = this.buildListCommands(); // ['/crm/leasing-agreements/view-agreements', clientId?]

    this.allowLeaveAfterSave = true; // ✅ lets the canDeactivate guard pass
    this.markAllPristine();

    // Optional: refresh list for the destination page
    if (typeof this.clientId === 'number' && Number.isFinite(this.clientId)) {
      this.facade.loadByClient(this.clientId);
    } else {
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
      firstBookingDate: [null, Validators.required],
      isRentInArrear: [true],
      isFixedContractEnd: [true],
      isFixedRent: [true],
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
    });
  }
  private initializeLeasingFinancialCurrencyForm() {
    this.leasingFinancialCurrencyForm = this.fb.group({
      currencyId: [null, Validators.required],
      currencyExchangeRateId: [null, Validators.required],
      isManuaExchangeRate: [false],
      manualSetExchangeRate: [{ value: null, disabled: true }],
      referenceRent: [null, Validators.required],
      rvPercent: [null],
      rvAmount: [null],
      reservePaymentCount: [null],
      reservePaymentAmount: [null],
      provisionPercent: [null],
      provisionAmount: [null],
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
      // mark only calc-related fields as touched (keeps UI sane)
      [
        this.leasingFinancialBasicForm,
        this.leasingFinancialCurrencyForm,
        this.leasingFinancialRateForm,
      ].forEach((form) =>
        Object.keys(form.controls).forEach((c) =>
          form.get(c)?.markAsTouched({ onlySelf: true })
        )
      );

      console.group('[Calculate] Form is invalid');

      console.log('— Calc-only invalid summary —');
      console.table(this.debugInvalidForCalc());

      console.log('— Full tree (basic) —');
      this.logInvalidControls(this.leasingFinancialBasicForm, 'basic');

      console.log('— Full tree (rates) —');
      this.logInvalidControls(this.leasingFinancialRateForm, 'rates');

      console.log('— Full tree (currency) —');
      this.logInvalidControls(this.leasingFinancialCurrencyForm, 'currency');

      console.groupEnd();
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
      firstBookingDate: b.firstBookingDate,
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
    rent?: number;
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
  get sumOfRent(): any {
    return this.filteredFinancialForms.reduce(
      (acc, row) => acc + (row.rent || 0),
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
      this.addAgreementShowAssetTypeForm.dirty ||
      this.addAgreementShowFeeForm.dirty;

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

  private setWorkFlowActions(agreement?: LeasingAgreement | null): void {
    const list = [...(agreement?.allowedAgreementWorkFlowActions ?? [])];
    this.workFlowActionList = list.map((a) => ({
      id: a.id,
      label: a.name,
      icon: 'pi pi-times',
    }));
  }
  refreshAllowedActions(): void {
    const id = this.leasingAgreementId ?? this.routeId;
    if (!id) {
      console.warn('refreshAllowedActions: no agreement id available');
      return;
    }

    this.facade.loadById(id);
    this.facade.selected$.pipe(take(1)).subscribe({
      next: (agreement) => this.setWorkFlowActions(agreement),
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
    mark(this.addAgreementShowAssetTypeForm);
    mark(this.addAgreementShowFeeForm);
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
  get canCalculate(): boolean {
    const b = this.leasingFinancialBasicForm;
    const r = this.leasingFinancialRateForm;
    const c = this.leasingFinancialCurrencyForm;

    // must-have inputs for calc
    const inputsValid =
      b.get('assetCost')?.valid &&
      b.get('downPayment')?.valid && // or percentOfFinance, depending on your rule
      b.get('nfa')?.valid &&
      r.get('interestRate')?.valid &&
      r.get('insuranceRate')?.valid &&
      r.get('tenor')?.valid &&
      r.get('paymentPeriodId')?.valid &&
      r.get('gracePeriodInDays')?.valid &&
      c.get('referenceRent')?.valid &&
      c.get('paymentTimingTermId')?.valid;

    // currency selection requirements
    const currencyValid =
      c.get('currencyId')?.valid &&
      c.get('currencyExchangeRateId')?.valid &&
      // when manual is checked, the textbox must have a value
      (!c.get('isManuaExchangeRate')?.value ||
        !!c.get('manualSetExchangeRate')?.value);

    return !!inputsValid && !!currencyValid;
  }
  private toNum(v: any): number | null {
    if (v === null || v === undefined) return null;
    const n = +v;
    return Number.isFinite(n) ? n : null;
  }
  get canSubmit(): any {
    return (
      this.addAgreementShowMainInformationForm.valid &&
      this.addAgreementShowAssetTypeForm.valid &&
      this.addAgreementShowFeeForm.valid &&
      this.leasingFinancialBasicForm.valid &&
      this.leasingFinancialRateForm.valid &&
      // currency *inputs* only
      this.leasingFinancialCurrencyForm.get('currencyId')?.valid &&
      this.leasingFinancialCurrencyForm.get('currencyExchangeRateId')?.valid &&
      this.leasingFinancialCurrencyForm.get('referenceRent')?.valid &&
      this.leasingFinancialCurrencyForm.get('interestRateBenchmarkId')?.valid &&
      this.leasingFinancialCurrencyForm.get('paymentTimingTermId')?.valid &&
      this.leasingFinancialCurrencyForm.get('rentStructureTypeId')?.valid &&
      this.leasingFinancialCurrencyForm.get('paymentMethodId')?.valid &&
      this.leasingFinancialCurrencyForm.get('paymentMonthDayID')?.valid &&
      !this.isSubmitting
    );
  } /** Recursively logs invalid controls with full path + errors */
  private logInvalidControls(
    ctrl: AbstractControl,
    path: string = 'form'
  ): void {
    const print = (p: string, c: AbstractControl) => {
      if (c.invalid) {
        console.warn('[INVALID]', {
          path: p,
          value: (c as any).value,
          errors: c.errors,
          touched: c.touched,
          dirty: c.dirty,
          status: c.status,
        });
      }
    };

    if (ctrl instanceof FormGroup) {
      print(path, ctrl);
      Object.keys(ctrl.controls).forEach((key) =>
        this.logInvalidControls(ctrl.controls[key], `${path}.${key}`)
      );
    } else if (ctrl instanceof FormArray) {
      print(path, ctrl);
      ctrl.controls.forEach((child, i) =>
        this.logInvalidControls(child, `${path}[${i}]`)
      );
    } else {
      print(path, ctrl);
    }
  }

  /** Compact table of calc-only fields (optional) */
  private debugInvalidForCalc(): any {
    const pick = (fg: FormGroup, keys: string[]) =>
      keys
        .map((k) => ({ k, c: fg.get(k) }))
        .filter((x) => x.c && x.c.invalid)
        .map((x) => ({
          control: x.k,
          value: x.c!.value,
          errors: x.c!.errors,
          touched: x.c!.touched,
          dirty: x.c!.dirty,
        }));

    return {
      basic: pick(this.leasingFinancialBasicForm, [
        'assetCost',
        'downPayment',
        'nfa',
      ]),
      rate: pick(this.leasingFinancialRateForm, [
        'interestRate',
        'insuranceRate',
        'tenor',
        'paymentPeriodId',
        'gracePeriodInDays',
      ]),
      currency: pick(this.leasingFinancialCurrencyForm, [
        'currencyId',
        'currencyExchangeRateId',
        'referenceRent',
        'paymentTimingTermId',
        ...(this.leasingFinancialCurrencyForm.get('isManuaExchangeRate')?.value
          ? ['manualSetExchangeRate']
          : []),
      ]),
    };
  }
  private applyViewMode() {
    if (this.viewOnly) this.disableAllForms();
    else this.enableAllForms();
  }

  /** Disable the entire parent tree + any special cases */
  private disableAllForms() {
    if (!this.parentForm) return;
    // Disable parent disables all descendants currently attached
    this.parentForm.disable({ emitEvent: false });
    // Keep your derived/always-disabled fields disabled explicitly (idempotent)
    this.leasingFinancialRateForm
      ?.get('periodInterestRate')
      ?.disable({ emitEvent: false });

    // Prevent listeners from toggling things in view mode
    this.suppressRecalc = true;
  }

  /** Re-enable for edit mode, then re-apply fields that should stay disabled */
  private enableAllForms() {
    if (!this.parentForm) return;
    this.parentForm.enable({ emitEvent: false });

    // These should remain disabled in edit mode
    this.leasingFinancialRateForm
      ?.get('periodInterestRate')
      ?.disable({ emitEvent: false });

    // Manual rate textbox follows the checkbox
    const manual = !!this.leasingFinancialCurrencyForm?.get(
      'isManuaExchangeRate'
    )?.value;
    const manualCtrl = this.leasingFinancialCurrencyForm?.get(
      'manualSetExchangeRate'
    );
    if (manual) manualCtrl?.enable({ emitEvent: false });
    else manualCtrl?.disable({ emitEvent: false });

    this.suppressRecalc = false;
  }
}
