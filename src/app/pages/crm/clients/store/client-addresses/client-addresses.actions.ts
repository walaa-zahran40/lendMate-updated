import { createAction, props } from '@ngrx/store';
import { ClientAddress } from './client-address.model';

// Load all
export const loadClientAddresses = createAction('[ClientAddresses] Load All');
export const loadClientAddressesSuccess = createAction(
  '[ClientAddresses] Load All Success',
  props<{ items: ClientAddress[]; totalCount: number }>()
);
export const loadClientAddressesFailure = createAction(
  '[ClientAddresses] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadClientAddressesHistory = createAction(
  '[ClientAddresses] Load History'
);
export const loadClientAddressesHistorySuccess = createAction(
  '[ClientAddresses] Load History Success',
  props<{ history: ClientAddress[] }>()
);
export const loadClientAddressesHistoryFailure = createAction(
  '[ClientAddresses] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadClientAddress = createAction(
  '[ClientAddresses] Load One',
  props<{ id: number }>()
);
export const loadClientAddressSuccess = createAction(
  '[ClientAddresses] Load One Success',
  props<{ client: ClientAddress }>()
);
export const loadClientAddressFailure = createAction(
  '[ClientAddresses] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createClientAddress = createAction(
  '[ClientAddresses] Create',
  props<{ data: Partial<ClientAddress> }>()
);
export const createClientAddressSuccess = createAction(
  '[ClientAddresses] Create Success',
  props<{ client: ClientAddress }>()
);
export const createClientAddressFailure = createAction(
  '[ClientAddresses] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateClientAddress = createAction(
  '[ClientAddresses] Update',
  props<{ id: number; data: Partial<ClientAddress> }>()
);
export const updateClientAddressSuccess = createAction(
  '[ClientAddresses] Update Success',
  props<{ client: ClientAddress }>()
);
export const updateClientAddressFailure = createAction(
  '[ClientAddresses] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadClientAddressesByClientId = createAction(
  '[ClientAddresses] Load By ClientId',
  props<{ clientId: number }>()
);

export const loadClientAddressesByClientIdSuccess = createAction(
  '[ClientAddresses] Load By ClientId Success',
  props<{ clientId: number; items: ClientAddress[] }>() // 👈 add clientId
);
export const loadClientAddressesByClientIdFailure = createAction(
  '[ClientAddresses] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteClientAddress = createAction(
  '[ClientAddresses] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteClientAddressSuccess = createAction(
  '[ClientAddresses] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteClientAddressFailure = createAction(
  '[ClientAddresses] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
