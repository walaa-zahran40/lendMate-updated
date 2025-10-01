import { createReducer, on } from '@ngrx/store';
import * as Actions from './agreement-files.actions';
import { initialAgreementFilesState } from './agreement-files.state';

export const agreementFilesReducer = createReducer(
  initialAgreementFilesState,
  on(Actions.loadAgreementFiles, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadAgreementFilesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadAgreementFilesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadAgreementFilesHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadAgreementFilesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadAgreementFilesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadAgreementFile, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadAgreementFileSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
    error: null,
  })),
  on(Actions.loadAgreementFileFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createAgreementFile, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createAgreementFileSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createAgreementFileFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateAgreementFile, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateAgreementFileSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateAgreementFileFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteAgreementFile, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteAgreementFileSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteAgreementFileFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadAgreementFilesByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadAgreementFilesByClientIdSuccess, (state, { items }) => ({
    ...state,
    items, // replace with just these rates
    loading: false,
  })),
  on(Actions.loadAgreementFilesByClientIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
