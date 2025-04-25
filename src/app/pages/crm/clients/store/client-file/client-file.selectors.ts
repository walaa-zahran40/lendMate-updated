import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientFileState, clientFileFeatureKey } from './client-file.state';

const selectClientFileState =
  createFeatureSelector<ClientFileState>(clientFileFeatureKey);

export const selectDocuments = createSelector(
  selectClientFileState,
  (state) => state.documents
);
export const selectLoading = createSelector(
  selectClientFileState,
  (state) => state.loading
);
export const selectUploading = createSelector(
  selectClientFileState,
  (state) => state.uploading
);
export const selectSelectedDocument = createSelector(
  selectClientFileState,
  (state: ClientFileState) => state.selectedDocument
);
export const selectDeleting = createSelector(
  selectClientFileState,
  (state) => state.deleting
);
export const selectError = createSelector(
  selectClientFileState,
  (state) => state.error
);
