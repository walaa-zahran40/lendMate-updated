import { createAction, props } from '@ngrx/store';
import { ActionNotificationGroup } from './action-notification-group.model';

// Load all
export const loadActionNotificationGroups = createAction(
  '[ActionNotificationGroups] Load All'
);
export const loadActionNotificationGroupsSuccess = createAction(
  '[ActionNotificationGroups] Load All Success',
  props<{ items: ActionNotificationGroup[]; totalCount: number }>()
);
export const loadActionNotificationGroupsFailure = createAction(
  '[ActionNotificationGroups] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadActionNotificationGroupsHistory = createAction(
  '[ActionNotificationGroups] Load History'
);
export const loadActionNotificationGroupsHistorySuccess = createAction(
  '[ActionNotificationGroups] Load History Success',
  props<{ history: ActionNotificationGroup[] }>()
);
export const loadActionNotificationGroupsHistoryFailure = createAction(
  '[ActionNotificationGroups] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadActionNotificationGroup = createAction(
  '[ActionNotificationGroups] Load One',
  props<{ id: number }>()
);
export const loadActionNotificationGroupSuccess = createAction(
  '[ActionNotificationGroups] Load One Success',
  props<{ client: ActionNotificationGroup }>()
);
export const loadActionNotificationGroupFailure = createAction(
  '[ActionNotificationGroups] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createActionNotificationGroup = createAction(
  '[ActionNotificationGroups] Create',
  props<{ data: Partial<ActionNotificationGroup> }>()
);
export const createActionNotificationGroupSuccess = createAction(
  '[ActionNotificationGroups] Create Success',
  props<{ client: ActionNotificationGroup }>()
);
export const createActionNotificationGroupFailure = createAction(
  '[ActionNotificationGroups] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateActionNotificationGroup = createAction(
  '[ActionNotificationGroups] Update',
  props<{ id: number; data: Partial<ActionNotificationGroup> }>()
);
export const updateActionNotificationGroupSuccess = createAction(
  '[ActionNotificationGroups] Update Success',
  props<{ client: ActionNotificationGroup }>()
);
export const updateActionNotificationGroupFailure = createAction(
  '[ActionNotificationGroups] Update Failure',
  props<{ error: any }>()
);

// Load by ClientStatusActionId
export const loadActionNotificationGroupsByClientStatusActionId = createAction(
  '[ActionNotificationGroups] Load By ClientStatusActionId',
  props<{ clientStatusActionId: number }>()
);
export const loadActionNotificationGroupsByClientStatusActionIdSuccess =
  createAction(
    '[ActionNotificationGroups] Load By ClientStatusActionId Success',
    props<{ items: any }>()
  );
export const loadActionNotificationGroupsByClientStatusActionIdFailure =
  createAction(
    '[ActionNotificationGroups] Load By ClientStatusActionId Failure',
    props<{ error: any }>()
  );
//Delete
export const deleteActionNotificationGroup = createAction(
  '[ActionNotificationGroups] Delete',
  props<{ id: number; clientStatusActionId: number }>()
);
export const deleteActionNotificationGroupSuccess = createAction(
  '[ActionNotificationGroups] Delete Success',
  props<{ id: number; clientStatusActionId: number }>()
);
export const deleteActionNotificationGroupFailure = createAction(
  '[ActionNotificationGroups] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadActionNotificationGroupHistory = createAction(
  '[ActionNotificationGroup/API] Load ActionNotificationGroup History'
);

export const loadActionNotificationGroupHistorySuccess = createAction(
  '[ActionNotificationGroup/API] Load ActionNotificationGroup History Success',
  props<{ history: ActionNotificationGroup[] }>()
);

export const loadActionNotificationGroupHistoryFailure = createAction(
  '[ActionNotificationGroup/API] Load ActionNotificationGroup History Failure',
  props<{ error: any }>()
);
