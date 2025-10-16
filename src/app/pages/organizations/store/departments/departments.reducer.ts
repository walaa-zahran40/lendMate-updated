import { createReducer, on } from '@ngrx/store';
import * as Actions from './departments.actions';
import { initialDepartmentsState } from './departments.state';

export const DepartmentsReducer = createReducer(
  initialDepartmentsState,
  on(Actions.loadDepartments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadDepartmentsSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadDepartmentsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadDepartmentsHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadDepartmentsHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadDepartmentsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadDepartment, (state) => ({ ...state, loading: true })),
  on(Actions.loadDepartmentSuccess, (state, { Department }) => ({
    ...state,
    current: Department,
    loading: false,
  })),
  on(Actions.loadDepartmentFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createDepartment, (state) => ({ ...state, loading: true })),
  on(Actions.createDepartmentSuccess, (state, { Department }) => ({
    ...state,
    items: [...state.items, Department],
    loading: false,
  })),
  on(Actions.createDepartmentFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateDepartment, (state) => ({ ...state, loading: true })),
  on(Actions.updateDepartmentSuccess, (state, { Department }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === Department.id ? Department : ct
    ),
    loading: false,
  })),
  on(Actions.updateDepartmentFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteDepartment, (state) => ({ ...state, loading: true })),
  on(Actions.deleteDepartmentSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteDepartmentFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
