import { createAction, props } from '@ngrx/store';
import { CallType } from './call-type.model';

export const loadAll = createAction(
  '[CallTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[CallTypes] Load All Success',
  props<{ result: CallType[] }>()
);

export const loadAllFailure = createAction(
  '[CallTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[CallTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[CallTypes] Load By Id Success',
  props<{ entity: CallType }>()
);
export const loadByIdFailure = createAction(
  '[CallTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[CallTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<CallType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[CallTypes] Create Success',
  props<{ entity: CallType }>()
);
export const createEntityFailure = createAction(
  '[CallTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[CallTypes] Update',
  props<{ id: number; changes: Partial<CallType> }>()
);
export const updateEntitySuccess = createAction(
  '[CallTypes] Update Success',
  props<{ id: number; changes: Partial<CallType> }>()
);
export const updateEntityFailure = createAction(
  '[CallTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[CallTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[CallTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[CallTypes] Delete Failure',
  props<{ error: any }>()
);
