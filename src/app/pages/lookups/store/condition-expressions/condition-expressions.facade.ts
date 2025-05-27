import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as Actions from './condition-expressions.actions';
import * as Selectors from './condition-expressions.selectors';
import { ConditionExpression } from './condition-expressions.model';
import { selectLastOperationSuccess } from '../../../../shared/store/ui.selectors'; // adjust path if needed

@Injectable({ providedIn: 'root' })
export class ConditionExpressionsFacade {
  all$ = this.store.select(Selectors.selectAllConditionExpressions);
  loading$ = this.store.select(Selectors.selectConditionExpressionsLoading);
  error$ = this.store.select(Selectors.selectConditionExpressionsError);
  totalCount$ = this.store.select(Selectors.selectConditionExpressionsTotalCount);
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

  create(payload: Partial<Omit<ConditionExpression, 'id'>>) {
    this.store.dispatch(Actions.createEntity({ payload }));
  }

  update(id: number, changes: Partial<ConditionExpression>) {
    this.store.dispatch(Actions.updateEntity({ id, changes }));
  }

  delete(id: number) {
    this.store.dispatch(Actions.deleteEntity({ id }));
  }
}
