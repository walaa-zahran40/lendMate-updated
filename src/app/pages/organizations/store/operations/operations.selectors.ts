import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './operations.reducer';
import { adapter, State } from './operations.state';

export const selectFeature = createFeatureSelector<State>('operations');
export const selectOperationsFeature =
  createFeatureSelector<State>('operations');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectOperationsFeature);

export const selectAllOperations = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAddressTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectOperationsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectOperationsError = createSelector(
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
export const selectOperationsTotalCount = createSelector(
  selectOperationsFeature,
  (state) => state
);
