import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './vendor-addresses.reducer';
import { adapter, State } from './vendor-addresses.state';

export const selectFeature = createFeatureSelector<State>('vendorAddresses');
export const selectVendorAddressesFeature =
  createFeatureSelector<State>('vendorAddresses');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectVendorAddressesFeature);

export const selectAllVendorAddresses = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectVendorAddressEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectVendorAddressesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectVendorAddressesError = createSelector(
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
export const selectVendorAddressesTotalCount = createSelector(
  selectVendorAddressesFeature,
  (state) => state
);
// History management selectors
export const selectVendorAddressHistoryState =
  createFeatureSelector<State>('vendorAddresses');

export const selectVendorAddressHistory = createSelector(
  selectVendorAddressHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectVendorAddressHistoryState,
  (state) => state.historyLoaded
);
