import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BranchAddressesState } from './role-claims.state';

export const selectBranchAddressesState =
  createFeatureSelector<BranchAddressesState>('branchAddresses');
export const selectBranchAddresses = createSelector(
  selectBranchAddressesState,
  (state) => state.items
);
export const selectBranchAddressesTotal = createSelector(
  selectBranchAddressesState,
  (state) => state.totalCount
);
export const selectBranchAddressesHistory = createSelector(
  selectBranchAddressesState,
  (state) => state.history
);
export const selectCurrentBranchAddress = createSelector(
  selectBranchAddressesState,
  (state) => state.current
);
export const selectBranchAddressesLoading = createSelector(
  selectBranchAddressesState,
  (state) => state.loading
);
export const selectBranchAddressesError = createSelector(
  selectBranchAddressesState,
  (state) => state.error
);
