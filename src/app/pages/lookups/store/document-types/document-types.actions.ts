import { createAction, props } from '@ngrx/store';
import { DocumentType } from './document-type.model';

// Load all
export const loadDocumentTypes = createAction('[DocumentTypes] Load All');
export const loadDocumentTypesSuccess = createAction(
  '[DocumentTypes] Load All Success',
  props<{ items: DocumentType[]; totalCount: number }>()
);
export const loadDocumentTypesFailure = createAction(
  '[DocumentTypes] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadDocumentTypesHistory = createAction(
  '[DocumentTypes] Load History'
);
export const loadDocumentTypesHistorySuccess = createAction(
  '[DocumentTypes] Load History Success',
  props<{ history: DocumentType[] }>()
);
export const loadDocumentTypesHistoryFailure = createAction(
  '[DocumentTypes] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadDocumentType = createAction(
  '[DocumentTypes] Load One',
  props<{ id: number }>()
);
export const loadDocumentTypeSuccess = createAction(
  '[DocumentTypes] Load One Success',
  props<{ documentType: DocumentType }>()
);
export const loadDocumentTypeFailure = createAction(
  '[DocumentTypes] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createDocumentType = createAction(
  '[DocumentTypes] Create',
  props<{ data: Partial<DocumentType> }>()
);
export const createDocumentTypeSuccess = createAction(
  '[DocumentTypes] Create Success',
  props<{ documentType: DocumentType }>()
);
export const createDocumentTypeFailure = createAction(
  '[DocumentTypes] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateDocumentType = createAction(
  '[DocumentTypes] Update',
  props<{ id: number; data: Partial<DocumentType> }>()
);
export const updateDocumentTypeSuccess = createAction(
  '[DocumentTypes] Update Success',
  props<{ documentType: DocumentType }>()
);
export const updateDocumentTypeFailure = createAction(
  '[DocumentTypes] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteDocumentType = createAction(
  '[DocumentTypes] Delete',
  props<{ id: number }>()
);
export const deleteDocumentTypeSuccess = createAction(
  '[DocumentTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteDocumentTypeFailure = createAction(
  '[DocumentTypes] Delete Failure',
  props<{ error: any }>()
);
