import { createAction, props } from '@ngrx/store';
import { ClientPhoneNumber } from './client-phone-number.model';

// Load all
export const loadClientPhoneNumbers = createAction(
  '[ClientPhoneNumbers] Load All'
);
export const loadClientPhoneNumbersSuccess = createAction(
  '[ClientPhoneNumbers] Load All Success',
  props<{ items: ClientPhoneNumber[]; totalCount: number }>()
);
export const loadClientPhoneNumbersFailure = createAction(
  '[ClientPhoneNumbers] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadClientPhoneNumbersHistory = createAction(
  '[ClientPhoneNumbers] Load History'
);
export const loadClientPhoneNumbersHistorySuccess = createAction(
  '[ClientPhoneNumbers] Load History Success',
  props<{ history: ClientPhoneNumber[] }>()
);
export const loadClientPhoneNumbersHistoryFailure = createAction(
  '[ClientPhoneNumbers] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadClientPhoneNumber = createAction(
  '[ClientPhoneNumbers] Load One',
  props<{ id: number }>()
);
export const loadClientPhoneNumberSuccess = createAction(
  '[ClientPhoneNumbers] Load One Success',
  props<{ client: ClientPhoneNumber }>()
);
export const loadClientPhoneNumberFailure = createAction(
  '[ClientPhoneNumbers] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createClientPhoneNumber = createAction(
  '[ClientPhoneNumbers] Create',
  props<{ data: Partial<ClientPhoneNumber> }>()
);
export const createClientPhoneNumberSuccess = createAction(
  '[ClientPhoneNumbers] Create Success',
  props<{ client: ClientPhoneNumber }>()
);
export const createClientPhoneNumberFailure = createAction(
  '[ClientPhoneNumbers] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateClientPhoneNumber = createAction(
  '[ClientPhoneNumbers] Update',
  props<{ id: number; data: Partial<ClientPhoneNumber> }>()
);
export const updateClientPhoneNumberSuccess = createAction(
  '[ClientPhoneNumbers] Update Success',
  props<{ client: ClientPhoneNumber }>()
);
export const updateClientPhoneNumberFailure = createAction(
  '[ClientPhoneNumbers] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadClientPhoneNumbersByClientId = createAction(
  '[ClientPhoneNumbers] Load By ClientId',
  props<{ clientId: number }>()
);
export const loadClientPhoneNumbersByClientIdSuccess = createAction(
  '[ClientPhoneNumbers] Load By ClientId Success',
  props<{ clientId: number; items: ClientPhoneNumber[] }>()
);

export const loadClientPhoneNumbersByClientIdFailure = createAction(
  '[ClientPhoneNumbers] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteClientPhoneNumber = createAction(
  '[ClientPhoneNumbers] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteClientPhoneNumberSuccess = createAction(
  '[ClientPhoneNumbers] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteClientPhoneNumberFailure = createAction(
  '[ClientPhoneNumbers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
