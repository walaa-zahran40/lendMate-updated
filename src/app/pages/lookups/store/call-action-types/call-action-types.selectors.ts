import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './call-action-types.reducer';
import { adapter, State } from './call-action-types.state';

export const selectFeature = createFeatureSelector<State>('callActionTypes');
export const selectCallActionTypesFeature =
  createFeatureSelector<State>('callActionTypes');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectCallActionTypesFeature);

export const selectAllCallActionTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectCallActionTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectCallActionTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectCallActionTypesError = createSelector(
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
export const selectCallActionTypesTotalCount = createSelector(
  selectCallActionTypesFeature,
  (state) => state
);
