import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './client-leasing-mandates.actions';
import * as Selectors from './client-leasing-mandates.selectors';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';
import {
  MandateDetail,
  MandateWorkflowAction,
} from './client-leasing-mandate.model';

@Injectable({ providedIn: 'root' })
export class ClientMandatesFacade {
  readonly selectedMandate$ = this.store.select(Selectors.selectCurrent);
  all$ = this.store.select(Selectors.selectAllMandates);
  loading$ = this.store.select(Selectors.selectMandatesLoading);
  error$ = this.store.select(Selectors.selectMandatesError);
  totalCount$ = this.store.select(Selectors.selectMandatesTotalCount);
  selected$ = this.store.select(
    createSelector(
      Selectors.selectFeature,
      (state) => state.entities[state.loadedId!] // or however you track it
    )
  );
  operationSuccess$ = this.store.select(selectLastOperationSuccess);
  workFlowActionSuccess$ = this.store.select(selectLastOperationSuccess);
  /** ➕ observable for the “current” mandate (by loadedId) */
  currentMandate$ = this.store.select(Selectors.selectCurrent);

  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAll({ pageNumber }));
  }
  /** ➕ kicks off the load-by-leasing-id effect */
  loadByLeasingId(id: number) {
    this.store.dispatch(Actions.loadByLeasingId({ id }));
  }
  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  create(clientId: number, payload: any) {
    this.store.dispatch(Actions.createEntity({ clientId, payload }));
  }

  update(clientId: number, id: number, changes: Partial<MandateDetail>) {
    this.store.dispatch(Actions.updateEntity({ clientId, id, changes }));
  }

  delete(clientId: number, id: number) {
    this.store.dispatch(Actions.deleteEntity({ clientId, id }));
  }

  clearSelected() {
    this.store.dispatch(Actions.clearSelectedMandate());
  }
  performWorkflowAction(
    clientId: number,
    id: number,
    changes: Partial<MandateWorkflowAction>
  ) {
    this.store.dispatch(
      Actions.performWorkflowActionEntity({ clientId, id, changes })
    );
  }
}
