import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './evaluation-information.actions';
import * as Selectors from './evaluation-information.selectors';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed
import { EvaluationInformation } from './evaluation-information.model';

@Injectable({ providedIn: 'root' })
export class EvaluationInformationFacade {
  all$ = this.store.select(Selectors.selectAllEvaluationInformation);
  loading$ = this.store.select(Selectors.selectEvaluationInformationLoading);
  error$ = this.store.select(Selectors.selectEvaluationInformationError);
  totalCount$ = this.store.select(
    Selectors.selectEvaluationInformationTotalCount
  );
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

  create(payload: Partial<Omit<EvaluationInformation, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<EvaluationInformation>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  clearSelected() {
    this.store.dispatch(Actions.clearSelectedClient());
  }
  // History management
  readonly evaluationInformationHistory$ = this.store.select(
    Selectors.selectHistory
  );
  readonly evaluationInformationHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadEvaluationInformationHistory());
  }
}
