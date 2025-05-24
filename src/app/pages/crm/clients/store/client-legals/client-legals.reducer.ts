import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-legals.actions';
import { initialClientLegalsState } from './client-legals.state';

export const clientLegalsReducer = createReducer(
  initialClientLegalsState,
  on(Actions.loadClientLegals, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientLegalsSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadClientLegalsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientLegalsHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientLegalsHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadClientLegalsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientLegal, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientLegalSuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadClientLegalFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createClientLegal, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createClientLegalSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createClientLegalFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateClientLegal, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateClientLegalSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateClientLegalFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteClientLegal, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteClientLegalSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteClientLegalFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadClientLegalsByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientLegalsByClientIdSuccess, (state, { items }) => ({
    ...state,
    items, // replace with just these rates
    loading: false,
  })),
  on(Actions.loadClientLegalsByClientIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
