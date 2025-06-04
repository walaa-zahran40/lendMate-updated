import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MandateActionAuthorizationGroupsState } from './action-authorization-groups.state';

export const selectActionAuthorizationGroupsState =
  createFeatureSelector<MandateActionAuthorizationGroupsState>('mandateActionAuthorizationGroups');
export const selectMandateActionAuthorizationGroups = createSelector(
  selectActionAuthorizationGroupsState,
  (state) => state.items
);
export const selectMandateActionAuthorizationGroupsTotal = createSelector(
  selectActionAuthorizationGroupsState,
  (state) => state.totalCount
);
export const selectMandateActionAuthorizationGroupsHistory = createSelector(
  selectActionAuthorizationGroupsState,
  (state) => state.history
);
export const selectCurrentMandateActionAuthorizationGroup = createSelector(
  selectActionAuthorizationGroupsState,
  (state) => state.current
);
export const selectMandateActionAuthorizationGroupsLoading = createSelector(
  selectActionAuthorizationGroupsState,
  (state) => state.loading
);
export const selectMandateActionAuthorizationGroupsError = createSelector(
  selectActionAuthorizationGroupsState,
  (state) => state.error
);
