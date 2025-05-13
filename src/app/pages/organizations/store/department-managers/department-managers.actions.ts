import { createAction, props } from '@ngrx/store';
import { DepartmentManager } from './department-manager.model';


// Load all
export const loadDepartmentManagers = createAction(
  '[DepartmentManagers] Load All'
);
export const loadDepartmentManagersSuccess = createAction(
  '[DepartmentManagers] Load All Success',
  props<{ items: DepartmentManager[]; totalCount: number }>()
);
export const loadDepartmentManagersFailure = createAction(
  '[DepartmentManagers] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadDepartmentManagersHistory = createAction(
  '[DepartmentManagers] Load History'
);
export const loadDepartmentManagersHistorySuccess = createAction(
  '[DepartmentManagers] Load History Success',
  props<{ history: DepartmentManager[] }>()
);
export const loadDepartmentManagersHistoryFailure = createAction(
  '[DepartmentManagers] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadDepartmentManager = createAction(
  '[DepartmentManagers] Load One',
  props<{ id: number }>()
);
export const loadDepartmentManagerSuccess = createAction(
  '[DepartmentManagers] Load One Success',
  props<{ department: DepartmentManager }>()
);
export const loadDepartmentManagerFailure = createAction(
  '[DepartmentManagers] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createDepartmentManager = createAction(
  '[DepartmentManagers] Create',
  props<{ data: Partial<DepartmentManager> }>()
);
export const createDepartmentManagerSuccess = createAction(
  '[DepartmentManagers] Create Success',
  props<{ department: DepartmentManager }>()
);
export const createDepartmentManagerFailure = createAction(
  '[DepartmentManagers] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateDepartmentManager = createAction(
  '[DepartmentManagers] Update',
  props<{ id: number; data: Partial<DepartmentManager> }>()
);
export const updateDepartmentManagerSuccess = createAction(
  '[DepartmentManagers] Update Success',
  props<{ department: DepartmentManager }>()
);
export const updateDepartmentManagerFailure = createAction(
  '[DepartmentManagers] Update Failure',
  props<{ error: any }>()
);

// Load by DepartmentId
export const loadDepartmentManagersByDepartmentId = createAction(
  '[DepartmentManagers] Load By DepartmentId',
  props<{ departmentId: number }>()
);
export const loadDepartmentManagersByDepartmentIdSuccess = createAction(
  '[DepartmentManagers] Load By DepartmentId Success',
  props<{ items: DepartmentManager[] }>()
);
export const loadDepartmentManagersByDepartmentIdFailure = createAction(
  '[DepartmentManagers] Load By DepartmentId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteDepartmentManager = createAction(
  '[DepartmentManagers] Delete',
  props<{ id: number; departmentId: number }>()
);
export const deleteDepartmentManagerSuccess = createAction(
  '[DepartmentManagers] Delete Success',
  props<{ id: number; departmentId: number }>()
);
export const deleteDepartmentManagerFailure = createAction(
  '[DepartmentManagers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);