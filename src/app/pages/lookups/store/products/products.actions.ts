import { createAction, props } from '@ngrx/store';
import { Product } from './product.model';

export const loadAll = createAction(
  '[Products] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Products] Load All Success',
  props<{ result: Product[] }>()
);

export const loadAllFailure = createAction(
  '[Products] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Products] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Products] Load By Id Success',
  props<{ entity: Product }>()
);
export const loadByIdFailure = createAction(
  '[Products] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Products] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Product, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Products] Create Success',
  props<{ entity: Product }>()
);
export const createEntityFailure = createAction(
  '[Products] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Products] Update',
  props<{ id: number; changes: Partial<Product> }>()
);
export const updateEntitySuccess = createAction(
  '[Products] Update Success',
  props<{ id: number; changes: Partial<Product> }>()
);
export const updateEntityFailure = createAction(
  '[Products] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Products] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Products] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Products] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadProductHistory = createAction(
  '[Product/API] Load Product History'
);

export const loadProductHistorySuccess = createAction(
  '[Product/API] Load Product History Success',
  props<{ history: Product[] }>()
);

export const loadProductHistoryFailure = createAction(
  '[Product/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
