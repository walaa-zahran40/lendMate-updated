import { createReducer, on } from '@ngrx/store';
import * as ClientFileActions from './client-file.actions';
import { ClientFileState, initialClientFileState } from './client-file.state';

export const clientFileReducer = createReducer(
  initialClientFileState,

  // — loading all files unchanged —
  on(ClientFileActions.loadClientFiles, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClientFileActions.loadClientFilesSuccess, (state, { documents }) => ({
    ...state,
    loading: false,
    documents,
  })),
  on(ClientFileActions.loadClientFilesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // — loading by clientId unchanged —
  on(ClientFileActions.loadClientFilesByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    ClientFileActions.loadClientFilesByClientIdSuccess,
    (state, { documents }) => ({
      ...state,
      loading: false,
      documents,
    })
  ),
  on(
    ClientFileActions.loadClientFilesByClientIdFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),

  // — upload start sets uploading flag —
  on(ClientFileActions.uploadClientFile, (state) => ({
    ...state,
    uploading: true,
    error: null,
  })),
  // ◀️ upload success now receives { document, clientId }
  on(ClientFileActions.uploadClientFileSuccess, (state, { document }) => ({
    ...state,
    uploading: false,
    // append the new document into the list
    documents: [...state.documents, document],
  })),
  on(ClientFileActions.uploadClientFileFailure, (state, { error }) => ({
    ...state,
    uploading: false,
    error,
  })),

  // — delete start sets deleting flag —
  on(ClientFileActions.deleteClientFile, (state) => ({
    ...state,
    deleting: true,
    error: null,
  })),
  // ◀️ delete success receives { id, clientId }
  on(ClientFileActions.deleteClientFileSuccess, (state, { id }) => ({
    ...state,
    deleting: false,
    documents: state.documents.filter((doc) => doc.id !== id),
  })),
  on(ClientFileActions.deleteClientFileFailure, (state, { error }) => ({
    ...state,
    deleting: false,
    error,
  }))
);
