import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './notification-group-officers.reducer';
import { adapter, State } from './notification-group-officers.state';

export const selectFeature = createFeatureSelector<State>(
  'notificationGroupOfficers'
);
export const selectNotificationGroupOfficersFeature =
  createFeatureSelector<State>('notificationGroupOfficers');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(
  selectNotificationGroupOfficersFeature
);

export const selectAllNotificationGroupOfficers = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectNotificationGroupOfficersLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectNotificationGroupOfficersError = createSelector(
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
export const selectNotificationGroupOfficersTotalCount = createSelector(
  selectNotificationGroupOfficersFeature,
  (state) => state
);
// History management selectors
export const selectNotificationGroupOfficerHistoryState =
  createFeatureSelector<State>('notificationGroupOfficerHistory');

export const selectNotificationGroupOfficerHistory = createSelector(
  selectNotificationGroupOfficerHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectNotificationGroupOfficerHistoryState,
  (state) => state.historyLoaded
);
