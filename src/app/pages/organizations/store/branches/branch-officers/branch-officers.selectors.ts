import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BranchOfficersState } from './branch-officers.state';

export const selectBranchOfficersState =
  createFeatureSelector<BranchOfficersState>('branchOfficers');
export const selectBranchOfficers = createSelector(
  selectBranchOfficersState,
  (state) => state.items
);
export const selectBranchOfficersTotal = createSelector(
  selectBranchOfficersState,
  (state) => state.totalCount
);
export const selectBranchOfficersHistory = createSelector(
  selectBranchOfficersState,
  (state) => state.history
);
export const selectCurrentBranchOfficer = createSelector(
  selectBranchOfficersState,
  (state) => state.current
);
export const selectBranchOfficersLoading = createSelector(
  selectBranchOfficersState,
  (state) => state.loading
);
export const selectBranchOfficersError = createSelector(
  selectBranchOfficersState,
  (state) => state.error
);

