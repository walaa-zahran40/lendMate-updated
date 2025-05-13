import { createReducer, on } from '@ngrx/store';
import * as Actions from './branch-officers.actions';
import { initialBranchOfficersState } from './branch-officers.state';

export const branchOfficersReducer = createReducer(
  initialBranchOfficersState,
  on(Actions.loadBranchOfficers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadBranchOfficersSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadBranchOfficersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadBranchOfficersHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadBranchOfficersHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadBranchOfficersHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadBranchOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadBranchOfficerSuccess, (state, { branch }) => ({
    ...state,
    current: branch,
    loading: false,
  })),
  on(Actions.loadBranchOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createBranchOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createBranchOfficerSuccess, (state, { branch }) => ({
    ...state,
    items: [...state.items, branch],
    loading: false,
  })),
  on(Actions.createBranchOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateBranchOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateBranchOfficerSuccess, (state, { branch }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === branch.id ? branch : ct)),
    loading: false,
  })),
  on(Actions.updateBranchOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteBranchOfficer, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteBranchOfficerSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteBranchOfficerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadBranchOfficersByBranchId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadBranchOfficersByBranchIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadBranchOfficersByBranchIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
