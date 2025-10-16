import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './page-operations.reducer';
import { adapter, State } from './page-operations.state';

export const selectFeature = createFeatureSelector<State>('pageOperations');
export const selectPageOperationsFeature =
  createFeatureSelector<State>('pageOperations');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectPageOperationsFeature);

export const selectAllPageOperations = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAddressTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectPageOperationsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectPageOperationsError = createSelector(
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
export const selectPageOperationsTotalCount = createSelector(
  selectPageOperationsFeature,
  (state) => state
);
