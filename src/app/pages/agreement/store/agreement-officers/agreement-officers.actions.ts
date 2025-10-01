import { createAction, props } from '@ngrx/store';
import { AgreementOfficer } from './agreement-officer.model';

// Load all
export const loadAgreementOfficers = createAction(
  '[AgreementOfficers] Load All'
);
export const loadAgreementOfficersSuccess = createAction(
  '[AgreementOfficers] Load All Success',
  props<{ items: AgreementOfficer[]; totalCount: number }>()
);
export const loadAgreementOfficersFailure = createAction(
  '[AgreementOfficers] Load All Failure',
  props<{ error: any }>()
);
//load by id
export const loadAgreementOfficersByAgreementId = createAction(
  '[AgreementOfficers] Load By AgreementId',
  props<{ agreementId: number }>()
);

export const loadAgreementOfficersByAgreementIdSuccess = createAction(
  '[AgreementOfficers] Load By AgreementId Success',
  props<{ items: AgreementOfficer[]; totalCount: number }>()
);

export const loadAgreementOfficersByAgreementIdFailure = createAction(
  '[AgreementOfficers] Load By AgreementId Failure',
  props<{ error: any }>()
);

// Load history
export const loadAgreementOfficersHistory = createAction(
  '[AgreementOfficers] Load History'
);
export const loadAgreementOfficersHistorySuccess = createAction(
  '[AgreementOfficers] Load History Success',
  props<{ history: AgreementOfficer[] }>()
);
export const loadAgreementOfficersHistoryFailure = createAction(
  '[AgreementOfficers] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadAgreementOfficer = createAction(
  '[AgreementOfficers] Load One',
  props<{ id: number }>()
);
export const loadAgreementOfficerSuccess = createAction(
  '[AgreementOfficers] Load One Success',
  props<{ items: AgreementOfficer[]; totalCount: number }>() // ✅ matches API
);

export const loadAgreementOfficerFailure = createAction(
  '[AgreementOfficers] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createAgreementOfficer = createAction(
  '[AgreementOfficers] Create',
  props<{ data: Partial<AgreementOfficer> }>()
);
export const createAgreementOfficerSuccess = createAction(
  '[AgreementOfficers] Create Success',
  props<{ client: AgreementOfficer }>()
);
export const createAgreementOfficerFailure = createAction(
  '[AgreementOfficers] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateAgreementOfficer = createAction(
  '[AgreementOfficers] Update',
  props<{ id: number; data: Partial<AgreementOfficer> }>()
);
export const updateAgreementOfficerSuccess = createAction(
  '[AgreementOfficers] Update Success',
  props<{ client: AgreementOfficer }>()
);
export const updateAgreementOfficerFailure = createAction(
  '[AgreementOfficers] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadAgreementOfficersByClientId = createAction(
  '[AgreementOfficers] Load By ClientId',
  props<{ clientId: number | undefined }>()
);
export const loadAgreementOfficersByClientIdSuccess = createAction(
  '[AgreementOfficers] Load By ClientId Success',
  props<{ items: any }>()
);
export const loadAgreementOfficersByClientIdFailure = createAction(
  '[AgreementOfficers] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteAgreementOfficer = createAction(
  '[AgreementOfficers] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteAgreementOfficerSuccess = createAction(
  '[AgreementOfficers] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteAgreementOfficerFailure = createAction(
  '[AgreementOfficers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
