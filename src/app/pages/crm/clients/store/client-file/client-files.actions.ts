import { createAction, props } from '@ngrx/store';
import { ClientFile } from './client-file.model';

// Load all
export const loadClientFiles = createAction('[ClientFiles] Load All');
export const loadClientFilesSuccess = createAction(
  '[ClientFiles] Load All Success',
  props<{ items: ClientFile[]; totalCount: number }>()
);
export const loadClientFilesFailure = createAction(
  '[ClientFiles] Load All Failure',
  props<{ error: any }>()
);
export const loadClientFilesByClientIdSuccess = createAction(
  '[ClientFiles] Load By Client Success',
  props<{ files: ClientFile[] }>() // ← now `files`
);
// Load history
export const loadClientFilesHistory = createAction(
  '[ClientFiles] Load History'
);
export const loadClientFilesHistorySuccess = createAction(
  '[ClientFiles] Load History Success',
  props<{ history: ClientFile[] }>()
);
export const loadClientFilesHistoryFailure = createAction(
  '[ClientFiles] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadClientFile = createAction(
  '[ClientFiles] Load One',
  props<{ id: number }>()
);
export const loadClientFileSuccess = createAction(
  '[ClientFiles] Load One Success',
  props<{ client: ClientFile }>()
);
export const loadClientFileFailure = createAction(
  '[ClientFiles] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createClientFile = createAction(
  '[ClientFiles] Create',
  props<{ data: Partial<ClientFile> }>()
);
export const createClientFileSuccess = createAction(
  '[ClientFiles] Create Success',
  props<{ client: ClientFile }>()
);
export const createClientFileFailure = createAction(
  '[ClientFiles] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateClientFile = createAction(
  '[ClientFiles] Update',
  props<{ id: number; data: Partial<ClientFile> }>()
);
export const updateClientFileSuccess = createAction(
  '[ClientFiles] Update Success',
  props<{ client: ClientFile }>()
);
export const updateClientFileFailure = createAction(
  '[ClientFiles] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadClientFilesByClientId = createAction(
  '[ClientFiles] Load By ClientId',
  props<{ clientId: number }>()
);

export const loadClientFilesByClientIdFailure = createAction(
  '[ClientFiles] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteClientFile = createAction(
  '[ClientFiles] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteClientFileSuccess = createAction(
  '[ClientFiles] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteClientFileFailure = createAction(
  '[ClientFiles] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
