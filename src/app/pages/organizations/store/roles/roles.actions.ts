import { createAction, props } from '@ngrx/store';
import { Role } from './role.model';

export const loadAll = createAction(
  '[Roles] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Roles] Load All Success',
  props<{ result: Role[] }>()
);

export const loadAllFailure = createAction(
  '[Roles] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Roles] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Roles] Load By Id Success',
  props<{ entity: Role }>()
);
export const loadByIdFailure = createAction(
  '[Roles] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Roles] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Role, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Roles] Create Success',
  props<{ entity: Role }>()
);
export const createEntityFailure = createAction(
  '[Roles] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Roles] Update',
  props<{ id: number; changes: Partial<Role> }>()
);
export const updateEntitySuccess = createAction(
  '[Roles] Update Success',
  props<{ id: number; changes: Partial<Role> }>()
);
export const updateEntityFailure = createAction(
  '[Roles] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Roles] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Roles] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Roles] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
