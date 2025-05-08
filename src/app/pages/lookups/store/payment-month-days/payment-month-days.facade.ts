import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './payment-month-days.actions';
import * as Selectors from './payment-month-days.selectors';
import { PaymentMonthDay } from './payment-month-day.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class PaymentMonthDaysFacade {
  all$ = this.store.select(Selectors.selectAllPaymentMonthDays);
  loading$ = this.store.select(Selectors.selectPaymentMonthDaysLoading);
  error$ = this.store.select(Selectors.selectPaymentMonthDaysError);
  totalCount$ = this.store.select(Selectors.selectPaymentMonthDaysTotalCount);
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

  create(payload: Partial<Omit<PaymentMonthDay, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<PaymentMonthDay>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
