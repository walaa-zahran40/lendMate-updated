import { createAction, props } from '@ngrx/store';
import { ClientTMLOfficer } from './client-tml-officer.model';

// Load all
export const loadClientTMLOfficers = createAction('[ClientTMLOfficers] Load All');
export const loadClientTMLOfficersSuccess = createAction(
  '[ClientTMLOfficers] Load All Success',
  props<{ items: ClientTMLOfficer[]; totalCount: number }>()
);
export const loadClientTMLOfficersFailure = createAction(
  '[ClientTMLOfficers] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadClientTMLOfficersHistory = createAction(
  '[ClientTMLOfficers] Load History'
);
export const loadClientTMLOfficersHistorySuccess = createAction(
  '[ClientTMLOfficers] Load History Success',
  props<{ history: ClientTMLOfficer[] }>()
);
export const loadClientTMLOfficersHistoryFailure = createAction(
  '[ClientTMLOfficers] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadClientTMLOfficer = createAction(
  '[ClientTMLOfficers] Load One',
  props<{ id: number }>()
);
export const loadClientTMLOfficerSuccess = createAction(
  '[ClientTMLOfficers] Load One Success',
  props<{ client: ClientTMLOfficer }>()
);
export const loadClientTMLOfficerFailure = createAction(
  '[ClientTMLOfficers] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createClientTMLOfficer = createAction(
  '[ClientTMLOfficers] Create',
  props<{ data: Partial<ClientTMLOfficer> }>()
);
export const createClientTMLOfficerSuccess = createAction(
  '[ClientTMLOfficers] Create Success',
  props<{ client: ClientTMLOfficer }>()
);
export const createClientTMLOfficerFailure = createAction(
  '[ClientTMLOfficers] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateClientTMLOfficer = createAction(
  '[ClientTMLOfficers] Update',
  props<{ id: number; data: Partial<ClientTMLOfficer> }>()
);
export const updateClientTMLOfficerSuccess = createAction(
  '[ClientTMLOfficers] Update Success',
  props<{ client: ClientTMLOfficer }>()
);
export const updateClientTMLOfficerFailure = createAction(
  '[ClientTMLOfficers] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadClientTMLOfficersByClientId = createAction(
  '[ClientTMLOfficers] Load By ClientId',
  props<{ clientId: number }>()
);
export const loadClientTMLOfficersByClientIdSuccess = createAction(
  '[ClientTMLOfficers] Load By ClientId Success',
  props<{ items: any }>()
);
export const loadClientTMLOfficersByClientIdFailure = createAction(
  '[ClientTMLOfficers] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteClientTMLOfficer = createAction(
  '[ClientTMLOfficers] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteClientTMLOfficerSuccess = createAction(
  '[ClientTMLOfficers] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteClientTMLOfficerFailure = createAction(
  '[ClientTMLOfficers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
