import { createAction, props } from '@ngrx/store';
import { Branch } from './branch.model';

export const loadAll = createAction(
  '[Branches] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Branches] Load All Success',
  props<{ result: Branch[] }>()
);

export const loadAllFailure = createAction(
  '[Branches] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Branches] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Branches] Load By Id Success',
  props<{ entity: Branch }>()
);
export const loadByIdFailure = createAction(
  '[Branches] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Branches] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Branch, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Branches] Create Success',
  props<{ entity: Branch }>()
);
export const createEntityFailure = createAction(
  '[Branches] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Branches] Update',
  props<{ id: number; changes: Partial<Branch> }>()
);
export const updateEntitySuccess = createAction(
  '[Branches] Update Success',
  props<{ id: number; changes: Partial<Branch> }>()
);
export const updateEntityFailure = createAction(
  '[Branches] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Branches] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Branches] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Branches] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
