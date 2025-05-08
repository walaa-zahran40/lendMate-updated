import { createAction, props } from '@ngrx/store';
import { CallActionType } from './call-action-type.model';

export const loadAll = createAction(
  '[CallActionTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[CallActionTypes] Load All Success',
  props<{ result: CallActionType[] }>()
);

export const loadAllFailure = createAction(
  '[CallActionTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[CallActionTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[CallActionTypes] Load By Id Success',
  props<{ entity: CallActionType }>()
);
export const loadByIdFailure = createAction(
  '[CallActionTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[CallActionTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<CallActionType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[CallActionTypes] Create Success',
  props<{ entity: CallActionType }>()
);
export const createEntityFailure = createAction(
  '[CallActionTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[CallActionTypes] Update',
  props<{ id: number; changes: Partial<CallActionType> }>()
);
export const updateEntitySuccess = createAction(
  '[CallActionTypes] Update Success',
  props<{ id: number; changes: Partial<CallActionType> }>()
);
export const updateEntityFailure = createAction(
  '[CallActionTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[CallActionTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[CallActionTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[CallActionTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
