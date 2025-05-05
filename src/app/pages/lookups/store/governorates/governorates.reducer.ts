import { createReducer, on } from '@ngrx/store';
import * as Actions from './governorates.actions';
import { initialGovernoratesState } from './governorates.state';

export const governoratesReducer = createReducer(
  initialGovernoratesState,
  on(Actions.loadGovernorates, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadGovernoratesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadGovernoratesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadGovernoratesHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadGovernoratesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadGovernoratesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadGovernorate, (state) => ({ ...state, loading: true })),
  on(Actions.loadGovernorateSuccess, (state, { governorate }) => ({
    ...state,
    current: governorate,
    loading: false,
  })),
  on(Actions.loadGovernorateFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createGovernorate, (state) => ({ ...state, loading: true })),
  on(Actions.createGovernorateSuccess, (state, { governorate }) => ({
    ...state,
    items: [...state.items, governorate],
    loading: false,
  })),
  on(Actions.createGovernorateFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateGovernorate, (state) => ({ ...state, loading: true })),
  on(Actions.updateGovernorateSuccess, (state, { governorate }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === governorate.id ? governorate : ct
    ),
    loading: false,
  })),
  on(Actions.updateGovernorateFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteGovernorate, (state) => ({ ...state, loading: true })),
  on(Actions.deleteGovernorateSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteGovernorateFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
