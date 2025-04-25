import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentTypeState } from './document-type.reducer';

export const selectDocumentTypeState =
  createFeatureSelector<DocumentTypeState>('documentTypes');

export const selectAllDocumentTypes = createSelector(
  selectDocumentTypeState,
  (state) => state.items
);

export const selectDocumentTypesLoading = createSelector(
  selectDocumentTypeState,
  (state) => state.loading
);
