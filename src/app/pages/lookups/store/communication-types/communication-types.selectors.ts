import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './communication-types.reducer';
import { adapter, State } from './communication-types.state';

export const selectFeature = createFeatureSelector<State>('communicationTypes');
export const selectCommunicationTypesFeature =
  createFeatureSelector<State>('communicationTypes');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(
  selectCommunicationTypesFeature
);

export const selectAllCommunicationTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectCommunicationTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectCommunicationTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectCommunicationTypesError = createSelector(
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
export const selectCommunicationTypesTotalCount = createSelector(
  selectCommunicationTypesFeature,
  (state) => state
);
