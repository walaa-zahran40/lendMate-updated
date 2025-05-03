import { createAction, props } from '@ngrx/store';
import { AssetTypeCategory } from './asset-type-category.model';

// Load all
export const loadAssetTypeCategories = createAction('[AssetTypeCategories] Load All');
export const loadAssetTypeCategoriesSuccess = createAction(
  '[AssetTypeCategories] Load All Success',
  props<{ items: AssetTypeCategory[]; totalCount: number }>()
);
export const loadAssetTypeCategoriesFailure = createAction(
  '[AssetTypeCategories] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadAssetTypeCategoriesHistory = createAction(
  '[AssetTypeCategories] Load History'
);
export const loadAssetTypeCategoriesHistorySuccess = createAction(
  '[AssetTypeCategories] Load History Success',
  props<{ history: AssetTypeCategory[] }>()
);
export const loadAssetTypeCategoriesHistoryFailure = createAction(
  '[AssetTypeCategories] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadAssetTypeCategory = createAction(
  '[AssetTypeCategories] Load One',
  props<{ id: number }>()
);
export const loadAssetTypeCategorySuccess = createAction(
  '[AssetTypeCategories] Load One Success',
  props<{ currency: AssetTypeCategory }>()
);
export const loadAssetTypeCategoryFailure = createAction(
  '[AssetTypeCategories] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createAssetTypeCategory = createAction(
  '[AssetTypeCategories] Create',
  props<{ data: Partial<AssetTypeCategory> }>()
);
export const createAssetTypeCategorySuccess = createAction(
  '[AssetTypeCategories] Create Success',
  props<{ currency: AssetTypeCategory }>()
);
export const createAssetTypeCategoryFailure = createAction(
  '[AssetTypeCategories] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateAssetTypeCategory = createAction(
  '[AssetTypeCategories] Update',
  props<{ id: number; data: Partial<AssetTypeCategory> }>()
);
export const updateAssetTypeCategorySuccess = createAction(
  '[AssetTypeCategories] Update Success',
  props<{ currency: AssetTypeCategory }>()
);
export const updateAssetTypeCategoryFailure = createAction(
  '[AssetTypeCategories] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteAssetTypeCategory = createAction(
  '[AssetTypeCategories] Delete',
  props<{ id: number }>()
);
export const deleteAssetTypeCategorySuccess = createAction(
  '[AssetTypeCategories] Delete Success',
  props<{ id: number }>()
);
export const deleteAssetTypeCategoryFailure = createAction(
  '[AssetTypeCategories] Delete Failure',
  props<{ error: any }>()
);
