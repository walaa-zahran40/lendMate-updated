import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, State } from './branches.state';
import { branchFeatureKey } from './branches.reducer';

// 1) Feature selector
export const selectBranchesFeature =
  createFeatureSelector<State>(branchFeatureKey);

// 2) Entity selectors bound to the feature slice
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectBranchesFeature);

// 3) Export the array selector and others
export const selectAllBranches = selectAll; // Branch[]
export const selectBranchEntities = selectEntities; // { [id: string]: Branch }
export const selectBranchIds = selectIds; // (string | number)[]
export const selectBranchesCount = selectTotal; // number

// 4) Additional UI‐focused selectors
export const selectBranchesLoading = createSelector(
  selectBranchesFeature,
  (state) => state.loading
);
export const selectBranchesError = createSelector(
  selectBranchesFeature,
  (state) => state.error
);
export const selectLoadedBranchId = createSelector(
  selectBranchesFeature,
  (state) => state.loadedId
);
export const selectCurrentBranch = createSelector(
  selectBranchEntities,
  selectLoadedBranchId,
  (entities, id) => (id != null ? entities[id] : null)
);
