import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './notification-groups.reducer';
import { adapter, State } from './notification-groups.state';

export const selectFeature = createFeatureSelector<State>('notificationGroups');
export const selectNotificationGroupsFeature =
  createFeatureSelector<State>('notificationGroups');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectNotificationGroupsFeature);

export const selectAllNotificationGroups = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectNotificationGroupEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectNotificationGroupsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectNotificationGroupsError = createSelector(
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
export const selectNotificationGroupsTotalCount = createSelector(
  selectNotificationGroupsFeature,
  (state) => state
);
