import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './branches.reducer';
import { adapter, State } from './branches.state';

export const selectFeature = createFeatureSelector<State>('branches');
export const selectBranchesFeature = createFeatureSelector<State>('branches');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectBranchesFeature);

export const selectAllBranches = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectBranchesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectBranchesError = createSelector(
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
export const selectBranchesTotalCount = createSelector(
  selectBranchesFeature,
  (state) => state
);
