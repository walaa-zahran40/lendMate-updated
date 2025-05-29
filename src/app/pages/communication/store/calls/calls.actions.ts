import { createAction, props } from '@ngrx/store';
import { Call } from './call.model';

export const loadAll = createAction(
  '[Calls] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Calls] Load All Success',
  props<{ result: Call[] }>()
);

export const loadAllFailure = createAction(
  '[Calls] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Calls] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Calls] Load By Id Success',
  props<{ entity: Call }>()
);
export const loadByIdFailure = createAction(
  '[Calls] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Calls] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Call, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Calls] Create Success',
  props<{ entity: Call }>()
);
export const createEntityFailure = createAction(
  '[Calls] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Calls] Update',
  props<{ id: number; changes: Partial<Call> }>()
);
export const updateEntitySuccess = createAction(
  '[Calls] Update Success',
  props<{ id: number; changes: Partial<Call> }>()
);
export const updateEntityFailure = createAction(
  '[Calls] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Calls] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Calls] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Calls] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
