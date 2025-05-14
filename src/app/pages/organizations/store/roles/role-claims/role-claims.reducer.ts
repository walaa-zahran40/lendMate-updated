import { createReducer, on } from '@ngrx/store';
import * as Actions from './role-claims.actions';
import { initialBranchAddressesState } from './role-claims.state';

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

  on(Actions.loadBranchAddressesHistory, (state) => ({
    ...state,
    loading: true,
  })),
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

  on(Actions.loadBranchAddress, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadBranchAddressSuccess, (state, { branch }) => ({
    ...state,
    current: branch,
    loading: false,
  })),
  on(Actions.loadBranchAddressFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createBranchAddress, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createBranchAddressSuccess, (state, { branch }) => ({
    ...state,
    items: [...state.items, branch],
    loading: false,
  })),
  on(Actions.createBranchAddressFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateBranchAddress, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateBranchAddressSuccess, (state, { branch }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === branch.id ? branch : ct)),
    loading: false,
  })),
  on(Actions.updateBranchAddressFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteBranchAddress, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteBranchAddressSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteBranchAddressFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadBranchAddressesByBranchId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadBranchAddressesByBranchIdSuccess, (state, { items }) => ({
    ...state,
    items, // replace with just these rates
    loading: false,
  })),
  on(Actions.loadBranchAddressesByBranchIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
