import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentTypesState } from './document-types.state';

export const selectDocumentTypesState =
  createFeatureSelector<DocumentTypesState>('documentTypes');
export const selectDocumentTypes = createSelector(
  selectDocumentTypesState,
  (state) => state.items
);
export const selectDocumentTypesTotal = createSelector(
  selectDocumentTypesState,
  (state) => state.totalCount
);
export const selectDocumentTypesHistory = createSelector(
  selectDocumentTypesState,
  (state) => state.history
);
export const selectCurrentDocumentType = createSelector(
  selectDocumentTypesState,
  (state) => state.current
);
export const selectDocumentTypesLoading = createSelector(
  selectDocumentTypesState,
  (state) => state.loading
);
export const selectDocumentTypesError = createSelector(
  selectDocumentTypesState,
  (state) => state.error
);

