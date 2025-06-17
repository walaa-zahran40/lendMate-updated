import { createAction, props } from '@ngrx/store';
import { MandateActionNotificationGroup } from './action-notification-group.model';

// Load all
export const loadMandateActionNotificationGroups = createAction(
  '[MandateActionNotificationGroups] Load All'
);
export const loadMandateActionNotificationGroupsSuccess = createAction(
  '[MandateActionNotificationGroups] Load All Success',
  props<{ items: MandateActionNotificationGroup[]; totalCount: number }>()
);
export const loadMandateActionNotificationGroupsFailure = createAction(
  '[MandateActionNotificationGroups] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadMandateActionNotificationGroupsHistory = createAction(
  '[MandateActionNotificationGroups] Load History'
);
export const loadMandateActionNotificationGroupsHistorySuccess = createAction(
  '[MandateActionNotificationGroups] Load History Success',
  props<{ history: MandateActionNotificationGroup[] }>()
);
export const loadMandateActionNotificationGroupsHistoryFailure = createAction(
  '[MandateActionNotificationGroups] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadMandateActionNotificationGroup = createAction(
  '[MandateActionNotificationGroups] Load One',
  props<{ id: number }>()
);
export const loadMandateActionNotificationGroupSuccess = createAction(
  '[MandateActionNotificationGroups] Load One Success',
  props<{ mandate: MandateActionNotificationGroup }>()
);
export const loadMandateActionNotificationGroupFailure = createAction(
  '[MandateActionNotificationGroups] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createMandateActionNotificationGroup = createAction(
  '[MandateActionNotificationGroups] Create',
  props<{ data: Partial<MandateActionNotificationGroup> }>()
);
export const createMandateActionNotificationGroupSuccess = createAction(
  '[MandateActionNotificationGroups] Create Success',
  props<{ mandate: MandateActionNotificationGroup }>()
);
export const createMandateActionNotificationGroupFailure = createAction(
  '[MandateActionNotificationGroups] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateMandateActionNotificationGroup = createAction(
  '[MandateActionNotificationGroups] Update',
  props<{ id: number; data: Partial<MandateActionNotificationGroup> }>()
);
export const updateMandateActionNotificationGroupSuccess = createAction(
  '[MandateActionNotificationGroups] Update Success',
  props<{ mandate: MandateActionNotificationGroup }>()
);
export const updateMandateActionNotificationGroupFailure = createAction(
  '[MandateActionNotificationGroups] Update Failure',
  props<{ error: any }>()
);

// Load by MandateStatusActionId
export const loadMandateActionNotificationGroupsByMandateStatusActionId =
  createAction(
    '[MandateActionNotificationGroups] Load By MandateStatusActionId',
    props<{ mandateStatusActionId: number }>()
  );
export const loadMandateActionNotificationGroupsByMandateStatusActionIdSuccess =
  createAction(
    '[MandateActionNotificationGroups] Load By MandateStatusActionId Success',
    props<{ items: any }>()
  );
export const loadMandateActionNotificationGroupsByMandateStatusActionIdFailure =
  createAction(
    '[MandateActionNotificationGroups] Load By MandateStatusActionId Failure',
    props<{ error: any }>()
  );
//Delete
export const deleteMandateActionNotificationGroup = createAction(
  '[MandateActionNotificationGroups] Delete',
  props<{ id: number; mandateStatusActionId: number }>()
);
export const deleteMandateActionNotificationGroupSuccess = createAction(
  '[MandateActionNotificationGroups] Delete Success',
  props<{ id: number; mandateStatusActionId: number }>()
);
export const deleteMandateActionNotificationGroupFailure = createAction(
  '[MandateActionNotificationGroups] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadMandateActionNotificationGroupHistory = createAction(
  '[MandateActionNotificationGroup/API] Load MandateActionNotificationGroup History'
);

export const loadMandateActionNotificationGroupHistorySuccess = createAction(
  '[MandateActionNotificationGroup/API] Load MandateActionNotificationGroup History Success',
  props<{ history: MandateActionNotificationGroup[] }>()
);

export const loadMandateActionNotificationGroupHistoryFailure = createAction(
  '[MandateActionNotificationGroup/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
