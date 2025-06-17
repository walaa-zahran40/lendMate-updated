import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './rent-structure-types.reducer';
import { adapter, State } from './rent-structure-types.state';

export const selectFeature = createFeatureSelector<State>('rentStructureTypes');
export const selectRentStructureTypesFeature =
  createFeatureSelector<State>('rentStructureTypes');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(
  selectRentStructureTypesFeature
);

export const selectAllRentStructureTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectRentStructureTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectRentStructureTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectRentStructureTypesError = createSelector(
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
export const selectRentStructureTypesTotalCount = createSelector(
  selectRentStructureTypesFeature,
  (state) => state
);
// History management selectors
export const selectRentStructureTypeHistoryState =
  createFeatureSelector<State>('rentStructureTypes');

export const selectRentStructureTypeHistory = createSelector(
  selectRentStructureTypeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectRentStructureTypeHistoryState,
  (state) => state.historyLoaded
);
