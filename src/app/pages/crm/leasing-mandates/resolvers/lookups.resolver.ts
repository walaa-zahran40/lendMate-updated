import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, of, firstValueFrom, take } from 'rxjs';

// Actions (same ones you use)
import { loadAll as loadClients } from '../../../crm/clients/store/_clients/allclients/clients.actions';
import { loadAll as loadLeasingTypes } from '../../../lookups/store/leasing-types/leasing-types.actions';
import { loadAll as loadInsuredBy } from '../../../lookups/store/insured-by/insured-by.actions';
import { loadAll as loadAssetTypes } from '../../../lookups/store/asset-types/asset-types.actions';
import { loadAll as loadFeeTypes } from '../../../lookups/store/fee-types/fee-types.actions';
import { loadAll as loadInterestRateBenchmarks } from '../../../lookups/store/interest-rate-benchmarks/interest-rate-benchmarks.actions';
import { loadAll as loadPaymentTimingTerms } from '../../../lookups/store/payment-timing-terms/payment-timing-terms.actions';
import { loadAll as loadRentStructureTypes } from '../../../lookups/store/rent-structure-types/rent-structure-types.actions';
import { loadAll as loadPaymentMethods } from '../../../lookups/store/payment-methods/payment-methods.actions';
import { loadAll as loadPaymentMonthDays } from '../../../lookups/store/payment-month-days/payment-month-days.actions';
import { loadAll as loadPeriodUnits } from '../../../lookups/store/period-units/period-units.actions';
import { loadAll as loadCurrencies } from '../../../lookups/store/currencies/currencies.actions';
import { loadCurrencyExchangeRates } from '../../../lookups/store/currency-exchange-rates/currency-exchange-rates.actions';
import { PaymentPeriodsFacade } from '../../../lookups/store/payment-periods/payment-periods.facade';
import { CurrenciesFacade } from '../../../lookups/store/currencies/currencies.facade';
import { CurrencyExchangeRatesFacade } from '../../../lookups/store/currency-exchange-rates/currency-exchange-rates.facade';
import { PaymentMethodsFacade } from '../../../lookups/store/payment-methods/payment-methods.facade';
import { RentStructureTypesFacade } from '../../../lookups/store/rent-structure-types/rent-structure-types.facade';
import { PaymentTimingTermsFacade } from '../../../lookups/store/payment-timing-terms/payment-timing-terms.facade';
import { InterestRateBenchMarksFacade } from '../../../lookups/store/interest-rate-benchmarks/interest-rate-benchmarks.facade';
import { PaymentMonthDaysFacade } from '../../../lookups/store/payment-month-days/payment-month-days.facade';
import { GracePeriodUnitsFacade } from '../../../lookups/store/period-units/period-units.facade';
import { LeasingTypesFacade } from '../../../lookups/store/leasing-types/leasing-types.facade';
import { InsuredByFacade } from '../../../lookups/store/insured-by/insured-by.facade';
import { FeeTypesFacade } from '../../../lookups/store/fee-types/fee-types.facade';
import { AssetTypesFacade } from '../../../lookups/store/asset-types/asset-types.facade';
import { ClientsFacade } from '../../../crm/clients/store/_clients/allclients/clients.facade';

// Helper to “fire and take(1)”
async function loadAndWait(obsArr: any[]) {
  await firstValueFrom(combineLatest(obsArr));
}

@Injectable({ providedIn: 'root' })
export class AllLookupsResolver implements Resolve<boolean> {
  constructor(
    private store: Store,
    private clientsFacade: ClientsFacade,
    private leasingTypesFacade: LeasingTypesFacade,
    private insuredByFacade: InsuredByFacade,
    private feeTypesFacade: FeeTypesFacade,
    private assetTypesFacade: AssetTypesFacade,
    private paymentPeriodsFacade: PaymentPeriodsFacade,
    private paymentMethodsFacade: PaymentMethodsFacade,
    private rentStructureTypesFacade: RentStructureTypesFacade,
    private paymentTimingTermsFacade: PaymentTimingTermsFacade,
    private interestRateBenchmarksFacade: InterestRateBenchMarksFacade,
    private paymentMonthDaysFacade: PaymentMonthDaysFacade,
    private gracePeriodUnitsFacade: GracePeriodUnitsFacade,
    private currenciesFacade: CurrenciesFacade,
    private currencyExchangeRatesFacade: CurrencyExchangeRatesFacade
  ) {}

  async resolve(): Promise<boolean> {
    // Dispatch like the component does
    this.store.dispatch(loadClients({}));
    this.store.dispatch(loadLeasingTypes({}));
    this.store.dispatch(loadInsuredBy({}));
    this.store.dispatch(loadAssetTypes({}));
    this.store.dispatch(loadFeeTypes({}));
    this.store.dispatch(loadInterestRateBenchmarks({}));
    this.store.dispatch(loadPaymentTimingTerms({}));
    this.store.dispatch(loadRentStructureTypes({}));
    this.store.dispatch(loadPaymentMethods({}));
    this.store.dispatch(loadPaymentMonthDays({}));
    this.store.dispatch(loadPeriodUnits({}));
    this.store.dispatch(loadCurrencies({}));
    this.store.dispatch(loadCurrencyExchangeRates());
    // also trigger facades that use .loadAll()
    this.paymentPeriodsFacade.loadAll();
    this.currenciesFacade.loadAll();
    this.paymentMethodsFacade.loadAll();
    this.rentStructureTypesFacade.loadAll();
    this.paymentTimingTermsFacade.loadAll();
    this.interestRateBenchmarksFacade.loadAll();
    this.paymentMonthDaysFacade.loadAll();
    this.gracePeriodUnitsFacade.loadAll();
    this.leasingTypesFacade.loadAll();
    this.insuredByFacade.loadAll();
    this.feeTypesFacade.loadAll();
    this.assetTypesFacade.loadAll();
    this.currencyExchangeRatesFacade.loadAll();

    // Wait for a single emission from each stream (avoids hanging on empty lists)
    await loadAndWait([
      this.clientsFacade.all$.pipe(take(1)),
      this.leasingTypesFacade.all$.pipe(take(1)),
      this.insuredByFacade.all$.pipe(take(1)),
      this.feeTypesFacade.all$.pipe(take(1)),
      this.assetTypesFacade.all$.pipe(take(1)),
      this.paymentPeriodsFacade.all$.pipe(take(1)),
      this.paymentMethodsFacade.all$.pipe(take(1)),
      this.rentStructureTypesFacade.all$.pipe(take(1)),
      this.paymentTimingTermsFacade.all$.pipe(take(1)),
      this.interestRateBenchmarksFacade.all$.pipe(take(1)),
      this.paymentMonthDaysFacade.all$.pipe(take(1)),
      this.gracePeriodUnitsFacade.all$.pipe(take(1)),
      this.currenciesFacade.all$.pipe(take(1)),
      this.currencyExchangeRatesFacade.items$.pipe(take(1)),
    ]);

    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class AllLookupsExceptClientsResolver implements Resolve<boolean> {
  constructor(private all: AllLookupsResolver, private store: Store) {}
  async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
    // just reuse AllLookupsResolver; clients list existing won’t hurt,
    // but to be strict, you could skip loadClients() here if you want.
    return this.all.resolve();
  }
}
