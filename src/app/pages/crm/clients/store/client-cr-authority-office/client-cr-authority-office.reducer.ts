import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-cr-authority-office.actions';
import { initialClientCRAuthorityOfficesState } from './client-cr-authority-office.state';

export const clientCRAuthorityOfficesReducer = createReducer(
  initialClientCRAuthorityOfficesState,
  on(Actions.loadClientCRAuthorityOffices, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientCRAuthorityOfficesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadClientCRAuthorityOfficesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientCRAuthorityOfficesHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientCRAuthorityOfficesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadClientCRAuthorityOfficesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientCRAuthorityOffice, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientCRAuthorityOfficeSuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadClientCRAuthorityOfficeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createClientCRAuthorityOffice, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createClientCRAuthorityOfficeSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createClientCRAuthorityOfficeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateClientCRAuthorityOffice, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateClientCRAuthorityOfficeSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateClientCRAuthorityOfficeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteClientCRAuthorityOffice, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteClientCRAuthorityOfficeSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteClientCRAuthorityOfficeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadClientCRAuthorityOfficesByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientCRAuthorityOfficesByClientIdSuccess, (state, { items }) => ({
    ...state,
    items, // replace with just these rates
    loading: false,
  })),
  on(Actions.loadClientCRAuthorityOfficesByClientIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
