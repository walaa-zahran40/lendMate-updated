import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './call-types.reducer';
import { adapter, State } from './call-types.state';

export const selectFeature = createFeatureSelector<State>('callTypes');
export const selectCallTypesFeature = createFeatureSelector<State>('callTypes');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectCallTypesFeature);

export const selectAllCallTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectCallTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectCallTypesError = createSelector(
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
export const selectCallTypesTotalCount = createSelector(
  selectCallTypesFeature,
  (state) => state
);
