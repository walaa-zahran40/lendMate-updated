import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './fee-types.actions';
import * as Selectors from './fee-types.selectors';
import { FeeType } from './fee-type.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class FeeTypesFacade {
  all$ = this.store.select(Selectors.selectAllFeeTypes);
  loading$ = this.store.select(Selectors.selectFeeTypesLoading);
  error$ = this.store.select(Selectors.selectFeeTypesError);
  totalCount$ = this.store.select(Selectors.selectFeeTypesTotalCount);
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

  create(payload: Partial<Omit<FeeType, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<FeeType>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  //History management
  history$ = this.store.select(Selectors.selectFeeTypeHistory);

  readonly feeTypeHistory$ = this.store.select(Selectors.selectFeeTypeHistory);
  readonly feeTypeHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadFeeTypeHistory());
  }
}
