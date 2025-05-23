import { createAction, props } from '@ngrx/store';
import { ClientOfficer } from './client-officer.model';

// Load all
export const loadClientOfficers = createAction(
  '[ClientOfficers] Load All'
);
export const loadClientOfficersSuccess = createAction(
  '[ClientOfficers] Load All Success',
  props<{ items: ClientOfficer[]; totalCount: number }>()
);
export const loadClientOfficersFailure = createAction(
  '[ClientOfficers] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadClientOfficersHistory = createAction(
  '[ClientOfficers] Load History'
);
export const loadClientOfficersHistorySuccess = createAction(
  '[ClientOfficers] Load History Success',
  props<{ history: ClientOfficer[] }>()
);
export const loadClientOfficersHistoryFailure = createAction(
  '[ClientOfficers] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadClientOfficer = createAction(
  '[ClientOfficers] Load One',
  props<{ id: number }>()
);
export const loadClientOfficerSuccess = createAction(
  '[ClientOfficers] Load One Success',
  props<{ client: ClientOfficer }>()
);
export const loadClientOfficerFailure = createAction(
  '[ClientOfficers] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createClientOfficer = createAction(
  '[ClientOfficers] Create',
  props<{ data: Partial<ClientOfficer> }>()
);
export const createClientOfficerSuccess = createAction(
  '[ClientOfficers] Create Success',
  props<{ client: ClientOfficer }>()
);
export const createClientOfficerFailure = createAction(
  '[ClientOfficers] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateClientOfficer = createAction(
  '[ClientOfficers] Update',
  props<{ id: number; data: Partial<ClientOfficer> }>()
);
export const updateClientOfficerSuccess = createAction(
  '[ClientOfficers] Update Success',
  props<{ client: ClientOfficer }>()
);
export const updateClientOfficerFailure = createAction(
  '[ClientOfficers] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadClientOfficersByClientId = createAction(
  '[ClientOfficers] Load By ClientId',
  props<{ clientId: number }>()
);
export const loadClientOfficersByClientIdSuccess = createAction(
  '[ClientOfficers] Load By ClientId Success',
  props<{ items: any }>()
);
export const loadClientOfficersByClientIdFailure = createAction(
  '[ClientOfficers] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteClientOfficer = createAction(
  '[ClientOfficers] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteClientOfficerSuccess = createAction(
  '[ClientOfficers] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteClientOfficerFailure = createAction(
  '[ClientOfficers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
