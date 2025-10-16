import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DepartmentsState } from './departments.state';

export const selectDepartmentsState =
  createFeatureSelector<DepartmentsState>('departments');
export const selectDepartments = createSelector(
  selectDepartmentsState,
  (state) => state.items
);
export const selectDepartmentsTotal = createSelector(
  selectDepartmentsState,
  (state) => state.totalCount
);
export const selectDepartmentsHistory = createSelector(
  selectDepartmentsState,
  (state) => state.history
);
export const selectCurrentDepartment = createSelector(
  selectDepartmentsState,
  (state) => state.current
);
export const selectDepartmentsLoading = createSelector(
  selectDepartmentsState,
  (state) => state.loading
);
export const selectDepartmentsError = createSelector(
  selectDepartmentsState,
  (state) => state.error
);

