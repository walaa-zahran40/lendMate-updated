import { createAction, props } from '@ngrx/store';
import { MandateActionAuthorizationGroup } from './action-authorization-group.model';

// Load all
export const loadMandateActionAuthorizationGroups = createAction(
  '[MandateActionAuthorizationGroups] Load All'
);
export const loadMandateActionAuthorizationGroupsSuccess = createAction(
  '[MandateActionAuthorizationGroups] Load All Success',
  props<{ items: MandateActionAuthorizationGroup[]; totalCount: number }>()
);
export const loadMandateActionAuthorizationGroupsFailure = createAction(
  '[MandateActionAuthorizationGroups] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadMandateActionAuthorizationGroupsHistory = createAction(
  '[MandateActionAuthorizationGroups] Load History'
);
export const loadMandateActionAuthorizationGroupsHistorySuccess = createAction(
  '[MandateActionAuthorizationGroups] Load History Success',
  props<{ history: MandateActionAuthorizationGroup[] }>()
);
export const loadMandateActionAuthorizationGroupsHistoryFailure = createAction(
  '[MandateActionAuthorizationGroups] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadMandateActionAuthorizationGroup = createAction(
  '[MandateActionAuthorizationGroups] Load One',
  props<{ id: number }>()
);
export const loadMandateActionAuthorizationGroupSuccess = createAction(
  '[MandateActionAuthorizationGroups] Load One Success',
  props<{ mandate: MandateActionAuthorizationGroup }>()
);
export const loadMandateActionAuthorizationGroupFailure = createAction(
  '[MandateActionAuthorizationGroups] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createMandateActionAuthorizationGroup = createAction(
  '[MandateActionAuthorizationGroups] Create',
  props<{ data: Partial<MandateActionAuthorizationGroup> }>()
);
export const createMandateActionAuthorizationGroupSuccess = createAction(
  '[MandateActionAuthorizationGroups] Create Success',
  props<{ mandate: MandateActionAuthorizationGroup }>()
);
export const createMandateActionAuthorizationGroupFailure = createAction(
  '[MandateActionAuthorizationGroups] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateMandateActionAuthorizationGroup = createAction(
  '[MandateActionAuthorizationGroups] Update',
  props<{ id: number; data: Partial<MandateActionAuthorizationGroup> }>()
);
export const updateMandateActionAuthorizationGroupSuccess = createAction(
  '[MandateActionAuthorizationGroups] Update Success',
  props<{ mandate: MandateActionAuthorizationGroup }>()
);
export const updateMandateActionAuthorizationGroupFailure = createAction(
  '[MandateActionAuthorizationGroups] Update Failure',
  props<{ error: any }>()
);

// Load by MandateStatusActionId
export const loadMandateActionAuthorizationGroupsByMandateStatusActionId =
  createAction(
    '[MandateActionAuthorizationGroups] Load By MandateStatusActionId',
    props<{ mandateStatusActionId: number }>()
  );
export const loadMandateActionAuthorizationGroupsByMandateStatusActionIdSuccess =
  createAction(
    '[MandateActionAuthorizationGroups] Load By MandateStatusActionId Success',
    props<{ items: any }>()
  );
export const loadMandateActionAuthorizationGroupsByMandateStatusActionIdFailure =
  createAction(
    '[MandateActionAuthorizationGroups] Load By MandateStatusActionId Failure',
    props<{ error: any }>()
  );
//Delete
export const deleteMandateActionAuthorizationGroup = createAction(
  '[MandateActionAuthorizationGroups] Delete',
  props<{ id: number; mandateStatusActionId: number }>()
);
export const deleteMandateActionAuthorizationGroupSuccess = createAction(
  '[MandateActionAuthorizationGroups] Delete Success',
  props<{ id: number; mandateStatusActionId: number }>()
);
export const deleteMandateActionAuthorizationGroupFailure = createAction(
  '[MandateActionAuthorizationGroups] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadMandateActionAuthorizationGroupHistory = createAction(
  '[MandateActionAuthorizationGroup/API] Load MandateActionAuthorizationGroup History'
);

export const loadMandateActionAuthorizationGroupHistorySuccess = createAction(
  '[MandateActionAuthorizationGroup/API] Load MandateActionAuthorizationGroup History Success',
  props<{ history: MandateActionAuthorizationGroup[] }>()
);

export const loadMandateActionAuthorizationGroupHistoryFailure = createAction(
  '[MandateActionAuthorizationGroup/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
