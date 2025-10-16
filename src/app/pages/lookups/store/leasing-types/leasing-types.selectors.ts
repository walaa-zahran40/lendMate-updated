import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './leasing-types.reducer';
import { adapter, State } from './leasing-types.state';

export const selectFeature = createFeatureSelector<State>('leasingTypes');
export const selectLeasingTypesFeature =
  createFeatureSelector<State>('leasingTypes');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectLeasingTypesFeature);

export const selectAllLeasingTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectLeasingTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectLeasingTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectLeasingTypesError = createSelector(
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
export const selectLeasingTypesTotalCount = createSelector(
  selectLeasingTypesFeature,
  (state) => state
);
// History management selectors
export const selectLeasingTypeHistoryState =
  createFeatureSelector<State>('leasingTypes');

export const selectLeasingTypeHistory = createSelector(
  selectLeasingTypeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectLeasingTypeHistoryState,
  (state) => state.historyLoaded
);
