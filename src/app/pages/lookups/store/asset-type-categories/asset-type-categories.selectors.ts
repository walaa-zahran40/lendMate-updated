import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssetTypeCategoriesState } from './asset-type-categories.state';

export const selectAssetTypeCategoriesState =
  createFeatureSelector<AssetTypeCategoriesState>('assetTypeCategories');
export const selectAssetTypeCategories = createSelector(
  selectAssetTypeCategoriesState,
  (state) => state.items
);
export const selectAssetTypeCategoriesTotal = createSelector(
  selectAssetTypeCategoriesState,
  (state) => state.totalCount
);
export const selectAssetTypeCategoriesHistory = createSelector(
  selectAssetTypeCategoriesState,
  (state) => state.history
);
export const selectCurrentAssetTypeCategory = createSelector(
  selectAssetTypeCategoriesState,
  (state) => state.current
);
export const selectAssetTypeCategoriesLoading = createSelector(
  selectAssetTypeCategoriesState,
  (state) => state.loading
);
export const selectAssetTypeCategoriesError = createSelector(
  selectAssetTypeCategoriesState,
  (state) => state.error
);

