import { createAction, props } from '@ngrx/store';
import { ClientLegal } from './client-legal.model';

// Load all
export const loadClientLegals = createAction(
  '[ClientLegals] Load All'
);
export const loadClientLegalsSuccess = createAction(
  '[ClientLegals] Load All Success',
  props<{ items: ClientLegal[]; totalCount: number }>()
);
export const loadClientLegalsFailure = createAction(
  '[ClientLegals] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadClientLegalsHistory = createAction(
  '[ClientLegals] Load History'
);
export const loadClientLegalsHistorySuccess = createAction(
  '[ClientLegals] Load History Success',
  props<{ history: ClientLegal[] }>()
);
export const loadClientLegalsHistoryFailure = createAction(
  '[ClientLegals] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadClientLegal = createAction(
  '[ClientLegals] Load One',
  props<{ id: number }>()
);
export const loadClientLegalSuccess = createAction(
  '[ClientLegals] Load One Success',
  props<{ client: ClientLegal }>()
);
export const loadClientLegalFailure = createAction(
  '[ClientLegals] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createClientLegal = createAction(
  '[ClientLegals] Create',
  props<{ data: Partial<ClientLegal> }>()
);
export const createClientLegalSuccess = createAction(
  '[ClientLegals] Create Success',
  props<{ client: ClientLegal }>()
);
export const createClientLegalFailure = createAction(
  '[ClientLegals] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateClientLegal = createAction(
  '[ClientLegals] Update',
  props<{ id: number; data: Partial<ClientLegal> }>()
);
export const updateClientLegalSuccess = createAction(
  '[ClientLegals] Update Success',
  props<{ client: ClientLegal }>()
);
export const updateClientLegalFailure = createAction(
  '[ClientLegals] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadClientLegalsByClientId = createAction(
  '[ClientLegals] Load By ClientId',
  props<{ clientId: number }>()
);
export const loadClientLegalsByClientIdSuccess = createAction(
  '[ClientLegals] Load By ClientId Success',
  props<{ items: any }>()
);
export const loadClientLegalsByClientIdFailure = createAction(
  '[ClientLegals] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteClientLegal = createAction(
  '[ClientLegals] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteClientLegalSuccess = createAction(
  '[ClientLegals] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteClientLegalFailure = createAction(
  '[ClientLegals] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
