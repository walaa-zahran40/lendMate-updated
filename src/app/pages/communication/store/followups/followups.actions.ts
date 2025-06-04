import { createAction, props } from '@ngrx/store';
import { Followup } from './followup.model';


// Load all
export const loadFollowups = createAction(
  '[Followups] Load All'
);
export const loadFollowupsSuccess = createAction(
  '[Followups] Load All Success',
  props<{ items: Followup[]; totalCount: number }>()
);
export const loadFollowupsFailure = createAction(
  '[Followups] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadFollowupsHistory = createAction(
  '[Followups] Load History'
);
export const loadFollowupsHistorySuccess = createAction(
  '[Followups] Load History Success',
  props<{ history: Followup[] }>()
);
export const loadFollowupsHistoryFailure = createAction(
  '[Followups] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadFollowup = createAction(
  '[Followups] Load One',
  props<{ id: number }>()
);
export const loadFollowupSuccess = createAction(
  '[Followups] Load One Success',
  props<{ communication: Followup }>()
);
export const loadFollowupFailure = createAction(
  '[Followups] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createFollowup = createAction(
  '[Followups] Create',
  props<{ data: Partial<Followup> }>()
);
export const createFollowupSuccess = createAction(
  '[Followups] Create Success',
  props<{ communication: Followup }>()
);
export const createFollowupFailure = createAction(
  '[Followups] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateFollowup = createAction(
  '[Followups] Update',
  props<{ id: number; data: Partial<Followup> }>()
);
export const updateFollowupSuccess = createAction(
  '[Followups] Update Success',
  props<{ communication: Followup }>()
);
export const updateFollowupFailure = createAction(
  '[Followups] Update Failure',
  props<{ error: any }>()
);

// Load by CommunicationId
export const loadFollowupsByCommunicationId = createAction(
  '[Followups] Load By CommunicationId',
  props<{ communicationId: number }>()
);
export const loadFollowupsByCommunicationIdSuccess = createAction(
  '[Followups] Load By CommunicationId Success',
  props<{ items: Followup[] }>()
);
export const loadFollowupsByCommunicationIdFailure = createAction(
  '[Followups] Load By CommunicationId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteFollowup = createAction(
  '[Followups] Delete',
  props<{ id: number; communicationId: number }>()
);
export const deleteFollowupSuccess = createAction(
  '[Followups] Delete Success',
  props<{ id: number; communicationId: number }>()
);
export const deleteFollowupFailure = createAction(
  '[Followups] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
