import { createAction, props } from '@ngrx/store';
import { Document } from '../../../../../shared/interfaces/document.interface';

// Load all client documents
export const loadClientFiles = createAction('[Documents] Load Client Files');
export const loadClientFilesSuccess = createAction(
  '[Documents] Load Client Files Success',
  props<{ documents: Document[] }>()
);
export const loadClientFilesFailure = createAction(
  '[Documents] Load Client Files Failure',
  props<{ error: any }>()
);
// Load documents by client ID
export const loadClientFilesByClientId = createAction(
  '[Documents] Load Client Files By Client',
  props<{ clientId: number }>()
);
export const loadClientFilesByClientIdSuccess = createAction(
  '[Documents] Load Client Files By Client Success',
  props<{ documents: Document[] }>()
);
export const loadClientFilesByClientIdFailure = createAction(
  '[Documents] Load Client Files By Client Failure',
  props<{ error: any }>()
);
// upload with clientId

export const uploadClientFile = createAction(
  '[Documents] Upload Client File',
  props<{ formData: FormData; clientId: number }>()
);

export const loadClientFileById = createAction(
  '[Documents] Load Client File By ID',
  props<{ id: number }>()
);

export const loadClientFileByIdSuccess = createAction(
  '[Documents] Load Client File By ID Success',
  props<{ document: any }>()
);

export const loadClientFileByIdFailure = createAction(
  '[Documents] Load Client File By ID Failure',
  props<{ error: any }>()
);
export const updateClientFile = createAction(
  '[Client File] Update Client File',
  props<{ id: number; payload: any }>() // <-- no FormData, no clientId
);

export const uploadClientFileSuccess = createAction(
  '[Documents] Upload Client File Success',
  props<{ document: Document; clientId: number }>()
);

export const uploadClientFileFailure = createAction(
  '[Documents] Upload Client File Failure',
  props<{ error: any }>()
);

// delete with clientId
export const deleteClientFile = createAction(
  '[Documents] Delete Client File',
  props<{ id: number; clientId: number }>()
);

export const deleteClientFileSuccess = createAction(
  '[Documents] Delete Client File Success',
  props<{ id: number; clientId: number }>()
);
export const deleteClientFileFailure = createAction(
  '[Documents] Delete Client File Failure',
  props<{ error: any }>()
);
