import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './authorization-groups.reducer';
import { adapter, State } from './authorization-groups.state';

export const selectFeature = createFeatureSelector<State>(
  'authorizationGroups'
);
export const selectAuthorizationGroupsFeature = createFeatureSelector<State>(
  'authorizationGroups'
);

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectAuthorizationGroupsFeature);

export const selectAllAuthorizationGroups = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAuthorizationGroupEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectAuthorizationGroupsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectAuthorizationGroupsError = createSelector(
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
export const selectAuthorizationGroupsTotalCount = createSelector(
  selectAuthorizationGroupsFeature,
  (state) => state
);
// History management selectors
export const selectAuthorizationGroupState = createFeatureSelector<State>(
  'authorizationGroups'
);

export const selectAuthorizationGroupHistory = createSelector(
  selectAuthorizationGroupState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectAuthorizationGroupState,
  (state) => state.historyLoaded
);
