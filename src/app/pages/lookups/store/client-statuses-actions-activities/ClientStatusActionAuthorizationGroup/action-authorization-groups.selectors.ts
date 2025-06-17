import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActionAuthorizationGroupsState } from './action-authorization-groups.state';

export const selectActionAuthorizationGroupsState =
  createFeatureSelector<ActionAuthorizationGroupsState>(
    'actionAuthorizationGroups'
  );
export const selectActionAuthorizationGroups = createSelector(
  selectActionAuthorizationGroupsState,
  (state) => state.items
);
export const selectActionAuthorizationGroupsTotal = createSelector(
  selectActionAuthorizationGroupsState,
  (state) => state.totalCount
);
export const selectActionAuthorizationGroupsHistory = createSelector(
  selectActionAuthorizationGroupsState,
  (state) => state.history
);
export const selectCurrentActionAuthorizationGroup = createSelector(
  selectActionAuthorizationGroupsState,
  (state) => state.current
);
export const selectActionAuthorizationGroupsLoading = createSelector(
  selectActionAuthorizationGroupsState,
  (state) => state.loading
);
export const selectActionAuthorizationGroupsError = createSelector(
  selectActionAuthorizationGroupsState,
  (state) => state.error
);
// History management selectors
export const selectClientStatusActionAuthorizationGroupHistoryState =
  createFeatureSelector<ActionAuthorizationGroupsState>(
    'clientStatusActionAuthorizationGroupHistory'
  );

export const selectClientStatusActionHistory = createSelector(
  selectClientStatusActionAuthorizationGroupHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectClientStatusActionAuthorizationGroupHistoryState,
  (state) => state.historyLoaded
);
