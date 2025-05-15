import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoleClaimsState } from './role-claims.state';

export const selectRoleClaimsState =
  createFeatureSelector<RoleClaimsState>('roleClaims');
export const selectRoleClaims = createSelector(
  selectRoleClaimsState,
  (state) => state.items
);
export const selectRoleClaimsTotal = createSelector(
  selectRoleClaimsState,
  (state) => state.totalCount
);
export const selectRoleClaimsHistory = createSelector(
  selectRoleClaimsState,
  (state) => state.history
);
export const selectCurrentRoleClaim = createSelector(
  selectRoleClaimsState,
  (state) => state.current
);
export const selectRoleClaimsLoading = createSelector(
  selectRoleClaimsState,
  (state) => state.loading
);
export const selectRoleClaimsError = createSelector(
  selectRoleClaimsState,
  (state) => state.error
);
