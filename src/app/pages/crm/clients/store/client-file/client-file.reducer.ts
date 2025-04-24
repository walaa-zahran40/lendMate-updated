import { createReducer, on } from '@ngrx/store';
import * as ClientFileActions from './client-file.actions';
import { ClientFileState, initialClientFileState } from './client-file.state';

export const clientFileReducer = createReducer(
  initialClientFileState,
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

  on(ClientFileActions.uploadClientFile, (state) => ({
    ...state,
    uploading: true,
    error: null,
  })),
  on(ClientFileActions.uploadClientFileSuccess, (state, { response }) => ({
    ...state,
    uploading: false,
    response,
  })),
  on(ClientFileActions.uploadClientFileFailure, (state, { error }) => ({
    ...state,
    uploading: false,
    error,
  })),

  on(ClientFileActions.deleteClientFile, (state) => ({
    ...state,
    deleting: true,
    error: null,
  })),
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
