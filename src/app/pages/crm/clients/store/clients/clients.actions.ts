import { createAction, props } from '@ngrx/store';
import { Client } from './client.model';

export const loadClients = createAction('[Clients] Load Clients');

export const loadClientsSuccess = createAction(
  '[Clients] Load Clients Success',
  props<{ clients: Client[] }>()
);

export const loadClientsFailure = createAction(
  '[Clients] Load Clients Failure',
  props<{ error: any }>()
);
export const createClient = createAction(
  '[Client] Create Client',
  props<{ payload: any }>()
);

export const createClientSuccess = createAction(
  '[Client] Create Client Success',
  props<{ client: any }>() // This MUST return a valid Action
);

export const createClientFailure = createAction(
  '[Client] Create Client Failure',
  props<{ error: any }>()
);
export const updateSubSectorList = createAction(
  '[Client Form] Update SubSector List',
  props<{ subSectorIds: number[] }>()
);
export const deleteClient = createAction(
  '[Clients] Delete Client',
  props<{ clientId: number }>()
);

export const deleteClientSuccess = createAction(
  '[Clients] Delete Client Success',
  props<{ clientId: number }>()
);

export const deleteClientFailure = createAction(
  '[Clients] Delete Client Failure',
  props<{ error: any }>()
);
// Action to load a client for editing using GET API.
export const loadClient = createAction(
  '[Clients] Load Client',
  props<{ clientId: number }>()
);

export const loadClientSuccess = createAction(
  '[Clients] Load Client Success',
  props<{ client: Client }>()
);

export const loadClientFailure = createAction(
  '[Clients] Load Client Failure',
  props<{ error: any }>()
);

// Action to update the client using PUT API.
export const updateClient = createAction(
  '[Clients] Update Client',
  props<{ client: Client }>()
);

export const updateClientSuccess = createAction(
  '[Clients] Update Client Success',
  props<{ client: Client }>()
);

export const updateClientFailure = createAction(
  '[Clients] Update Client Failure',
  props<{ error: any }>()
);
