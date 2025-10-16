import { createAction, props } from '@ngrx/store';
import { ClientSalesTurnover } from './client-sales-turnovers.model';

// Load all
export const loadClientSalesTurnovers = createAction(
  '[ClientSalesTurnovers] Load All'
);
export const loadClientSalesTurnoversSuccess = createAction(
  '[ClientSalesTurnovers] Load All Success',
  props<{ items: ClientSalesTurnover[]; totalCount: number }>()
);
export const loadClientSalesTurnoversFailure = createAction(
  '[ClientSalesTurnovers] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadClientSalesTurnoversHistory = createAction(
  '[ClientSalesTurnovers] Load History'
);
export const loadClientSalesTurnoversHistorySuccess = createAction(
  '[ClientSalesTurnovers] Load History Success',
  props<{ history: ClientSalesTurnover[] }>()
);
export const loadClientSalesTurnoversHistoryFailure = createAction(
  '[ClientSalesTurnovers] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadClientSalesTurnover = createAction(
  '[ClientSalesTurnovers] Load One',
  props<{ id: number }>()
);
export const loadClientSalesTurnoverSuccess = createAction(
  '[ClientSalesTurnovers] Load One Success',
  props<{ client: ClientSalesTurnover }>()
);
export const loadClientSalesTurnoverFailure = createAction(
  '[ClientSalesTurnovers] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createClientSalesTurnover = createAction(
  '[ClientSalesTurnovers] Create',
  props<{ data: Partial<ClientSalesTurnover> }>()
);
export const createClientSalesTurnoverSuccess = createAction(
  '[ClientSalesTurnovers] Create Success',
  props<{ client: ClientSalesTurnover }>()
);
export const createClientSalesTurnoverFailure = createAction(
  '[ClientSalesTurnovers] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateClientSalesTurnover = createAction(
  '[ClientSalesTurnovers] Update',
  props<{ id: number; data: Partial<ClientSalesTurnover> }>()
);
export const updateClientSalesTurnoverSuccess = createAction(
  '[ClientSalesTurnovers] Update Success',
  props<{ client: ClientSalesTurnover }>()
);
export const updateClientSalesTurnoverFailure = createAction(
  '[ClientSalesTurnovers] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadClientSalesTurnoversByClientId = createAction(
  '[ClientSalesTurnovers] Load By ClientId',
  props<{ clientId: number }>()
);
export const loadClientSalesTurnoversByClientIdSuccess = createAction(
  '[ClientSalesTurnovers] Load By ClientId Success',
  props<{ items: ClientSalesTurnover[] }>()
);
export const loadClientSalesTurnoversByClientIdFailure = createAction(
  '[ClientSalesTurnovers] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteClientSalesTurnover = createAction(
  '[ClientSalesTurnovers] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteClientSalesTurnoverSuccess = createAction(
  '[ClientSalesTurnovers] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteClientSalesTurnoverFailure = createAction(
  '[ClientSalesTurnovers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
