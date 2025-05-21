import { createAction, props } from '@ngrx/store';
import { ClientShareHolder } from './client-share-holders.model';

// Load all
export const loadClientShareHolders = createAction('[ClientShareHolders] Load All');
export const loadClientShareHoldersSuccess = createAction(
  '[ClientShareHolders] Load All Success',
  props<{ items: ClientShareHolder[]; totalCount: number }>()
);
export const loadClientShareHoldersFailure = createAction(
  '[ClientShareHolders] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadClientShareHoldersHistory = createAction(
  '[ClientShareHolders] Load History'
);
export const loadClientShareHoldersHistorySuccess = createAction(
  '[ClientShareHolders] Load History Success',
  props<{ history: ClientShareHolder[] }>()
);
export const loadClientShareHoldersHistoryFailure = createAction(
  '[ClientShareHolders] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadClientShareHolder = createAction(
  '[ClientShareHolders] Load One',
  props<{ id: number }>()
);
export const loadClientShareHolderSuccess = createAction(
  '[ClientShareHolders] Load One Success',
  props<{ client: ClientShareHolder }>()
);
export const loadClientShareHolderFailure = createAction(
  '[ClientShareHolders] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createClientShareHolder = createAction(
  '[ClientShareHolders] Create',
  props<{ data: Partial<ClientShareHolder> }>()
);
export const createClientShareHolderSuccess = createAction(
  '[ClientShareHolders] Create Success',
  props<{ client: ClientShareHolder }>()
);
export const createClientShareHolderFailure = createAction(
  '[ClientShareHolders] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateClientShareHolder = createAction(
  '[ClientShareHolders] Update',
  props<{ id: number; data: Partial<ClientShareHolder> }>()
);
export const updateClientShareHolderSuccess = createAction(
  '[ClientShareHolders] Update Success',
  props<{ client: ClientShareHolder }>()
);
export const updateClientShareHolderFailure = createAction(
  '[ClientShareHolders] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadClientShareHoldersByClientId = createAction(
  '[ClientShareHolders] Load By ClientId',
  props<{ clientId: number }>()
);
export const loadClientShareHoldersByClientIdSuccess = createAction(
  '[ClientShareHolders] Load By ClientId Success',
  props<{ items: any }>()
);
export const loadClientShareHoldersByClientIdFailure = createAction(
  '[ClientShareHolders] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteClientShareHolder = createAction(
  '[ClientShareHolders] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteClientShareHolderSuccess = createAction(
  '[ClientShareHolders] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteClientShareHolderFailure = createAction(
  '[ClientShareHolders] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
