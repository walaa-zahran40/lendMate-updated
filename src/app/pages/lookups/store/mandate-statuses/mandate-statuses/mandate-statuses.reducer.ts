import { createReducer, on } from '@ngrx/store';
import * as Actions from './mandate-statuses.actions';
import { initialMandateStatusesState } from './mandate-statuses.state';

export const mandateStatusesReducer = createReducer(
  initialMandateStatusesState,
  on(Actions.loadMandateStatuses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadMandateStatusesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadMandateStatusesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadMandateStatusesHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadMandateStatusesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadMandateStatusesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadMandateStatus, (state) => ({ ...state, loading: true })),
  on(Actions.loadMandateStatusSuccess, (state, { MandateStatus }) => ({
    ...state,
    current: MandateStatus,
    loading: false,
  })),
  on(Actions.loadMandateStatusFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createMandateStatus, (state) => ({ ...state, loading: true })),
  on(Actions.createMandateStatusSuccess, (state, { MandateStatus }) => ({
    ...state,
    items: [...state.items, MandateStatus],
    loading: false,
  })),
  on(Actions.createMandateStatusFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateMandateStatus, (state) => ({ ...state, loading: true })),
  on(Actions.updateMandateStatusSuccess, (state, { MandateStatus }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === MandateStatus.id ? MandateStatus : ct
    ),
    loading: false,
  })),
  on(Actions.updateMandateStatusFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteMandateStatus, (state) => ({ ...state, loading: true })),
  on(Actions.deleteMandateStatusSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteMandateStatusFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
