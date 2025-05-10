import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './communication-flow-types.reducer';
import { adapter, State } from './communication-flow-types.state';

export const selectFeature = createFeatureSelector<State>(
  'communicationFlowTypes'
);
export const selectCommunicationFlowTypesFeature = createFeatureSelector<State>(
  'communicationFlowTypes'
);

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(
  selectCommunicationFlowTypesFeature
);

export const selectAllCommunicationFlowTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectCommunicationFlowTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectCommunicationFlowTypesError = createSelector(
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
export const selectCommunicationFlowTypesTotalCount = createSelector(
  selectCommunicationFlowTypesFeature,
  (state) => state
);
