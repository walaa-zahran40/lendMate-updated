import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-tax-office.actions';
import { initialClientTaxOfficesState } from './client-tax-office.state';

export const clientTaxOfficesReducer = createReducer(
  initialClientTaxOfficesState,
  on(Actions.loadClientTaxOffices, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientTaxOfficesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadClientTaxOfficesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientTaxOfficesHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientTaxOfficesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadClientTaxOfficesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientTaxOffice, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientTaxOfficeSuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadClientTaxOfficeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createClientTaxOffice, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createClientTaxOfficeSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createClientTaxOfficeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateClientTaxOffice, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateClientTaxOfficeSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateClientTaxOfficeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteClientTaxOffice, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteClientTaxOfficeSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteClientTaxOfficeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadClientTaxOfficesByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientTaxOfficesByClientIdSuccess, (state, { items }) => ({
    ...state,
    items, // replace with just these rates
    loading: false,
  })),
  on(Actions.loadClientTaxOfficesByClientIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
