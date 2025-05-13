import { createAction, props } from '@ngrx/store';
import { Operation } from './operation.model';

export const loadAllOperations = createAction(
  '[Operations] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Operations] Load All Success',
  props<{ result: Operation[] }>()
);

export const loadAllFailure = createAction(
  '[Operations] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Operations] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Operations] Load By Id Success',
  props<{ entity: Operation }>()
);
export const loadByIdFailure = createAction(
  '[Operations] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Operations] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Operation, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Operations] Create Success',
  props<{ entity: Operation }>()
);
export const createEntityFailure = createAction(
  '[Operations] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Operations] Update',
  props<{ id: number; changes: Partial<Operation> }>()
);
export const updateEntitySuccess = createAction(
  '[Operations] Update Success',
  props<{ id: number; changes: Partial<Operation> }>()
);
export const updateEntityFailure = createAction(
  '[Operations] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Operations] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Operations] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Operations] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
