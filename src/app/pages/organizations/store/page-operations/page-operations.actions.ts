import { createAction, props } from '@ngrx/store';
import { PageOperation } from './page-operation.model';

export const loadAll = createAction(
  '[PageOperations] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[PageOperations] Load All Success',
  props<{ result: PageOperation[] }>()
);

export const loadAllFailure = createAction(
  '[PageOperations] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[PageOperations] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[PageOperations] Load By Id Success',
  props<{ entity: PageOperation }>()
);
export const loadByIdFailure = createAction(
  '[PageOperations] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[PageOperations] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<PageOperation, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[PageOperations] Create Success',
  props<{ entity: PageOperation }>()
);
export const createEntityFailure = createAction(
  '[PageOperations] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[PageOperations] Update',
  props<{ id: number; changes: Partial<PageOperation> }>()
);
export const updateEntitySuccess = createAction(
  '[PageOperations] Update Success',
  props<{ id: number; changes: Partial<PageOperation> }>()
);
export const updateEntityFailure = createAction(
  '[PageOperations] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[PageOperations] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[PageOperations] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[PageOperations] Delete Failure',
  props<{ error: any }>()
);
export const entityPageOperationSuccess = createAction(
  '[Entity] PageOperation Success',
  props<{ entity: string; pageOperation: 'create' | 'update' | 'delete' }>()
);
