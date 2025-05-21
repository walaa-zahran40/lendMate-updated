import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-tml-officers.actions';
import { initialClientTMLOfficersState } from './client-tml-officers.state';

export const clientTMLOfficersReducer = createReducer(
  initialClientTMLOfficersState,
  on(Actions.loadClientTMLOfficers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientTMLOfficersSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadClientTMLOfficersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientTMLOfficersHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientTMLOfficersHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadClientTMLOfficersHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientTMLOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientTMLOfficerSuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadClientTMLOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createClientTMLOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createClientTMLOfficerSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createClientTMLOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateClientTMLOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateClientTMLOfficerSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateClientTMLOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteClientTMLOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteClientTMLOfficerSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteClientTMLOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadClientTMLOfficersByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientTMLOfficersByClientIdSuccess, (state, { items }) => ({
    ...state,
    items, // replace with just these rates
    loading: false,
  })),
  on(Actions.loadClientTMLOfficersByClientIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
