import { createAction, props } from '@ngrx/store';
import { NotificationGroupOfficer } from './notification-group-officer.model';

export const loadAll = createAction(
  '[NotificationGroupOfficers] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[NotificationGroupOfficers] Load All Success',
  props<{ result: NotificationGroupOfficer[] }>()
);

export const loadAllFailure = createAction(
  '[NotificationGroupOfficers] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[NotificationGroupOfficers] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[NotificationGroupOfficers] Load By Id Success',
  props<{ entity: NotificationGroupOfficer }>()
);
export const loadByIdFailure = createAction(
  '[NotificationGroupOfficers] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[NotificationGroupOfficers] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<NotificationGroupOfficer, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[NotificationGroupOfficers] Create Success',
  props<{ entity: NotificationGroupOfficer }>()
);
export const createEntityFailure = createAction(
  '[NotificationGroupOfficers] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[NotificationGroupOfficers] Update',
  props<{ id: number; changes: Partial<NotificationGroupOfficer> }>()
);
export const updateEntitySuccess = createAction(
  '[NotificationGroupOfficers] Update Success',
  props<{ id: number; changes: Partial<NotificationGroupOfficer> }>()
);
export const updateEntityFailure = createAction(
  '[NotificationGroupOfficers] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[NotificationGroupOfficers] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[NotificationGroupOfficers] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[NotificationGroupOfficers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
