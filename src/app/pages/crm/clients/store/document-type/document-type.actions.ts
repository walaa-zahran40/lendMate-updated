import { createAction, props } from '@ngrx/store';
import { DocumentType } from '../../../../../shared/interfaces/document-type.interface';

export const loadDocumentTypes = createAction('[DocumentTypes] Load');
export const loadDocumentTypesSuccess = createAction(
  '[DocumentTypes] Load Success',
  props<{ items: DocumentType[] }>()
);
export const loadDocumentTypesFailure = createAction(
  '[DocumentTypes] Load Failure',
  props<{ error: any }>()
);
