import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './asset-type-categories.reducer';
import { adapter, State } from './asset-type-categories.state';

export const selectFeature = createFeatureSelector<State>(
  'assetTypeCategories'
);
export const selectAssetTypeCategoriesFeature = createFeatureSelector<State>(
  'assetTypeCategories'
);

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(
  selectAssetTypeCategoriesFeature
);

export const selectAllAssetTypeCategories = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAssetTypeCategoryEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectAssetTypeCategoriesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectAssetTypeCategoriesError = createSelector(
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
export const selectAssetTypeCategoriesTotalCount = createSelector(
  selectAssetTypeCategoriesFeature,
  (state) => state
);
// History management selectors
export const selectAssetTypeCategoryState = createFeatureSelector<State>(
  'assetTypeCategories'
);

export const selectAssetTypeCategoryHistory = createSelector(
  selectAssetTypeCategoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectAssetTypeCategoryState,
  (state) => state.historyLoaded
);
