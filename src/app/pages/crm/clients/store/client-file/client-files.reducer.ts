import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-files.actions';
import {
  adapter,
  initialClientFilesState,
  ClientFilesState,
} from './client-files.state';

export const clientFilesReducer = createReducer(
  initialClientFilesState,

  // Load all
  on(Actions.loadClientFiles, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientFilesSuccess, (state, { items, totalCount }) =>
    adapter.setAll(items, { ...state, totalCount, loading: false })
  ),
  on(Actions.loadClientFilesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load history
  on(Actions.loadClientFilesHistory, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientFilesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadClientFilesHistoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load one
  on(Actions.loadClientFile, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientFileSuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadClientFileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(Actions.createClientFile, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.createClientFileSuccess, (state, { client }) =>
    adapter.addOne(client, { ...state, loading: false })
  ),
  on(Actions.createClientFileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update
  on(Actions.updateClientFile, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.updateClientFileSuccess, (state, { client }) =>
    adapter.updateOne(
      { id: client.id!, changes: client },
      { ...state, loading: false }
    )
  ),
  on(Actions.updateClientFileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete
  on(Actions.deleteClientFile, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.deleteClientFileSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(Actions.deleteClientFileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load by client ID
  on(Actions.loadClientFilesByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(Actions.loadClientFilesByClientIdSuccess, (state, { files }) =>
    adapter.setAll(files, { ...state, loaded: true })
  ),
  on(Actions.loadClientFilesByClientIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
