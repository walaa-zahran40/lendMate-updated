import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './payment-timing-terms.actions';
import * as Selectors from './payment-timing-terms.selectors';
import { PaymentTimingTerm } from './payment-timing-term.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class PaymentTimingTermsFacade {
  all$ = this.store.select(Selectors.selectAllPaymentTimingTerms);
  loading$ = this.store.select(Selectors.selectPaymentTimingTermsLoading);
  error$ = this.store.select(Selectors.selectPaymentTimingTermsError);
  totalCount$ = this.store.select(Selectors.selectPaymentTimingTermsTotalCount);
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

  create(payload: Partial<Omit<PaymentTimingTerm, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<PaymentTimingTerm>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
