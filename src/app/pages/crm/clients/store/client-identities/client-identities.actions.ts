import { createAction, props } from '@ngrx/store';
import { ClientIdentity, PagedResult } from './client-identities.service';

export const loadAllClientIdentities = createAction(
  '[ClientIdentities] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllClientIdentitiesSuccess = createAction(
  '[ClientIdentities] Load All Success',
  props<{ result: PagedResult<ClientIdentity> }>()
);
export const loadAllClientIdentitiesFailure = createAction(
  '[ClientIdentities] Load All Failure',
  props<{ error: any }>()
);

export const loadClientIdentitiesByClient = createAction(
  '[ClientIdentities] Load By Client',
  props<{ clientId: number }>()
);
export const loadClientIdentitiesByClientSuccess = createAction(
  '[ClientIdentities] Load By Client Success',
  props<{ items: ClientIdentity[] }>()
);
export const loadClientIdentitiesByClientFailure = createAction(
  '[ClientIdentities] Load By Client Failure',
  props<{ error: any }>()
);

export const createClientIdentity = createAction(
  '[ClientIdentities] Create',
  props<{ payload: Omit<ClientIdentity, 'id'> }>()
);
export const createClientIdentitySuccess = createAction(
  '[ClientIdentities] Create Success',
  props<{ entity: ClientIdentity }>()
);
export const createClientIdentityFailure = createAction(
  '[ClientIdentities] Create Failure',
  props<{ error: any }>()
);

export const updateClientIdentity = createAction(
  '[ClientIdentities] Update',
  props<{ id: number; changes: Partial<ClientIdentity> }>()
);
export const updateClientIdentitySuccess = createAction(
  '[ClientIdentities] Update Success',
  props<{ entity: ClientIdentity }>()
);
export const updateClientIdentityFailure = createAction(
  '[ClientIdentities] Update Failure',
  props<{ error: any }>()
);

export const deleteClientIdentity = createAction(
  '[ClientIdentities] Delete',
  props<{ id: number }>()
);
export const deleteClientIdentitySuccess = createAction(
  '[ClientIdentities] Delete Success',
  props<{ id: number }>()
);
export const deleteClientIdentityFailure = createAction(
  '[ClientIdentities] Delete Failure',
  props<{ error: any }>()
);
