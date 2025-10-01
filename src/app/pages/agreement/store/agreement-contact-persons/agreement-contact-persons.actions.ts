import { createAction, props } from '@ngrx/store';
import { AgreementContactPerson } from './agreement-contact-person.model';

// Load all
export const loadAgreementContactPersons = createAction(
  '[AgreementContactPersons] Load All'
);
export const loadAgreementContactPersonsSuccess = createAction(
  '[AgreementContactPersons] Load All Success',
  props<{ items: AgreementContactPerson[]; totalCount: number }>()
);
export const loadAgreementContactPersonsFailure = createAction(
  '[AgreementContactPersons] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadAgreementContactPersonsHistory = createAction(
  '[AgreementContactPersons] Load History'
);
export const loadAgreementContactPersonsHistorySuccess = createAction(
  '[AgreementContactPersons] Load History Success',
  props<{ history: AgreementContactPerson[] }>()
);
export const loadAgreementContactPersonsHistoryFailure = createAction(
  '[AgreementContactPersons] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadAgreementContactPerson = createAction(
  '[AgreementContactPersons] Load One',
  props<{ id: number }>()
);
export const loadAgreementContactPersonSuccess = createAction(
  '[AgreementContactPersons] Load One Success',
  props<{ client: AgreementContactPerson }>()
);
export const loadAgreementContactPersonFailure = createAction(
  '[AgreementContactPersons] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createAgreementContactPerson = createAction(
  '[AgreementContactPersons] Create',
  props<{ data: Partial<AgreementContactPerson> }>()
);
export const createAgreementContactPersonSuccess = createAction(
  '[AgreementContactPersons] Create Success',
  props<{ client: AgreementContactPerson }>()
);
export const createAgreementContactPersonFailure = createAction(
  '[AgreementContactPersons] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateAgreementContactPerson = createAction(
  '[AgreementContactPersons] Update',
  props<{ id: number; data: Partial<AgreementContactPerson> }>()
);
export const updateAgreementContactPersonSuccess = createAction(
  '[AgreementContactPersons] Update Success',
  props<{ client: AgreementContactPerson }>()
);
export const updateAgreementContactPersonFailure = createAction(
  '[AgreementContactPersons] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadAgreementContactPersonsByClientId = createAction(
  '[AgreementContactPersons] Load By ClientId',
  props<{ clientId: number }>()
);
export const loadAgreementContactPersonsByClientIdSuccess = createAction(
  '[AgreementContactPersons] Load By ClientId Success',
  props<{ items: any }>()
);
export const loadAgreementContactPersonsByClientIdFailure = createAction(
  '[AgreementContactPersons] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteAgreementContactPerson = createAction(
  '[AgreementContactPersons] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteAgreementContactPersonSuccess = createAction(
  '[AgreementContactPersons] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteAgreementContactPersonFailure = createAction(
  '[AgreementContactPersons] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
