import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-guarantors.actions';
import { initialClientGuarantorsState } from './client-guarantors.state';

export const clientGuarantorsReducer = createReducer(
  initialClientGuarantorsState,
  on(Actions.loadClientGuarantors, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientGuarantorsSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadClientGuarantorsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientGuarantorsHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientGuarantorsHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadClientGuarantorsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientGuarantor, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientGuarantorSuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadClientGuarantorFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createClientGuarantor, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createClientGuarantorSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createClientGuarantorFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateClientGuarantor, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateClientGuarantorSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateClientGuarantorFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteClientGuarantor, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteClientGuarantorSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteClientGuarantorFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadClientGuarantorsByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientGuarantorsByClientIdSuccess, (state, { items }) => ({
    ...state,
    items, // replace with just these rates
    loading: false,
  })),
  on(Actions.loadClientGuarantorsByClientIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
