import { createAction, props } from '@ngrx/store';
import { AssetType } from './asset-type.model';

// Load all
export const loadAssetTypes = createAction('[AssetTypes] Load All');
export const loadAssetTypesSuccess = createAction(
  '[AssetTypes] Load All Success',
  props<{ items: AssetType[]; totalCount: number }>()
);
export const loadAssetTypesFailure = createAction(
  '[AssetTypes] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadAssetTypesHistory = createAction(
  '[AssetTypes] Load History'
);
export const loadAssetTypesHistorySuccess = createAction(
  '[AssetTypes] Load History Success',
  props<{ history: AssetType[] }>()
);
export const loadAssetTypesHistoryFailure = createAction(
  '[AssetTypes] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadAssetType = createAction(
  '[AssetTypes] Load One',
  props<{ id: number }>()
);
export const loadAssetTypeSuccess = createAction(
  '[AssetTypes] Load One Success',
  props<{ currency: AssetType }>()
);
export const loadAssetTypeFailure = createAction(
  '[AssetTypes] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createAssetType = createAction(
  '[AssetTypes] Create',
  props<{ data: Partial<AssetType> }>()
);
export const createAssetTypeSuccess = createAction(
  '[AssetTypes] Create Success',
  props<{ currency: AssetType }>()
);
export const createAssetTypeFailure = createAction(
  '[AssetTypes] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateAssetType = createAction(
  '[AssetTypes] Update',
  props<{ id: number; data: Partial<AssetType> }>()
);
export const updateAssetTypeSuccess = createAction(
  '[AssetTypes] Update Success',
  props<{ currency: AssetType }>()
);
export const updateAssetTypeFailure = createAction(
  '[AssetTypes] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteAssetType = createAction(
  '[AssetTypes] Delete',
  props<{ id: number }>()
);
export const deleteAssetTypeSuccess = createAction(
  '[AssetTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteAssetTypeFailure = createAction(
  '[AssetTypes] Delete Failure',
  props<{ error: any }>()
);
