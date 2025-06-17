import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MandateActionNotificationGroupsState } from './action-notification-groups.state';

export const selectMandateActionNotificationGroupsState =
  createFeatureSelector<MandateActionNotificationGroupsState>(
    'mandateActionNotificationGroups'
  );
export const selectMandateActionNotificationGroups = createSelector(
  selectMandateActionNotificationGroupsState,
  (state) => state.items
);
export const selectMandateActionNotificationGroupsTotal = createSelector(
  selectMandateActionNotificationGroupsState,
  (state) => state.totalCount
);
export const selectMandateActionNotificationGroupsHistory = createSelector(
  selectMandateActionNotificationGroupsState,
  (state) => state.history
);
export const selectCurrentMandateActionNotificationGroup = createSelector(
  selectMandateActionNotificationGroupsState,
  (state) => state.current
);
export const selectMandateActionNotificationGroupsLoading = createSelector(
  selectMandateActionNotificationGroupsState,
  (state) => state.loading
);
export const selectMandateActionNotificationGroupsError = createSelector(
  selectMandateActionNotificationGroupsState,
  (state) => state.error
);
// History management selectors
export const selectMandateActionNotificationGroupHistoryState =
  createFeatureSelector<MandateActionNotificationGroupsState>(
    'mandateActionNotificationGroupHistory'
  );

export const selectMandateActionNotificationGroupHistory = createSelector(
  selectMandateActionNotificationGroupHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectMandateActionNotificationGroupHistoryState,
  (state) => state.historyLoaded
);
