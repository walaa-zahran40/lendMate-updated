import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './leasing-mandates.actions';
import * as Selectors from './leasing-mandates.selectors';
import { LeasingMandate } from './leasing-mandate.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class LeasingMandatesFacade {
  all$ = this.store.select(Selectors.selectAllLeasingMandates);
  loading$ = this.store.select(Selectors.selectLeasingMandatesLoading);
  error$ = this.store.select(Selectors.selectLeasingMandatesError);
  totalCount$ = this.store.select(Selectors.selectLeasingMandatesTotalCount);
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

  create(payload: Partial<Omit<LeasingMandate, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<LeasingMandate>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
