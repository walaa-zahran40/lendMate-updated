import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-officers.actions';
import { initialClientOfficersState } from './client-officers.state';

export const clientOfficersReducer = createReducer(
  initialClientOfficersState,
  on(Actions.loadClientOfficers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientOfficersSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadClientOfficersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientOfficersHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientOfficersHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadClientOfficersHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientOfficerSuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadClientOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createClientOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createClientOfficerSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createClientOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateClientOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateClientOfficerSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateClientOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteClientOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteClientOfficerSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteClientOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadClientOfficersByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientOfficersByClientIdSuccess, (state, { items }) => ({
    ...state,
    items, // replace with just these rates
    loading: false,
  })),
  on(Actions.loadClientOfficersByClientIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
