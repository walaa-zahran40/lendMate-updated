import { createReducer, on } from '@ngrx/store';
import * as TMLActions from './client-tml-officers.actions';
import { initialTMLOfficersState } from './client-tml-officers.state';

export const clientTMLOfficersReducer = createReducer(
  initialTMLOfficersState,
  on(TMLActions.loadTMLOfficers, (state) => ({ ...state, loading: true })),
  on(TMLActions.loadTMLOfficersSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
  })),
  on(TMLActions.loadTMLOfficersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(TMLActions.createTMLOfficer, (state) => ({ ...state, loading: true })),
  on(TMLActions.createTMLOfficerSuccess, (state, { officer }) => ({
    ...state,
    items: [...state.items, officer],
    loading: false,
  })),
  on(TMLActions.createTMLOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(TMLActions.updateTMLOfficer, (state) => ({ ...state, loading: true })),
  on(TMLActions.updateTMLOfficerSuccess, (state, { officer }) => ({
    ...state,
    items: state.items.map((o) => (o.id === officer.id ? officer : o)),
    loading: false,
  })),
  on(TMLActions.updateTMLOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(TMLActions.deleteTMLOfficer, (state) => ({ ...state, loading: true })),
  on(TMLActions.deleteTMLOfficerSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((o) => o.id !== id),
    loading: false,
  })),
  on(TMLActions.deleteTMLOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(TMLActions.loadTMLOfficersHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(TMLActions.loadTMLOfficersHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(TMLActions.loadTMLOfficersHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
