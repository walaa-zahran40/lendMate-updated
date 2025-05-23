import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './client-status-actions.actions';
import * as Selectors from './client-status-actions.selectors';
import { ClientStatusAction } from './client-status-action.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class ClientStatusActionsFacade {
  all$ = this.store.select(Selectors.selectAllClientStatusActions);
  loading$ = this.store.select(Selectors.selectClientStatusActionsLoading);
  error$ = this.store.select(Selectors.selectClientStatusActionsError);
  totalCount$ = this.store.select(
    Selectors.selectClientStatusActionsTotalCount
  );
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

  create(payload: Partial<Omit<ClientStatusAction, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<ClientStatusAction>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
