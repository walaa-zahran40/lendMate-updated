import { createReducer, on } from '@ngrx/store';
import * as Actions from './agreement-officers.actions';
import { initialAgreementOfficersState } from './agreement-officers.state';

export const agreementOfficersReducer = createReducer(
  initialAgreementOfficersState,
  on(Actions.loadAgreementOfficers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadAgreementOfficersSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadAgreementOfficersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadAgreementOfficersHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadAgreementOfficersHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadAgreementOfficersHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadAgreementOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadAgreementOfficerSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
  })),
  on(Actions.loadAgreementOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createAgreementOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createAgreementOfficerSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createAgreementOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateAgreementOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateAgreementOfficerSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateAgreementOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteAgreementOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteAgreementOfficerSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteAgreementOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadAgreementOfficersByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadAgreementOfficersByClientIdSuccess, (state, { items }) => ({
    ...state,
    items, // replace with just these rates
    loading: false,
  })),
  on(Actions.loadAgreementOfficersByClientIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
