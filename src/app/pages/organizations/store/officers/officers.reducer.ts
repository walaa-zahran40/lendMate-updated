import { createReducer, on } from '@ngrx/store';
import * as Actions from './officers.actions';
import { initialOfficersState } from './officers.state';

export const OfficersReducer = createReducer(
  initialOfficersState,
  on(Actions.loadOfficers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadOfficersSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadOfficersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadOfficersHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadOfficersHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadOfficersHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadOfficer, (state) => ({ ...state, loading: true })),
  on(Actions.loadOfficerSuccess, (state, { Officer }) => ({
    ...state,
    current: Officer,
    loading: false,
  })),
  on(Actions.loadOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createOfficer, (state) => ({ ...state, loading: true })),
  on(Actions.createOfficerSuccess, (state, { Officer }) => ({
    ...state,
    items: [...state.items, Officer],
    loading: false,
  })),
  on(Actions.createOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateOfficer, (state) => ({ ...state, loading: true })),
  on(Actions.updateOfficerSuccess, (state, { Officer }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === Officer.id ? Officer : ct
    ),
    loading: false,
  })),
  on(Actions.updateOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteOfficer, (state) => ({ ...state, loading: true })),
  on(Actions.deleteOfficerSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
