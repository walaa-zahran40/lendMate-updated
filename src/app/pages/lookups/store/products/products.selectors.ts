import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './products.reducer';
import { adapter, State } from './products.state';

export const selectFeature = createFeatureSelector<State>('addressTypes');
export const selectProductsFeature =
  createFeatureSelector<State>('addressTypes');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectProductsFeature);

export const selectAllProducts = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectProductEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectProductsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectProductsError = createSelector(
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
export const selectProductsTotalCount = createSelector(
  selectProductsFeature,
  (state) => state
);
