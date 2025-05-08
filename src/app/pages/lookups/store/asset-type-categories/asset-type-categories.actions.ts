import { createAction, props } from '@ngrx/store';
import { AssetTypeCategory } from './asset-type-category.model';

export const loadAll = createAction(
  '[AssetTypeCategories] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[AssetTypeCategories] Load All Success',
  props<{ result: AssetTypeCategory[] }>()
);

export const loadAllFailure = createAction(
  '[AssetTypeCategories] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[AssetTypeCategories] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[AssetTypeCategories] Load By Id Success',
  props<{ entity: AssetTypeCategory }>()
);
export const loadByIdFailure = createAction(
  '[AssetTypeCategories] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[AssetTypeCategories] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<AssetTypeCategory, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[AssetTypeCategories] Create Success',
  props<{ entity: AssetTypeCategory }>()
);
export const createEntityFailure = createAction(
  '[AssetTypeCategories] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[AssetTypeCategories] Update',
  props<{ id: number; changes: Partial<AssetTypeCategory> }>()
);
export const updateEntitySuccess = createAction(
  '[AssetTypeCategories] Update Success',
  props<{ id: number; changes: Partial<AssetTypeCategory> }>()
);
export const updateEntityFailure = createAction(
  '[AssetTypeCategories] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[AssetTypeCategories] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[AssetTypeCategories] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[AssetTypeCategories] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
