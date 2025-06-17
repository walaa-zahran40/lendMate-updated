import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './condition-expressions.reducer';
import { adapter, State } from './condition-expressions.state';

export const selectFeature = createFeatureSelector<State>(
  'conditionExpressions'
);
export const selectConditionExpressionsFeature = createFeatureSelector<State>(
  'conditionExpressions'
);

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectConditionExpressionsFeature);

export const selectAllConditionExpressions = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectConditionExpressionEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectConditionExpressionsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectConditionExpressionsError = createSelector(
  selectFeature,
  (state) => state.error
);

export const selectLoadedId = createSelector(
  selectFeature,
  (state) => state.loadedId
);

export const selectCurrent = createSelector(
  selectEntities,
  selectLoadedId,
  (entities, id) => (id != null ? entities[id] : null)
);
export const selectConditionExpressionsTotalCount = createSelector(
  selectConditionExpressionsFeature,
  (state) => state
);
// History management selectors
export const selectConditionExpressionHistoryState =
  createFeatureSelector<State>('conditionExpressions');

export const selectConditionExpressionHistory = createSelector(
  selectConditionExpressionHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectConditionExpressionHistoryState,
  (state) => state.historyLoaded
);
