import { createAction, props } from '@ngrx/store';
import { ClientIdentity } from './client-identity.model';

// Load all
export const loadClientIdentities = createAction(
  '[ClientIdentities] Load All'
);
export const loadClientIdentitiesSuccess = createAction(
  '[ClientIdentities] Load All Success',
  props<{ items: ClientIdentity[]; totalCount: number }>()
);
export const loadClientIdentitiesFailure = createAction(
  '[ClientIdentities] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadClientIdentitiesHistory = createAction(
  '[ClientIdentities] Load History'
);
export const loadClientIdentitiesHistorySuccess = createAction(
  '[ClientIdentities] Load History Success',
  props<{ history: ClientIdentity[] }>()
);
export const loadClientIdentitiesHistoryFailure = createAction(
  '[ClientIdentities] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadClientIdentity = createAction(
  '[ClientIdentities] Load One',
  props<{ id: number }>()
);
export const loadClientIdentitySuccess = createAction(
  '[ClientIdentities] Load One Success',
  props<{ client: ClientIdentity }>()
);
export const loadClientIdentityFailure = createAction(
  '[ClientIdentities] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createClientIdentity = createAction(
  '[ClientIdentities] Create',
  props<{ data: Partial<ClientIdentity> }>()
);
export const createClientIdentitySuccess = createAction(
  '[ClientIdentities] Create Success',
  props<{ client: ClientIdentity }>()
);
export const createClientIdentityFailure = createAction(
  '[ClientIdentities] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateClientIdentity = createAction(
  '[ClientIdentities] Update',
  props<{ id: number; data: Partial<ClientIdentity> }>()
);
export const updateClientIdentitySuccess = createAction(
  '[ClientIdentities] Update Success',
  props<{ client: ClientIdentity }>()
);
export const updateClientIdentityFailure = createAction(
  '[ClientIdentities] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadClientIdentitiesByClientId = createAction(
  '[ClientIdentities] Load By ClientId',
  props<{ clientId: number }>()
);
export const loadClientIdentitiesByClientIdSuccess = createAction(
  '[ClientIdentities] Load By ClientId Success',
  props<{ items: ClientIdentity[] }>()
);
export const loadClientIdentitiesByClientIdFailure = createAction(
  '[ClientIdentities] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteClientIdentity = createAction(
  '[ClientIdentities] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteClientIdentitySuccess = createAction(
  '[ClientIdentities] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteClientIdentityFailure = createAction(
  '[ClientIdentities] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
