import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './authorization-group-officers.reducer';
import { adapter, State } from './authorization-group-officers.state';

export const selectFeature = createFeatureSelector<State>(
  'authorizationGroupOfficers'
);
export const selectAuthorizationGroupOfficersFeature =
  createFeatureSelector<State>('authorizationGroupOfficers');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(
  selectAuthorizationGroupOfficersFeature
);

export const selectAllAuthorizationGroupOfficers = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectAuthorizationGroupOfficersLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectAuthorizationGroupOfficersError = createSelector(
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
export const selectAuthorizationGroupOfficersTotalCount = createSelector(
  selectAuthorizationGroupOfficersFeature,
  (state) => state
);
// History management selectors
export const selectAuthorizationGroupOfficerState =
  createFeatureSelector<State>('authorizationGroupOfficers');

export const selectAuthorizationGroupOfficerHistory = createSelector(
  selectAuthorizationGroupOfficerState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectAuthorizationGroupOfficerState,
  (state) => state.historyLoaded
);
