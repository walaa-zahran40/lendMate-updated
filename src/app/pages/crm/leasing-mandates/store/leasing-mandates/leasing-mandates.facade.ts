import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './leasing-mandates.actions';
import * as Selectors from './leasing-mandates.selectors';
import { Mandate, MandateWorkFlowAction } from './leasing-mandate.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';

@Injectable({ providedIn: 'root' })
export class MandatesFacade {
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

  constructor(private store: Store) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(Actions.loadAll({ pageNumber }));
  }

  loadById(id: number) {
    this.store.dispatch(Actions.loadById({ id }));
  }

  create(payload: Partial<Omit<Mandate, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<Mandate>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }

  clearSelected() {
    this.store.dispatch(Actions.clearSelectedMandate());
  }
  performWorkflowAction(id: number, changes: Partial<MandateWorkFlowAction>) {
    this.store.dispatch(Actions.performWorkflowActionEntity({ id, changes }));
  }
}
