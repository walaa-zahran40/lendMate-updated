import { createAction, props } from '@ngrx/store';
import { Condition } from './condition.model';

export const loadAll = createAction(
  '[Conditions] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Conditions] Load All Success',
  props<{ result: Condition[] }>()
);

export const loadAllFailure = createAction(
  '[Conditions] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Conditions] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Conditions] Load By Id Success',
  props<{ entity: Condition }>()
);
export const loadByIdFailure = createAction(
  '[Conditions] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Conditions] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Condition, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Conditions] Create Success',
  props<{ entity: Condition }>()
);
export const createEntityFailure = createAction(
  '[Conditions] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Conditions] Update',
  props<{ id: number; changes: Partial<Condition> }>()
);
export const updateEntitySuccess = createAction(
  '[Conditions] Update Success',
  props<{ id: number; changes: Partial<Condition> }>()
);
export const updateEntityFailure = createAction(
  '[Conditions] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Conditions] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Conditions] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Conditions] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
