import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './client-types.reducer';
import { adapter, State } from './client-types.state';

export const selectFeature = createFeatureSelector<State>('clientTypes');
export const selectClientTypesFeature =
  createFeatureSelector<State>('clientTypes');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectClientTypesFeature);

export const selectAllClientTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectClientTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectClientTypesError = createSelector(
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
export const selectClientTypesTotalCount = createSelector(
  selectClientTypesFeature,
  (state) => state
);
// History management selectors
export const selectClientTypeHistoryState =
  createFeatureSelector<State>('clientTypeHistory');

export const selectClientTypeHistory = createSelector(
  selectClientTypeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectClientTypeHistoryState,
  (state) => state.historyLoaded
);
