import { createAction, props } from '@ngrx/store';
import { ClientAddress } from './client-addresses.model';

export const loadClientsAddresses = createAction('[ClientsAddresses] Load All');
export const loadClientsAddressesSuccess = createAction(
  '[ClientsAddresses] Load All Success',
  props<{ items: ClientAddress[]; totalCount: number }>()
);
export const loadClientsAddressesFailure = createAction(
  '[ClientsAddresses] Load All Failure',
  props<{ error: any }>()
);

export const loadClientsAddressesByClient = createAction(
  '[ClientsAddresses] Load By Client',
  props<{ clientId: number }>()
);
export const loadClientsAddressesByClientSuccess = createAction(
  '[ClientsAddresses] Load By Client Success',
  props<{ items: ClientAddress[]; totalCount: number }>()
);
export const loadClientsAddressesByClientFailure = createAction(
  '[ClientsAddresses] Load By Client Failure',
  props<{ error: any }>()
);

export const createClientAddress = createAction(
  '[ClientsAddresses] Create',
  props<{ address: Partial<ClientAddress> }>()
);
export const createClientAddressSuccess = createAction(
  '[ClientsAddresses] Create Success',
  props<{ address: ClientAddress }>()
);
export const createClientAddressFailure = createAction(
  '[ClientsAddresses] Create Failure',
  props<{ error: any }>()
);

export const updateClientAddress = createAction(
  '[ClientsAddresses] Update',
  props<{ id: number; changes: Partial<ClientAddress> }>()
);
export const updateClientAddressSuccess = createAction(
  '[ClientsAddresses] Update Success',
  props<{ address: ClientAddress }>()
);
export const updateClientAddressFailure = createAction(
  '[ClientsAddresses] Update Failure',
  props<{ error: any }>()
);

export const deleteClientAddress = createAction(
  '[ClientsAddresses] Delete',
  props<{ id: number }>()
);
export const deleteClientAddressSuccess = createAction(
  '[ClientsAddresses] Delete Success',
  props<{ id: number }>()
);
export const deleteClientAddressFailure = createAction(
  '[ClientsAddresses] Delete Failure',
  props<{ error: any }>()
);
