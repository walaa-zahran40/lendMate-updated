import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActionNotificationGroupsState } from './action-notification-groups.state';

export const selectActionNotificationGroupsState =
  createFeatureSelector<ActionNotificationGroupsState>(
    'actionNotificationGroups'
  );
export const selectActionNotificationGroups = createSelector(
  selectActionNotificationGroupsState,
  (state) => state.items
);
export const selectActionNotificationGroupsTotal = createSelector(
  selectActionNotificationGroupsState,
  (state) => state.totalCount
);
export const selectActionNotificationGroupsHistory = createSelector(
  selectActionNotificationGroupsState,
  (state) => state.history
);
export const selectCurrentActionNotificationGroup = createSelector(
  selectActionNotificationGroupsState,
  (state) => state.current
);
export const selectActionNotificationGroupsLoading = createSelector(
  selectActionNotificationGroupsState,
  (state) => state.loading
);
export const selectActionNotificationGroupsError = createSelector(
  selectActionNotificationGroupsState,
  (state) => state.error
);
// History management selectors
export const selectActionNotificationGroupHistoryState =
  createFeatureSelector<ActionNotificationGroupsState>(
    'actionNotificationGroupsHistory'
  );

export const selectActionNotificationGroupHistory = createSelector(
  selectActionNotificationGroupHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectActionNotificationGroupHistoryState,
  (state) => state.historyLoaded
);
