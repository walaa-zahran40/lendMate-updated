import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './currency-exchange-rates.actions';
import * as Selectors from './currency-exchange-rates.selectors';
import { Observable } from 'rxjs';
import { CurrencyExchangeRate } from './currency-exchange-rate.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class CurrencyExchangeRatesFacade {
  items$: Observable<CurrencyExchangeRate[]> = this.store.select(
    Selectors.selectCurrencyExchangeRates
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectCurrencyExchangeRatesTotal
  );
  history$: Observable<CurrencyExchangeRate[]> = this.store.select(
    Selectors.selectCurrencyExchangeRatesHistory
  );
  current$: Observable<CurrencyExchangeRate | undefined> = this.store.select(
    Selectors.selectCurrentCurrencyExchangeRate
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectCurrencyExchangeRatesLoading
  );
  error$: Observable<any> = this.store.select(
    Selectors.selectCurrencyExchangeRatesError
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadCurrencyExchangeRates());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadCurrencyExchangeRatesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadCurrencyExchangeRate({ id }));
  }
  create(data: Partial<CurrencyExchangeRate>) {
    this.store.dispatch(Actions.createCurrencyExchangeRate({ data }));
  }
  update(id: any, data: Partial<CurrencyExchangeRate>) {
    this.store.dispatch(Actions.updateCurrencyExchangeRate({ id, data }));
  }
  /** NEW: dispatch the by-currencyId loader */
  loadCurrencyExchangeRatesByCurrencyId(currencyId?: number) {
    if (currencyId == null || isNaN(currencyId)) {
      console.error(
        '❌ Facade.loadCurrencyExchangeRatesByCurrencyId called with invalid id:',
        currencyId
      );
      return;
    }
    this.store.dispatch(
      Actions.loadCurrencyExchangeRatesByCurrencyId({ currencyId })
    );
  }

  /** UPDATED: now expects both id & parent currencyId */
  delete(id: number, currencyId: number) {
    this.store.dispatch(Actions.deleteCurrencyExchangeRate({ id, currencyId }));
  }
  loadByCurrencyId(currencyId: number) {
    this.store.dispatch(
      Actions.loadCurrencyExchangeRatesByCurrencyId({ currencyId })
    );
  }
}
