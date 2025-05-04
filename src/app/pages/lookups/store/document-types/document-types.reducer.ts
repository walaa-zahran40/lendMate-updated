import { createReducer, on } from '@ngrx/store';
import * as Actions from './document-types.actions';
import { initialDocumentTypesState } from './document-types.state';

export const documentTypeReducer = createReducer(
  initialDocumentTypesState,
  on(Actions.loadDocumentTypes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadDocumentTypesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadDocumentTypesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadDocumentTypesHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadDocumentTypesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadDocumentTypesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadDocumentType, (state) => ({ ...state, loading: true })),
  on(Actions.loadDocumentTypeSuccess, (state, { documentType }) => ({
    ...state,
    current: documentType,
    loading: false,
  })),
  on(Actions.loadDocumentTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createDocumentType, (state) => ({ ...state, loading: true })),
  on(Actions.createDocumentTypeSuccess, (state, { documentType }) => ({
    ...state,
    items: [...state.items, documentType],
    loading: false,
  })),
  on(Actions.createDocumentTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateDocumentType, (state) => ({ ...state, loading: true })),
  on(Actions.updateDocumentTypeSuccess, (state, { documentType }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === documentType.id ? documentType : ct
    ),
    loading: false,
  })),
  on(Actions.updateDocumentTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteDocumentType, (state) => ({ ...state, loading: true })),
  on(Actions.deleteDocumentTypeSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteDocumentTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
