import { createAction, props } from '@ngrx/store';
import { ClientContactPerson } from './client-contact-person.model';

// Load all
export const loadClientContactPersons = createAction(
  '[ClientContactPersons] Load All'
);
export const loadClientContactPersonsSuccess = createAction(
  '[ClientContactPersons] Load All Success',
  props<{ items: ClientContactPerson[]; totalCount: number }>()
);
export const loadClientContactPersonsFailure = createAction(
  '[ClientContactPersons] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadClientContactPersonsHistory = createAction(
  '[ClientContactPersons] Load History'
);
export const loadClientContactPersonsHistorySuccess = createAction(
  '[ClientContactPersons] Load History Success',
  props<{ history: ClientContactPerson[] }>()
);
export const loadClientContactPersonsHistoryFailure = createAction(
  '[ClientContactPersons] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadClientContactPerson = createAction(
  '[ClientContactPersons] Load One',
  props<{ id: number }>()
);
export const loadClientContactPersonSuccess = createAction(
  '[ClientContactPersons] Load One Success',
  props<{ client: ClientContactPerson }>()
);
export const loadClientContactPersonFailure = createAction(
  '[ClientContactPersons] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createClientContactPerson = createAction(
  '[ClientContactPersons] Create',
  props<{ data: Partial<ClientContactPerson> }>()
);
export const createClientContactPersonSuccess = createAction(
  '[ClientContactPersons] Create Success',
  props<{ client: ClientContactPerson }>()
);
export const createClientContactPersonFailure = createAction(
  '[ClientContactPersons] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateClientContactPerson = createAction(
  '[ClientContactPersons] Update',
  props<{ id: number; data: Partial<ClientContactPerson> }>()
);
export const updateClientContactPersonSuccess = createAction(
  '[ClientContactPersons] Update Success',
  props<{ client: ClientContactPerson }>()
);
export const updateClientContactPersonFailure = createAction(
  '[ClientContactPersons] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadClientContactPersonsByClientId = createAction(
  '[ClientContactPersons] Load By ClientId',
  props<{ clientId: number }>()
);
export const loadClientContactPersonsByClientIdSuccess = createAction(
  '[ClientContactPersons] Load By ClientId Success',
  props<{ items: ClientContactPerson[] }>()
);
export const loadClientContactPersonsByClientIdFailure = createAction(
  '[ClientContactPersons] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteClientContactPerson = createAction(
  '[ClientContactPersons] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteClientContactPersonSuccess = createAction(
  '[ClientContactPersons] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteClientContactPersonFailure = createAction(
  '[ClientContactPersons] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
