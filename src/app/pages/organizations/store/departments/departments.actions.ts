import { createAction, props } from '@ngrx/store';
import { Department } from './department.model';

// Load all
export const loadDepartments = createAction('[Departments] Load All');
export const loadDepartmentsSuccess = createAction(
  '[Departments] Load All Success',
  props<{ items: Department[]; totalCount: number }>()
);
export const loadDepartmentsFailure = createAction(
  '[Departments] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadDepartmentsHistory = createAction('[Departments] Load History');
export const loadDepartmentsHistorySuccess = createAction(
  '[Departments] Load History Success',
  props<{ history: Department[] }>()
);
export const loadDepartmentsHistoryFailure = createAction(
  '[Departments] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadDepartment = createAction(
  '[Departments] Load One',
  props<{ id: number }>()
);
export const loadDepartmentSuccess = createAction(
  '[Departments] Load One Success',
  props<{ Department: Department }>()
);
export const loadDepartmentFailure = createAction(
  '[Departments] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createDepartment = createAction(
  '[Departments] Create',
  props<{ data: Partial<Department> }>()
);
export const createDepartmentSuccess = createAction(
  '[Departments] Create Success',
  props<{ Department: Department }>()
);
export const createDepartmentFailure = createAction(
  '[Departments] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateDepartment = createAction(
  '[Departments] Update',
  props<{ id: number; data: Partial<Department> }>()
);
export const updateDepartmentSuccess = createAction(
  '[Departments] Update Success',
  props<{ Department: Department }>()
);
export const updateDepartmentFailure = createAction(
  '[Departments] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteDepartment = createAction(
  '[Departments] Delete',
  props<{ id: number }>()
);
export const deleteDepartmentSuccess = createAction(
  '[Departments] Delete Success',
  props<{ id: number }>()
);
export const deleteDepartmentFailure = createAction(
  '[Departments] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
