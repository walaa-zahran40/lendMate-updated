import { createAction, props } from '@ngrx/store';
import { AssetType } from './asset-type.model';

export const loadAll = createAction(
  '[AssetTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[AssetTypes] Load All Success',
  props<{ result: AssetType[] }>()
);

export const loadAllFailure = createAction(
  '[AssetTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[AssetTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[AssetTypes] Load By Id Success',
  props<{ entity: AssetType }>()
);
export const loadByIdFailure = createAction(
  '[AssetTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[AssetTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<AssetType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[AssetTypes] Create Success',
  props<{ entity: AssetType }>()
);
export const createEntityFailure = createAction(
  '[AssetTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[AssetTypes] Update',
  props<{ id: number; changes: Partial<AssetType> }>()
);
export const updateEntitySuccess = createAction(
  '[AssetTypes] Update Success',
  props<{ id: number; changes: Partial<AssetType> }>()
);
export const updateEntityFailure = createAction(
  '[AssetTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[AssetTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[AssetTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[AssetTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadAssetTypeHistory = createAction(
  '[AssetType/API] Load AssetType History'
);

export const loadAssetTypeHistorySuccess = createAction(
  '[AssetType/API] Load AssetType History Success',
  props<{ history: AssetType[] }>()
);

export const loadAssetTypeHistoryFailure = createAction(
  '[AssetType/API] Load AssetType History Failure',
  props<{ error: any }>()
);
