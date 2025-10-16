import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './client-officer-types.reducer';
import { adapter, State } from './client-officer-types.state';

export const selectFeature = createFeatureSelector<State>('clientOfficerTypes');
export const selectClientOfficerTypesFeature =
  createFeatureSelector<State>('clientOfficerTypes');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(
  selectClientOfficerTypesFeature
);

export const selectAllClientOfficerTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectClientOfficerTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectClientOfficerTypesError = createSelector(
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
export const selectClientOfficerTypesTotalCount = createSelector(
  selectClientOfficerTypesFeature,
  (state) => state
);
// History management selectors
export const selectClientOfficerTypeState =
  createFeatureSelector<State>('clientOfficerTypes');

export const selectClientOfficerTypeHistory = createSelector(
  selectClientOfficerTypeState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectClientOfficerTypeState,
  (state) => state.historyLoaded
);
