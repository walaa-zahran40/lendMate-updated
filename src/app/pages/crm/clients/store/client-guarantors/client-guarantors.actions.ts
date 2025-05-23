import { createAction, props } from '@ngrx/store';
import { ClientGuarantor } from './client-guarantor.model';

// Load all
export const loadClientGuarantors = createAction('[ClientGuarantors] Load All');
export const loadClientGuarantorsSuccess = createAction(
  '[ClientGuarantors] Load All Success',
  props<{ items: ClientGuarantor[]; totalCount: number }>()
);
export const loadClientGuarantorsFailure = createAction(
  '[ClientGuarantors] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadClientGuarantorsHistory = createAction(
  '[ClientGuarantors] Load History'
);
export const loadClientGuarantorsHistorySuccess = createAction(
  '[ClientGuarantors] Load History Success',
  props<{ history: ClientGuarantor[] }>()
);
export const loadClientGuarantorsHistoryFailure = createAction(
  '[ClientGuarantors] Load History Failure',
  props<{ error: any }>()
);
// Load by ID
export const loadClientGuarantor = createAction(
  '[ClientGuarantors] Load One',
  props<{ id: number }>()
);
export const loadClientGuarantorSuccess = createAction(
  '[ClientGuarantors] Load One Success',
  props<{ client: ClientGuarantor }>()
);
export const loadClientGuarantorFailure = createAction(
  '[ClientGuarantors] Load One Failure',
  props<{ error: any }>()
);
// Create
export const createClientGuarantor = createAction(
  '[ClientGuarantors] Create',
  props<{ data: Partial<ClientGuarantor> }>()
);
export const createClientGuarantorSuccess = createAction(
  '[ClientGuarantors] Create Success',
  props<{ client: ClientGuarantor }>()
);
export const createClientGuarantorFailure = createAction(
  '[ClientGuarantors] Create Failure',
  props<{ error: any }>()
);
// Update
export const updateClientGuarantor = createAction(
  '[ClientGuarantors] Update',
  props<{ id: number; data: Partial<ClientGuarantor> }>()
);
export const updateClientGuarantorSuccess = createAction(
  '[ClientGuarantors] Update Success',
  props<{ client: ClientGuarantor }>()
);
export const updateClientGuarantorFailure = createAction(
  '[ClientGuarantors] Update Failure',
  props<{ error: any }>()
);
// Load by ClientId
export const loadClientGuarantorsByClientId = createAction(
  '[ClientGuarantors] Load By ClientId',
  props<{ clientId: number }>()
);
export const loadClientGuarantorsByClientIdSuccess = createAction(
  '[ClientGuarantors] Load By ClientId Success',
  props<{ items: any }>()
);
export const loadClientGuarantorsByClientIdFailure = createAction(
  '[ClientGuarantors] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteClientGuarantor = createAction(
  '[ClientGuarantors] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteClientGuarantorSuccess = createAction(
  '[ClientGuarantors] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteClientGuarantorFailure = createAction(
  '[ClientGuarantors] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
