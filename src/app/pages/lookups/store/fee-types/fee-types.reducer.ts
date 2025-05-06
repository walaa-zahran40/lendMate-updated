import { createReducer, on } from '@ngrx/store';
import * as Actions from './fee-types.actions';
import { initialFeeTypesState } from './fee-types.state';

export const feeTypesReducer = createReducer(
  initialFeeTypesState,
  on(Actions.loadFeeTypes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadFeeTypesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadFeeTypesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadFeeTypesHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadFeeTypesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadFeeTypesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadFeeType, (state) => ({ ...state, loading: true })),
  on(Actions.loadFeeTypeSuccess, (state, { feeType }) => ({
    ...state,
    current: feeType,
    loading: false,
  })),
  on(Actions.loadFeeTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createFeeType, (state) => ({ ...state, loading: true })),
  on(Actions.createFeeTypeSuccess, (state, { feeType }) => ({
    ...state,
    items: [...state.items, feeType],
    loading: false,
  })),
  on(Actions.createFeeTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateFeeType, (state) => ({ ...state, loading: true })),
  on(Actions.updateFeeTypeSuccess, (state, { feeType }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === feeType.id ? feeType : ct
    ),
    loading: false,
  })),
  on(Actions.updateFeeTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteFeeType, (state) => ({ ...state, loading: true })),
  on(Actions.deleteFeeTypeSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteFeeTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
