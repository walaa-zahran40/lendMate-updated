import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-share-holders.actions';
import { initialClientShareHoldersState } from './client-share-holders.state';

export const clientShareHoldersReducer = createReducer(
  initialClientShareHoldersState,
  on(Actions.loadClientShareHolders, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientShareHoldersSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadClientShareHoldersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientShareHoldersHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientShareHoldersHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadClientShareHoldersHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientShareHolder, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientShareHolderSuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadClientShareHolderFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createClientShareHolder, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createClientShareHolderSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createClientShareHolderFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateClientShareHolder, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateClientShareHolderSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateClientShareHolderFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteClientShareHolder, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteClientShareHolderSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteClientShareHolderFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadClientShareHoldersByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientShareHoldersByClientIdSuccess, (state, { items }) => ({
    ...state,
    items, // replace with just these rates
    loading: false,
  })),
  on(Actions.loadClientShareHoldersByClientIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
