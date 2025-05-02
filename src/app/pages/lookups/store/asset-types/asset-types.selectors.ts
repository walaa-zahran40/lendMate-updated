import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssetTypesState } from './asset-types.state';

export const selectAssetTypesState =
  createFeatureSelector<AssetTypesState>('assetTypes');
export const selectAssetTypes = createSelector(
  selectAssetTypesState,
  (state) => state.items
);
export const selectAssetTypesTotal = createSelector(
  selectAssetTypesState,
  (state) => state.totalCount
);
export const selectAssetTypesHistory = createSelector(
  selectAssetTypesState,
  (state) => state.history
);
export const selectCurrentAssetType = createSelector(
  selectAssetTypesState,
  (state) => state.current
);
export const selectAssetTypesLoading = createSelector(
  selectAssetTypesState,
  (state) => state.loading
);
export const selectAssetTypesError = createSelector(
  selectAssetTypesState,
  (state) => state.error
);

