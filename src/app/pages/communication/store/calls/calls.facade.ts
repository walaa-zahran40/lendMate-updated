import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './calls.actions';
import * as Selectors from './calls.selectors';
import { Call } from './call.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed

@Injectable({ providedIn: 'root' })
export class CallsFacade {
  all$ = this.store.select(Selectors.selectAllCalls);
  loading$ = this.store.select(Selectors.selectCallsLoading);
  error$ = this.store.select(Selectors.selectCallsError);
  totalCount$ = this.store.select(Selectors.selectCallsTotalCount);
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

  create(payload: Partial<Omit<Call, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<Call>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  deleteBulk(ids: number[]) {
    this.store.dispatch(Actions.deleteBulk({ ids }));
  }
}
