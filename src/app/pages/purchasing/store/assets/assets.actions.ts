import { createAction, props } from '@ngrx/store';
import { Asset } from './asset.model';

export const loadAll = createAction(
  '[Assets] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Assets] Load All Success',
  props<{ result: Asset[] }>()
);

export const loadAllFailure = createAction(
  '[Assets] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Assets] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Assets] Load By Id Success',
  props<{ entity: Asset }>()
);
export const loadByIdFailure = createAction(
  '[Assets] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Assets] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Asset, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Assets] Create Success',
  props<{ entity: Asset }>()
);
export const createEntityFailure = createAction(
  '[Assets] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Assets] Update',
  props<{ id: number; changes: Partial<Asset> }>()
);
export const updateEntitySuccess = createAction(
  '[Assets] Update Success',
  props<{ id: number; changes: Partial<Asset> }>()
);
export const updateEntityFailure = createAction(
  '[Assets] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Assets] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Assets] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Assets] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadAssetHistory = createAction(
  '[Asset/API] Load Address Type History'
);

export const loadAssetHistorySuccess = createAction(
  '[Asset/API] Load Address Type History Success',
  props<{ history: Asset[] }>()
);
export const performWorkflowActionEntityFailure = createAction(
  '[Assets] PerformWorkflowAction Failure',
  props<{ error: any }>()
);
export const clearSelectedClient = createAction('[Assets] Clear Selected');

export const loadAssetHistoryFailure = createAction(
  '[Asset/API] Load Address Type History Failure',
  props<{ error: any }>()
);
