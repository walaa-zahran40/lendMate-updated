import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './client-status-actions.reducer';
import { adapter, State } from './client-status-actions.state';

export const selectFeature = createFeatureSelector<State>(
  'clientStatusActions'
);
export const selectClientStatusActionsFeature = createFeatureSelector<State>(
  'clientStatusActions'
);

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(
  selectClientStatusActionsFeature
);

export const selectAllClientStatusActions = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectClientStatusActionEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectClientStatusActionsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectClientStatusActionsError = createSelector(
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
export const selectClientStatusActionsTotalCount = createSelector(
  selectClientStatusActionsFeature,
  (state) => state
);
// History management selectors
export const selectClientStatusActionHistoryState =
  createFeatureSelector<State>('clientStatusActions');

export const selectClientStatusActionHistory = createSelector(
  selectClientStatusActionHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectClientStatusActionHistoryState,
  (state) => state.historyLoaded
);
