import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './workflow-action-types.actions';
import * as Selectors from './workflow-action-types.selectors';
import { WorkflowActionType } from './workflow-action-type.model';

@Injectable({ providedIn: 'root' })
export class WorkflowActionTypesFacade {
  all$ = this.store.select(Selectors.selectAllWorkflowActionTypes);
  loading$ = this.store.select(Selectors.selectWorkflowActionTypesLoading);
  error$ = this.store.select(Selectors.selectWorkflowActionTypesError);
  totalCount$ = this.store.select(
    Selectors.selectWorkflowActionTypesTotalCount
  );
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

  create(payload: Partial<Omit<WorkflowActionType, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<WorkflowActionType>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
