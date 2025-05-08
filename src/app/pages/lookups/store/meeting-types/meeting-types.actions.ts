import { createAction, props } from '@ngrx/store';
import { MeetingType } from './meeting-type.model';

export const loadAll = createAction(
  '[MeetingTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[MeetingTypes] Load All Success',
  props<{ result: MeetingType[] }>()
);

export const loadAllFailure = createAction(
  '[MeetingTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[MeetingTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[MeetingTypes] Load By Id Success',
  props<{ entity: MeetingType }>()
);
export const loadByIdFailure = createAction(
  '[MeetingTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[MeetingTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<MeetingType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[MeetingTypes] Create Success',
  props<{ entity: MeetingType }>()
);
export const createEntityFailure = createAction(
  '[MeetingTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[MeetingTypes] Update',
  props<{ id: number; changes: Partial<MeetingType> }>()
);
export const updateEntitySuccess = createAction(
  '[MeetingTypes] Update Success',
  props<{ id: number; changes: Partial<MeetingType> }>()
);
export const updateEntityFailure = createAction(
  '[MeetingTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[MeetingTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[MeetingTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[MeetingTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
