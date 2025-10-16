import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as MandateActions from './leasing-mandates.actions';
import * as Selectors from './leasing-mandates.selectors';
import { Mandate, MandateWorkFlowAction } from './leasing-mandate.model';
import { selectLastOperationSuccess } from '../../../../../shared/store/ui.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
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
  workflowHistory$ = this.store.select(Selectors.selectWorkflowHistory);

  operationSuccess$ = this.store.select(selectLastOperationSuccess);
  workFlowActionSuccess$ = this.store.select(selectLastOperationSuccess);

  constructor(private store: Store, private actions$: Actions) {}

  loadAll(pageNumber?: number) {
    this.store.dispatch(MandateActions.loadAll({ pageNumber }));
  }

  loadById(id: number) {
    this.store.dispatch(MandateActions.loadById({ id }));
  }
  loadWorkflowHistory(mandateId: number) {
    this.store.dispatch(MandateActions.loadWorkflowHistory({ mandateId }));
  }
  create(payload: Partial<Omit<Mandate, 'id'>>) {
    this.store.dispatch(MandateActions.createEntity({ payload }));
  }
  readonly createSuccess$ = this.actions$.pipe(
    ofType(MandateActions.createEntitySuccess),
    map((action) => action.entity) // <-- fix here
  );

  update(id: number, changes: Partial<Mandate>) {
    this.store.dispatch(MandateActions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(MandateActions.deleteEntity({ id }));
  }

  clearSelected() {
    this.store.dispatch(MandateActions.clearSelectedMandate());
  }
  performWorkflowAction(id: number, changes: Partial<MandateWorkFlowAction>) {
    this.store.dispatch(
      MandateActions.performWorkflowActionEntity({ id, changes })
    );
  }
  loadByClientId(clientId: number) {
    this.store.dispatch(MandateActions.loadByClientId({ clientId }));
  }
}
