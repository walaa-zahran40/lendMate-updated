import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientAddressesState } from './client-addresses.state';

export const selectClientAddressesState =
  createFeatureSelector<ClientAddressesState>('clientAddresses');
export const selectClientAddresses = createSelector(
  selectClientAddressesState,
  (state) => state.items
);
export const selectClientAddressesTotal = createSelector(
  selectClientAddressesState,
  (state) => state.totalCount
);
export const selectClientAddressesHistory = createSelector(
  selectClientAddressesState,
  (state) => state.history
);
export const selectCurrentClientAddress = createSelector(
  selectClientAddressesState,
  (state) => state.current
);
export const selectClientAddressesLoading = createSelector(
  selectClientAddressesState,
  (state) => state.loading
);
export const selectClientAddressesError = createSelector(
  selectClientAddressesState,
  (state) => state.error
);
