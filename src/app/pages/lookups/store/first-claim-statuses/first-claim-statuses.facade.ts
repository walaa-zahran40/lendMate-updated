import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './first-claim-statuses.actions';
import * as Selectors from './first-claim-statuses.selectors';
import { FirstClaimStatus } from './first-claim-status.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed

@Injectable({ providedIn: 'root' })
export class FirstClaimStatusesFacade {
  all$ = this.store.select(Selectors.selectAllFirstClaimStatus);
  loading$ = this.store.select(Selectors.selectFirstClaimStatusLoading);
  error$ = this.store.select(Selectors.selectFirstClaimStatusError);
  totalCount$ = this.store.select(Selectors.selectFirstClaimStatusTotalCount);
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

  create(payload: Partial<Omit<FirstClaimStatus, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<FirstClaimStatus>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  // History management
  readonly firstClaimStatusHistory$ = this.store.select(
    Selectors.selectHistory
  );
  readonly firstClaimStatusHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadFirstClaimStatusHistory());
  }
}
