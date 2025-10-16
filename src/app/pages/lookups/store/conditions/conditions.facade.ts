import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './conditions.actions';
import * as Selectors from './conditions.selectors';
import { Condition } from './condition.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed

@Injectable({ providedIn: 'root' })
export class ConditionsFacade {
  all$ = this.store.select(Selectors.selectAllConditions);
  loading$ = this.store.select(Selectors.selectConditionsLoading);
  error$ = this.store.select(Selectors.selectConditionsError);
  totalCount$ = this.store.select(Selectors.selectConditionsTotalCount);
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

  create(payload: Partial<Omit<Condition, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<Condition>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
  //History management
  history$ = this.store.select(Selectors.selectConditionHistory);

  readonly conditionHistory$ = this.store.select(
    Selectors.selectConditionHistory
  );
  readonly conditionHistoryLoaded$ = this.store.select(
    Selectors.selectHistoryLoaded
  );

  loadHistory(): void {
    this.store.dispatch(Actions.loadConditionHistory());
  }
}
