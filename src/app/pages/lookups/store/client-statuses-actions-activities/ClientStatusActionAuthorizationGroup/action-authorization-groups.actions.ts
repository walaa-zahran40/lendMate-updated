import { createAction, props } from '@ngrx/store';
import { ActionAuthorizationGroup } from './action-authorization-group.model';

// Load all
export const loadActionAuthorizationGroups = createAction(
  '[ActionAuthorizationGroups] Load All'
);
export const loadActionAuthorizationGroupsSuccess = createAction(
  '[ActionAuthorizationGroups] Load All Success',
  props<{ items: ActionAuthorizationGroup[]; totalCount: number }>()
);
export const loadActionAuthorizationGroupsFailure = createAction(
  '[ActionAuthorizationGroups] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadActionAuthorizationGroupsHistory = createAction(
  '[ActionAuthorizationGroups] Load History'
);
export const loadActionAuthorizationGroupsHistorySuccess = createAction(
  '[ActionAuthorizationGroups] Load History Success',
  props<{ history: ActionAuthorizationGroup[] }>()
);
export const loadActionAuthorizationGroupsHistoryFailure = createAction(
  '[ActionAuthorizationGroups] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadActionAuthorizationGroup = createAction(
  '[ActionAuthorizationGroups] Load One',
  props<{ id: number }>()
);
export const loadActionAuthorizationGroupSuccess = createAction(
  '[ActionAuthorizationGroups] Load One Success',
  props<{ client: ActionAuthorizationGroup }>()
);
export const loadActionAuthorizationGroupFailure = createAction(
  '[ActionAuthorizationGroups] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createActionAuthorizationGroup = createAction(
  '[ActionAuthorizationGroups] Create',
  props<{ data: Partial<ActionAuthorizationGroup> }>()
);
export const createActionAuthorizationGroupSuccess = createAction(
  '[ActionAuthorizationGroups] Create Success',
  props<{ client: ActionAuthorizationGroup }>()
);
export const createActionAuthorizationGroupFailure = createAction(
  '[ActionAuthorizationGroups] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateActionAuthorizationGroup = createAction(
  '[ActionAuthorizationGroups] Update',
  props<{ id: number; data: Partial<ActionAuthorizationGroup> }>()
);
export const updateActionAuthorizationGroupSuccess = createAction(
  '[ActionAuthorizationGroups] Update Success',
  props<{ client: ActionAuthorizationGroup }>()
);
export const updateActionAuthorizationGroupFailure = createAction(
  '[ActionAuthorizationGroups] Update Failure',
  props<{ error: any }>()
);

// Load by ClientStatusActionId
export const loadActionAuthorizationGroupsByClientStatusActionId = createAction(
  '[ActionAuthorizationGroups] Load By ClientStatusActionId',
  props<{ clientStatusActionId: number }>()
);
export const loadActionAuthorizationGroupsByClientStatusActionIdSuccess = createAction(
  '[ActionAuthorizationGroups] Load By ClientStatusActionId Success',
  props<{ items: any }>()
);
export const loadActionAuthorizationGroupsByClientStatusActionIdFailure = createAction(
  '[ActionAuthorizationGroups] Load By ClientStatusActionId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteActionAuthorizationGroup = createAction(
  '[ActionAuthorizationGroups] Delete',
  props<{ id: number; clientStatusActionId: number }>()
);
export const deleteActionAuthorizationGroupSuccess = createAction(
  '[ActionAuthorizationGroups] Delete Success',
  props<{ id: number; clientStatusActionId: number }>()
);
export const deleteActionAuthorizationGroupFailure = createAction(
  '[ActionAuthorizationGroups] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
