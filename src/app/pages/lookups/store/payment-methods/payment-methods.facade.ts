import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './payment-methods.actions';
import * as Selectors from './payment-methods.selectors';
import { PaymentMethod } from './payment-method.model';

@Injectable({ providedIn: 'root' })
export class PaymentMethodsFacade {
  all$ = this.store.select(Selectors.selectAllPaymentMethods);
  loading$ = this.store.select(Selectors.selectPaymentMethodsLoading);
  error$ = this.store.select(Selectors.selectPaymentMethodsError);
  totalCount$ = this.store.select(Selectors.selectPaymentMethodsTotalCount);
  selected$ = this.store.select(
    createSelector(
      Selectors.selectFeature,
      (state) => state.entities[state.loadedId!] // or however you track it
    )
  );
  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAll({ pageNumber }));
  }

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  create(payload: Partial<Omit<PaymentMethod, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<PaymentMethod>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
