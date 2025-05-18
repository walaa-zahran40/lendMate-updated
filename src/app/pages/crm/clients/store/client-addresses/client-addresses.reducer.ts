import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-addresses.actions';
import { initialClientAddressesState } from './client-addresses.state';

export const clientAddressesReducer = createReducer(
  initialClientAddressesState,
  on(Actions.loadClientAddresses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientAddressesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadClientAddressesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientAddressesHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientAddressesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadClientAddressesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientAddress, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientAddressSuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadClientAddressFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createClientAddress, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createClientAddressSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createClientAddressFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateClientAddress, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateClientAddressSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateClientAddressFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteClientAddress, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteClientAddressSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteClientAddressFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadClientAddressesByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientAddressesByClientIdSuccess, (state, { items }) => ({
    ...state,
    items, // replace with just these rates
    loading: false,
  })),
  on(Actions.loadClientAddressesByClientIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
