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
// Upload a single file
export const uploadClientFile = createAction(
  '[Documents] Upload Client File',
  props<{ formData: FormData }>()
);
export const uploadClientFileSuccess = createAction(
  '[Documents] Upload Client File Success',
  props<{ response: any }>()
);
export const uploadClientFileFailure = createAction(
  '[Documents] Upload Client File Failure',
  props<{ error: any }>()
);

// Delete a file
export const deleteClientFile = createAction(
  '[Documents] Delete Client File',
  props<{ id: number }>()
);
export const deleteClientFileSuccess = createAction(
  '[Documents] Delete Client File Success',
  props<{ id: number }>()
);
export const deleteClientFileFailure = createAction(
  '[Documents] Delete Client File Failure',
  props<{ error: any }>()
);
