import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './workflow-action-types.reducer';
import { adapter, State } from './workflow-action-types.state';

export const selectFeature = createFeatureSelector<State>(
  'workflowActionTypes'
);
export const selectWorkflowActionTypesFeature = createFeatureSelector<State>(
  'workflowActionTypes'
);

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectWorkflowActionTypesFeature);

export const selectAllWorkflowActionTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAddressTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectWorkflowActionTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectWorkflowActionTypesError = createSelector(
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
export const selectWorkflowActionTypesTotalCount = createSelector(
  selectWorkflowActionTypesFeature,
  (state) => state
);
// History management selectors
export const selectWorkflowActionTypeHistoryState =
  createFeatureSelector<State>('workflowActionTypeHistory');

export const selectWorkflowActionTypeHistory = createSelector(
  selectWorkflowActionTypeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectWorkflowActionTypeHistoryState,
  (state) => state.historyLoaded
);
