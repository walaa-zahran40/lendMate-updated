import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './governorates.reducer';
import { adapter, State } from './governorates.state';

export const selectFeature = createFeatureSelector<State>('governorates');
export const selectGovernoratesFeature =
  createFeatureSelector<State>('governorates');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectGovernoratesFeature);

export const selectAllGovernorates = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectGovernoratesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectGovernoratesError = createSelector(
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
export const selectGovernoratesTotalCount = createSelector(
  selectGovernoratesFeature,
  (state) => state
);
// History management selectors
export const selectGovernorateHistoryState =
  createFeatureSelector<State>('governorates');

export const selectGovernorateHistory = createSelector(
  selectGovernorateHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectGovernorateHistoryState,
  (state) => state.historyLoaded
);
