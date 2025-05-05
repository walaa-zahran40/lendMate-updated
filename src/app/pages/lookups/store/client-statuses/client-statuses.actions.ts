import { createAction, props } from '@ngrx/store';
import { ClientStatus } from './client-status.model';

// Load all
export const loadClientStatuses = createAction('[ClientStatuses] Load All');
export const loadClientStatusesSuccess = createAction(
  '[ClientStatuses] Load All Success',
  props<{ items: ClientStatus[]; totalCount: number }>()
);
export const loadClientStatusesFailure = createAction(
  '[ClientStatuses] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadClientStatusesHistory = createAction(
  '[ClientStatuses] Load History'
);
export const loadClientStatusesHistorySuccess = createAction(
  '[ClientStatuses] Load History Success',
  props<{ history: ClientStatus[] }>()
);
export const loadClientStatusesHistoryFailure = createAction(
  '[ClientStatuses] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadClientStatus = createAction(
  '[ClientStatuses] Load One',
  props<{ id: number }>()
);
export const loadClientStatusSuccess = createAction(
  '[ClientStatuses] Load One Success',
  props<{ clientStatus: ClientStatus }>()
);
export const loadClientStatusFailure = createAction(
  '[ClientStatuses] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createClientStatus = createAction(
  '[ClientStatuses] Create',
  props<{ data: Partial<ClientStatus> }>()
);
export const createClientStatusSuccess = createAction(
  '[ClientStatuses] Create Success',
  props<{ clientStatus: ClientStatus }>()
);
export const createClientStatusFailure = createAction(
  '[ClientStatuses] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateClientStatus = createAction(
  '[ClientStatuses] Update',
  props<{ id: number; data: Partial<ClientStatus> }>()
);
export const updateClientStatusSuccess = createAction(
  '[ClientStatuses] Update Success',
  props<{ clientStatus: ClientStatus }>()
);
export const updateClientStatusFailure = createAction(
  '[ClientStatuses] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteClientStatus = createAction(
  '[ClientStatuses] Delete',
  props<{ id: number }>()
);
export const deleteClientStatusSuccess = createAction(
  '[ClientStatuses] Delete Success',
  props<{ id: number }>()
);
export const deleteClientStatusFailure = createAction(
  '[ClientStatuses] Delete Failure',
  props<{ error: any }>()
);
