import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './call-action-types.reducer';
import { adapter, State } from './call-action-types.state';

export const selectFeature = createFeatureSelector<State>('callActionTypes');
export const selectCallActionTypesFeature =
  createFeatureSelector<State>('callActionTypes');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectCallActionTypesFeature);

export const selectAllCallActionTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectCallActionTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectCallActionTypesError = createSelector(
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
export const selectCallActionTypesTotalCount = createSelector(
  selectCallActionTypesFeature,
  (state) => state
);
// History management selectors
export const selectCallActionTypeState =
  createFeatureSelector<State>('callActionTypes');

export const selectCallActionTypeHistory = createSelector(
  selectCallActionTypeState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectCallActionTypeState,
  (state) => state.historyLoaded
);
