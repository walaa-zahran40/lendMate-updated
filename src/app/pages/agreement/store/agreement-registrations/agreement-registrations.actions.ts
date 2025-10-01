import { createAction, props } from '@ngrx/store';
import { AgreementRegistration } from './agreement-registration.model';

// Load all
export const loadAgreementRegistrations = createAction(
  '[AgreementRegistrations] Load All'
);
export const loadAgreementRegistrationsSuccess = createAction(
  '[AgreementRegistrations] Load All Success',
  props<{ items: AgreementRegistration[]; totalCount: number }>()
);
export const loadAgreementRegistrationsFailure = createAction(
  '[AgreementRegistrations] Load All Failure',
  props<{ error: any }>()
);
//load by id
export const loadAgreementRegistrationsByAgreementId = createAction(
  '[AgreementRegistrations] Load By AgreementId',
  props<{ agreementId: number }>()
);

export const loadAgreementRegistrationsByAgreementIdSuccess = createAction(
  '[AgreementRegistrations] Load By AgreementId Success',
  props<{ items: AgreementRegistration[]; totalCount: number }>()
);

export const loadAgreementRegistrationsByAgreementIdFailure = createAction(
  '[AgreementRegistrations] Load By AgreementId Failure',
  props<{ error: any }>()
);

// Load history
export const loadAgreementRegistrationsHistory = createAction(
  '[AgreementRegistrations] Load History'
);
export const loadAgreementRegistrationsHistorySuccess = createAction(
  '[AgreementRegistrations] Load History Success',
  props<{ history: AgreementRegistration[] }>()
);
export const loadAgreementRegistrationsHistoryFailure = createAction(
  '[AgreementRegistrations] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadAgreementRegistration = createAction(
  '[AgreementRegistrations] Load One',
  props<{ id: number }>()
);
export const loadAgreementRegistrationSuccess = createAction(
  '[AgreementRegistrations] Load One Success',
  props<{ items: AgreementRegistration[]; totalCount?: number }>() // ✅ matches API
);

export const loadAgreementRegistrationFailure = createAction(
  '[AgreementRegistrations] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createAgreementRegistration = createAction(
  '[AgreementRegistrations] Create',
  props<{ data: Partial<AgreementRegistration> }>()
);
export const createAgreementRegistrationSuccess = createAction(
  '[AgreementRegistrations] Create Success',
  props<{ client: AgreementRegistration }>()
);
export const createAgreementRegistrationFailure = createAction(
  '[AgreementRegistrations] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateAgreementRegistration = createAction(
  '[AgreementRegistrations] Update',
  props<{ id: number; data: Partial<AgreementRegistration> }>()
);
export const updateAgreementRegistrationSuccess = createAction(
  '[AgreementRegistrations] Update Success',
  props<{ client: AgreementRegistration }>()
);
export const updateAgreementRegistrationFailure = createAction(
  '[AgreementRegistrations] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadAgreementRegistrationsByClientId = createAction(
  '[AgreementRegistrations] Load By ClientId',
  props<{ clientId: number | undefined }>()
);
export const loadAgreementRegistrationsByClientIdSuccess = createAction(
  '[AgreementRegistrations] Load By ClientId Success',
  props<{ items: any }>()
);
export const loadAgreementRegistrationsByClientIdFailure = createAction(
  '[AgreementRegistrations] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteAgreementRegistration = createAction(
  '[AgreementRegistrations] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteAgreementRegistrationSuccess = createAction(
  '[AgreementRegistrations] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteAgreementRegistrationFailure = createAction(
  '[AgreementRegistrations] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
