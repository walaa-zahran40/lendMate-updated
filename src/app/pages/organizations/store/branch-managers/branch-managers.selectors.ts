import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BranchManagersState } from './branch-managers.state';

export const selectBranchManagersState =
  createFeatureSelector<BranchManagersState>('branchManagers');
export const selectBranchManagers = createSelector(
  selectBranchManagersState,
  (state) => state.items
);
export const selectBranchManagersTotal = createSelector(
  selectBranchManagersState,
  (state) => state.totalCount
);
export const selectBranchManagersHistory = createSelector(
  selectBranchManagersState,
  (state) => state.history
);
export const selectCurrentBranchManager = createSelector(
  selectBranchManagersState,
  (state) => state.current
);
export const selectBranchManagersLoading = createSelector(
  selectBranchManagersState,
  (state) => state.loading
);
export const selectBranchManagersError = createSelector(
  selectBranchManagersState,
  (state) => state.error
);

