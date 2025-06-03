import { createAction, props } from '@ngrx/store';
import { Meeting } from './meeting.model';

export const loadAll = createAction(
  '[Meetings] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Meetings] Load All Success',
  props<{ result: Meeting[] }>()
);

export const loadAllFailure = createAction(
  '[Meetings] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Meetings] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Meetings] Load By Id Success',
  props<{ entity: Meeting }>()
);
export const loadByIdFailure = createAction(
  '[Meetings] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Meetings] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Meeting, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Meetings] Create Success',
  props<{ entity: Meeting }>()
);
export const createEntityFailure = createAction(
  '[Meetings] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Meetings] Update',
  props<{ id: number; changes: Partial<Meeting> }>()
);
export const updateEntitySuccess = createAction(
  '[Meetings] Update Success',
  props<{ id: number; changes: Partial<Meeting> }>()
);
export const updateEntityFailure = createAction(
  '[Meetings] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Meetings] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Meetings] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Meetings] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
