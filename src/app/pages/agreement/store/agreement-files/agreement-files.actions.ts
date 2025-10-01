import { createAction, props } from '@ngrx/store';
import { AgreementFile } from './agreement-file.model';

// Load all
export const loadAgreementFiles = createAction('[AgreementFiles] Load All');
export const loadAgreementFilesSuccess = createAction(
  '[AgreementFiles] Load All Success',
  props<{ items: AgreementFile[]; totalCount: number }>()
);
export const loadAgreementFilesFailure = createAction(
  '[AgreementFiles] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadAgreementFilesHistory = createAction(
  '[AgreementFiles] Load History'
);
export const loadAgreementFilesHistorySuccess = createAction(
  '[AgreementFiles] Load History Success',
  props<{ history: AgreementFile[] }>()
);
export const loadAgreementFilesHistoryFailure = createAction(
  '[AgreementFiles] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadAgreementFile = createAction(
  '[AgreementFiles] Load One',
  props<{ id: number }>()
);
export const loadAgreementFileSuccess = createAction(
  '[AgreementFiles] Load One Success',
  props<{ client: AgreementFile }>()
);
export const loadAgreementFileFailure = createAction(
  '[AgreementFiles] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createAgreementFile = createAction(
  '[AgreementFiles] Create',
  props<{ data: Partial<AgreementFile> }>()
);
export const createAgreementFileSuccess = createAction(
  '[AgreementFiles] Create Success',
  props<{ client: AgreementFile }>()
);
export const createAgreementFileFailure = createAction(
  '[AgreementFiles] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateAgreementFile = createAction(
  '[AgreementFiles] Update',
  props<{ id: number; data: Partial<AgreementFile> }>()
);
export const updateAgreementFileSuccess = createAction(
  '[AgreementFiles] Update Success',
  props<{ client: AgreementFile }>()
);
export const updateAgreementFileFailure = createAction(
  '[AgreementFiles] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadAgreementFilesByClientId = createAction(
  '[AgreementFiles] Load By ClientId',
  props<{ clientId: number }>()
);
export const loadAgreementFilesByClientIdSuccess = createAction(
  '[AgreementFiles] Load By ClientId Success',
  props<{ items: any }>()
);
export const loadAgreementFilesByClientIdFailure = createAction(
  '[AgreementFiles] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteAgreementFile = createAction(
  '[AgreementFiles] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteAgreementFileSuccess = createAction(
  '[AgreementFiles] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteAgreementFileFailure = createAction(
  '[AgreementFiles] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
