import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './license-providers.reducer';
import { adapter, State } from './license-providers.state';

export const selectFeature = createFeatureSelector<State>('licenseProviders');
export const selectLicenseProvidersFeature =
  createFeatureSelector<State>('licenseProviders');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectLicenseProvidersFeature);

export const selectAllLicenseProviders = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectLicenseProviderEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectLicenseProvidersLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectLicenseProvidersError = createSelector(
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
export const selectLicenseProvidersTotalCount = createSelector(
  selectLicenseProvidersFeature,
  (state) => state
);
// History management selectors
export const selectLicenseProviderHistoryState =
  createFeatureSelector<State>('licenseProviders');

export const selectLicenseProviderHistory = createSelector(
  selectLicenseProviderHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectLicenseProviderHistoryState,
  (state) => state.historyLoaded
);
