import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './payment-periods.actions';
import * as Selectors from './payment-periods.selectors';
import { PaymentPeriod } from './payment-period.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class PaymentPeriodsFacade {
  all$ = this.store.select(Selectors.selectAllPaymentPeriods);
  loading$ = this.store.select(Selectors.selectPaymentPeriodsLoading);
  error$ = this.store.select(Selectors.selectPaymentPeriodsError);
  totalCount$ = this.store.select(Selectors.selectPaymentPeriodsTotalCount);
  selected$ = this.store.select(
    createSelector(
      Selectors.selectFeature,
      (state) => state.entities[state.loadedId!] // or however you track it
    )
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAll({ pageNumber }));
  }

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  create(payload: Partial<Omit<PaymentPeriod, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<PaymentPeriod>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
