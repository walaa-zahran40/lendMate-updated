import { createReducer, on } from '@ngrx/store';
import * as Actions from './branch-managers.actions';
import { initialBranchManagersState } from './branch-managers.state';

export const branchManagersReducer = createReducer(
  initialBranchManagersState,
  on(Actions.loadBranchManagers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadBranchManagersSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadBranchManagersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadBranchManagersHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadBranchManagersHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadBranchManagersHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadBranchManager, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadBranchManagerSuccess, (state, { branch }) => ({
    ...state,
    current: branch,
    loading: false,
  })),
  on(Actions.loadBranchManagerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createBranchManager, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createBranchManagerSuccess, (state, { branch }) => ({
    ...state,
    items: [...state.items, branch],
    loading: false,
  })),
  on(Actions.createBranchManagerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateBranchManager, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateBranchManagerSuccess, (state, { branch }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === branch.id ? branch : ct)),
    loading: false,
  })),
  on(Actions.updateBranchManagerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteBranchManager, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteBranchManagerSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteBranchManagerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadBranchManagersByBranchId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadBranchManagersByBranchIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadBranchManagersByBranchIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
