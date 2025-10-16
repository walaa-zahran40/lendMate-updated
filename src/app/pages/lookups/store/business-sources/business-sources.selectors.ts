import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './business-sources.reducer';
import { adapter, State } from './business-sources.state';

export const selectFeature = createFeatureSelector<State>('businessSources');
export const selectBusinessSourcesFeature =
  createFeatureSelector<State>('businessSources');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectBusinessSourcesFeature);

export const selectAllBusinessSources = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectBusinessSourceEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectBusinessSourcesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectBusinessSourcesError = createSelector(
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
export const selectBusinessSourcesTotalCount = createSelector(
  selectBusinessSourcesFeature,
  (state) => state
);
// History management selectors
export const selectBusinessSourceState =
  createFeatureSelector<State>('businessSources');

export const selectHistory = createSelector(
  selectBusinessSourceState,
  (state) => state.history
);

export const selectHistoryLoaded = createSelector(
  selectBusinessSourceState,
  (state) => state.historyLoaded
);

export const selectHistoryError = createSelector(
  selectBusinessSourceState,
  (state) => state.historyError
);
