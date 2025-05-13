import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DepartmentManagersState } from './department-managers.state';

export const selectDepartmentManagersState =
  createFeatureSelector<DepartmentManagersState>('departmentManagers');
export const selectDepartmentManagers = createSelector(
  selectDepartmentManagersState,
  (state) => state.items
);
export const selectDepartmentManagersTotal = createSelector(
  selectDepartmentManagersState,
  (state) => state.totalCount
);
export const selectDepartmentManagersHistory = createSelector(
  selectDepartmentManagersState,
  (state) => state.history
);
export const selectCurrentDepartmentManager = createSelector(
  selectDepartmentManagersState,
  (state) => state.current
);
export const selectDepartmentManagersLoading = createSelector(
  selectDepartmentManagersState,
  (state) => state.loading
);
export const selectDepartmentManagersError = createSelector(
  selectDepartmentManagersState,
  (state) => state.error
);