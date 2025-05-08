import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './currencies.actions';
import * as Selectors from './currencies.selectors';
import { Observable } from 'rxjs';
import { Currency } from './currency.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class CurrenciesFacade {
  items$: Observable<Currency[]> = this.store.select(
    Selectors.selectCurrencies
  );
  total$: Observable<number> = this.store.select(
    Selectors.selectCurrenciesTotal
  );
  history$: Observable<Currency[]> = this.store.select(
    Selectors.selectCurrenciesHistory
  );
  current$: Observable<Currency | undefined> = this.store.select(
    Selectors.selectCurrentCurrencyy
  );

  loading$: Observable<boolean> = this.store.select(
    Selectors.selectCurrenciesLoading
  );
  error$: Observable<any> = this.store.select(Selectors.selectCurrenciesError);
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(Actions.loadCurrencies());
  }
  loadHistory() {
    this.store.dispatch(Actions.loadCurrenciesHistory());
  }
  loadOne(id: number) {
    this.store.dispatch(Actions.loadCurrency({ id }));
  }
  create(data: Partial<Currency>) {
    this.store.dispatch(Actions.createCurrency({ data }));
  }
  update(id: any, data: Partial<Currency>) {
    this.store.dispatch(Actions.updateCurrency({ id, data }));
  }
  delete(id: number) {
    this.store.dispatch(Actions.deleteCurrency({ id }));
  }
}
