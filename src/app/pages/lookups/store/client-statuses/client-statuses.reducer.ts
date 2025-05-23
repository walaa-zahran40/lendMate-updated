import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-statuses.actions';
import { initialClientStatusesState } from './client-statuses.state';

export const clientStatusesReducer = createReducer(
  initialClientStatusesState,
  on(Actions.loadClientStatuses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientStatusesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadClientStatusesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientStatusesHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadClientStatusesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadClientStatusesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientStatus, (state) => ({ ...state, loading: true })),
  on(Actions.loadClientStatusSuccess, (state, { clientStatus }) => ({
    ...state,
    current: clientStatus,
    loading: false,
  })),
  on(Actions.loadClientStatusFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createClientStatus, (state) => ({ ...state, loading: true })),
  on(Actions.createClientStatusSuccess, (state, { clientStatus }) => ({
    ...state,
    items: [...state.items, clientStatus],
    loading: false,
  })),
  on(Actions.createClientStatusFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateClientStatus, (state) => ({ ...state, loading: true })),
  on(Actions.updateClientStatusSuccess, (state, { clientStatus }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === clientStatus.id ? clientStatus : ct
    ),
    loading: false,
  })),
  on(Actions.updateClientStatusFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteClientStatus, (state) => ({ ...state, loading: true })),
  on(Actions.deleteClientStatusSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteClientStatusFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
