import { createReducer, on } from '@ngrx/store';
import * as DocumentTypeActions from './document-type.actions';
import { DocumentType } from '../../../../../shared/interfaces/document-type.interface';

export interface DocumentTypeState {
  items: DocumentType[];
  loading: boolean;
  error: any;
}

export const initialState: DocumentTypeState = {
  items: [],
  loading: false,
  error: null,
};

export const documentTypeReducer = createReducer(
  initialState,
  on(DocumentTypeActions.loadDocumentTypes, (state) => ({
    ...state,
    loading: true,
  })),
  on(DocumentTypeActions.loadDocumentTypesSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
  })),
  on(DocumentTypeActions.loadDocumentTypesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
