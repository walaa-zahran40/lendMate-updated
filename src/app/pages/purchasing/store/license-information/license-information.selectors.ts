import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './license-information.reducer';
import { adapter, State } from './license-information.state';

export const selectFeature = createFeatureSelector<State>('licenseInformation');
export const selectLicenseInformationFeature =
  createFeatureSelector<State>('licenseInformation');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectLicenseInformationFeature);

export const selectAllLicenseInformation = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAssetEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectLicenseInformationLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectLicenseInformationError = createSelector(
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
export const selectLicenseInformationTotalCount = createSelector(
  selectLicenseInformationFeature,
  (state) => state
);
// History management selectors
export const selectLicenseInformationtate =
  createFeatureSelector<State>('licenseInformation');

export const selectHistory = createSelector(
  selectLicenseInformationtate,
  (state) => state.history
);

export const selectHistoryLoaded = createSelector(
  selectLicenseInformationtate,
  (state) => state.historyLoaded
);

export const selectHistoryError = createSelector(
  selectLicenseInformationtate,
  (state) => state.historyError
);
