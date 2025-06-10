import { createAction, props } from '@ngrx/store';
import { FollowupPoint } from './followup-point.model';


// Load all
export const loadFollowupPoints = createAction(
  '[FollowupPoints] Load All'
);
export const loadFollowupPointsSuccess = createAction(
  '[FollowupPoints] Load All Success',
  props<{ items: FollowupPoint[]; totalCount: number }>()
);
export const loadFollowupPointsFailure = createAction(
  '[FollowupPoints] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadFollowupPointsHistory = createAction(
  '[FollowupPoints] Load History'
);
export const loadFollowupPointsHistorySuccess = createAction(
  '[FollowupPoints] Load History Success',
  props<{ history: FollowupPoint[] }>()
);
export const loadFollowupPointsHistoryFailure = createAction(
  '[FollowupPoints] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadFollowupPoint = createAction(
  '[FollowupPoints] Load One',
  props<{ id: number }>()
);
export const loadFollowupPointSuccess = createAction(
  '[FollowupPoints] Load One Success',
  props<{ communication: FollowupPoint }>()
);
export const loadFollowupPointFailure = createAction(
  '[FollowupPoints] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createFollowupPoint = createAction(
  '[FollowupPoints] Create',
  props<{ data: Partial<FollowupPoint> }>()
);
export const createFollowupPointSuccess = createAction(
  '[FollowupPoints] Create Success',
  props<{ communication: FollowupPoint }>()
);
export const createFollowupPointFailure = createAction(
  '[FollowupPoints] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateFollowupPoint = createAction(
  '[FollowupPoints] Update',
  props<{ id: number; data: Partial<FollowupPoint> }>()
);
export const updateFollowupPointSuccess = createAction(
  '[FollowupPoints] Update Success',
  props<{ communication: FollowupPoint }>()
);
export const updateFollowupPointFailure = createAction(
  '[FollowupPoints] Update Failure',
  props<{ error: any }>()
);

// Load by CommunicationId
export const loadFollowupPointsByCommunicationId = createAction(
  '[FollowupPoints] Load By CommunicationId',
  props<{ communicationId: number }>()
);
export const loadFollowupPointsByCommunicationIdSuccess = createAction(
  '[FollowupPoints] Load By CommunicationId Success',
  props<{ items: FollowupPoint[] }>()
);
export const loadFollowupPointsByCommunicationIdFailure = createAction(
  '[FollowupPoints] Load By CommunicationId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteFollowupPoint = createAction(
  '[FollowupPoints] Delete',
  props<{ id: number; communicationId: number }>()
);
export const deleteFollowupPointSuccess = createAction(
  '[FollowupPoints] Delete Success',
  props<{ id: number; communicationId: number }>()
);
export const deleteFollowupPointFailure = createAction(
  '[FollowupPoints] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
