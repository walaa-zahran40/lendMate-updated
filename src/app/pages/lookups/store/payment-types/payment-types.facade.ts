import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './payment-types.actions';
import * as Selectors from './payment-types.selectors';
import { PaymentType } from './payment-type.model';

@Injectable({ providedIn: 'root' })
export class PaymentTypesFacade {
  all$ = this.store.select(Selectors.selectAllPaymentTypes);
  loading$ = this.store.select(Selectors.selectPaymentTypesLoading);
  error$ = this.store.select(Selectors.selectPaymentTypesError);
  totalCount$ = this.store.select(Selectors.selectPaymentTypesTotalCount);
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

  create(payload: Partial<Omit<PaymentType, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<PaymentType>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
