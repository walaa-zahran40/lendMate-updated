import { createReducer, on } from '@ngrx/store';
import * as Actions from './department-managers.actions';
import { initialDepartmentManagersState } from './department-managers.state';

export const departmentManagersReducer = createReducer(
  initialDepartmentManagersState,
  on(Actions.loadDepartmentManagers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadDepartmentManagersSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadDepartmentManagersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadDepartmentManagersHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadDepartmentManagersHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadDepartmentManagersHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadDepartmentManager, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadDepartmentManagerSuccess, (state, { department }) => ({
    ...state,
    current: department,
    loading: false,
  })),
  on(Actions.loadDepartmentManagerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createDepartmentManager, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createDepartmentManagerSuccess, (state, { department }) => ({
    ...state,
    items: [...state.items, department],
    loading: false,
  })),
  on(Actions.createDepartmentManagerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateDepartmentManager, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateDepartmentManagerSuccess, (state, { department }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === department.id ? department : ct)),
    loading: false,
  })),
  on(Actions.updateDepartmentManagerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteDepartmentManager, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteDepartmentManagerSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteDepartmentManagerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadDepartmentManagersByDepartmentId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadDepartmentManagersByDepartmentIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadDepartmentManagersByDepartmentIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);