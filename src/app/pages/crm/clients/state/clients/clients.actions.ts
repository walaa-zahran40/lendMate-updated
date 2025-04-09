import { createAction, props } from '@ngrx/store';
import { Client } from '../../../../../shared/interfaces/client.interface';

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
