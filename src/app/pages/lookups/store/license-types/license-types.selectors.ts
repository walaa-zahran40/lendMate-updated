import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './license-types.reducer';
import { adapter, State } from './license-types.state';

export const selectFeature = createFeatureSelector<State>('licenseTypes');
export const selectLicenseTypesFeature =
  createFeatureSelector<State>('licenseTypes');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectLicenseTypesFeature);

export const selectAllLicenseTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectLicenseTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectLicenseTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectLicenseTypesError = createSelector(
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
export const selectLicenseTypesTotalCount = createSelector(
  selectLicenseTypesFeature,
  (state) => state
);
// History management selectors
export const selectLicenseTypeHistoryState =
  createFeatureSelector<State>('licenseTypes');

export const selectLicenseTypeHistory = createSelector(
  selectLicenseTypeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectLicenseTypeHistoryState,
  (state) => state.historyLoaded
);
