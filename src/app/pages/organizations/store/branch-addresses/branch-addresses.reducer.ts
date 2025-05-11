import { createReducer, on } from '@ngrx/store';
import * as Actions from './branch-addresses.actions';
import { initialBranchAddressesState } from './branch-addresses.state';

export const branchAddressesReducer = createReducer(
  initialBranchAddressesState,
  on(Actions.loadBranchAddresses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadBranchAddressesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadBranchAddressesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadBranchAddressesHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadBranchAddressesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadBranchAddressesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadBranchAddress, (state) => ({ ...state, loading: true })),
  on(Actions.loadBranchAddressSuccess, (state, { branchAddress }) => ({
    ...state,
    current: branchAddress,
    loading: false,
  })),
  on(Actions.loadBranchAddressFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createBranchAddress, (state) => ({ ...state, loading: true })),
  on(Actions.createBranchAddressSuccess, (state, { branchAddress }) => ({
    ...state,
    items: [...state.items, branchAddress],
    loading: false,
  })),
  on(Actions.createBranchAddressFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateBranchAddress, (state) => ({ ...state, loading: true })),
  on(Actions.updateBranchAddressSuccess, (state, { branchAddress }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === branchAddress.id ? branchAddress : ct
    ),
    loading: false,
  })),
  on(Actions.updateBranchAddressFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteBranchAddress, (state) => ({ ...state, loading: true })),
  on(Actions.deleteBranchAddressSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteBranchAddressFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
