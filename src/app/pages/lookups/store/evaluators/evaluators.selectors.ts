import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './evaluators.reducer';
import { adapter, State } from './evaluators.state';

export const selectFeature = createFeatureSelector<State>('evaluators');
export const selectEvaluatorsFeature =
  createFeatureSelector<State>('evaluators');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectEvaluatorsFeature);

export const selectAllEvaluators = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectEvaluatorEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectEvaluatorsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectEvaluatorsError = createSelector(
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
export const selectEvaluatorsTotalCount = createSelector(
  selectEvaluatorsFeature,
  (state) => state
);
// History management selectors
export const selectEvaluatorHistoryState =
  createFeatureSelector<State>('evaluators');

export const selectEvaluatorHistory = createSelector(
  selectEvaluatorHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectEvaluatorHistoryState,
  (state) => state.historyLoaded
);
