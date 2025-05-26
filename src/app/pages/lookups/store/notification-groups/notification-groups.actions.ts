import { createAction, props } from '@ngrx/store';
import { NotificationGroup } from './notification-groups.model';

export const loadAll = createAction(
  '[NotificationGroups] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[NotificationGroups] Load All Success',
  props<{ result: NotificationGroup[] }>()
);

export const loadAllFailure = createAction(
  '[NotificationGroups] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[NotificationGroups] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[NotificationGroups] Load By Id Success',
  props<{ entity: NotificationGroup }>()
);
export const loadByIdFailure = createAction(
  '[NotificationGroups] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[NotificationGroups] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<NotificationGroup, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[NotificationGroups] Create Success',
  props<{ entity: NotificationGroup }>()
);
export const createEntityFailure = createAction(
  '[NotificationGroups] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[NotificationGroups] Update',
  props<{ id: number; changes: Partial<NotificationGroup> }>()
);
export const updateEntitySuccess = createAction(
  '[NotificationGroups] Update Success',
  props<{ id: number; changes: Partial<NotificationGroup> }>()
);
export const updateEntityFailure = createAction(
  '[NotificationGroups] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[NotificationGroups] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[NotificationGroups] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[NotificationGroups] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
