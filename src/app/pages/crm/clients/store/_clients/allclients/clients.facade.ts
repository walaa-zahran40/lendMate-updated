import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './clients.actions';
import * as Selectors from './clients.selectors';
import { selectLastOperationSuccess } from '../../../../../../shared/store/ui.selectors';
import { Client, ClientWorkFlowAction } from './client.model';

@Injectable({ providedIn: 'root' })
export class ClientsFacade {
  all$ = this.store.select(Selectors.selectAllClients);
  loading$ = this.store.select(Selectors.selectClientsLoading);
  error$ = this.store.select(Selectors.selectClientsError);
  totalCount$ = this.store.select(Selectors.selectClientsTotalCount);
  selected$ = this.store.select(
    createSelector(
      Selectors.selectFeature,
      (state) => state.entities[state.loadedId!] // or however you track it
    )
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);
  workFlowActionSuccess$ = this.store.select(selectLastOperationSuccess);
  
  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAll({ pageNumber }));
  }

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  create(payload: Partial<Omit<Client, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<Client>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  clearSelected() {
    this.store.dispatch(Actions.clearSelectedClient());
  }
  performWorkflowAction(id: number, changes: Partial<ClientWorkFlowAction>) {
    this.store.dispatch(Actions.performWorkflowActionEntity({ id, changes }));
  }
}
