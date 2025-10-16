import { createAction, props } from '@ngrx/store';
import { BranchManager } from './branch-manager.model';

// Load all
export const loadBranchManagers = createAction(
  '[BranchManagers] Load All'
);
export const loadBranchManagersSuccess = createAction(
  '[BranchManagers] Load All Success',
  props<{ items: BranchManager[]; totalCount: number }>()
);
export const loadBranchManagersFailure = createAction(
  '[BranchManagers] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadBranchManagersHistory = createAction(
  '[BranchManagers] Load History'
);
export const loadBranchManagersHistorySuccess = createAction(
  '[BranchManagers] Load History Success',
  props<{ history: BranchManager[] }>()
);
export const loadBranchManagersHistoryFailure = createAction(
  '[BranchManagers] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadBranchManager = createAction(
  '[BranchManagers] Load One',
  props<{ id: number }>()
);
export const loadBranchManagerSuccess = createAction(
  '[BranchManagers] Load One Success',
  props<{ branch: BranchManager }>()
);
export const loadBranchManagerFailure = createAction(
  '[BranchManagers] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createBranchManager = createAction(
  '[BranchManagers] Create',
  props<{ data: Partial<BranchManager> }>()
);
export const createBranchManagerSuccess = createAction(
  '[BranchManagers] Create Success',
  props<{ branch: BranchManager }>()
);
export const createBranchManagerFailure = createAction(
  '[BranchManagers] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateBranchManager = createAction(
  '[BranchManagers] Update',
  props<{ id: number; data: Partial<BranchManager> }>()
);
export const updateBranchManagerSuccess = createAction(
  '[BranchManagers] Update Success',
  props<{ branch: BranchManager }>()
);
export const updateBranchManagerFailure = createAction(
  '[BranchManagers] Update Failure',
  props<{ error: any }>()
);

// Load by BranchId
export const loadBranchManagersByBranchId = createAction(
  '[BranchManagers] Load By BranchId',
  props<{ branchId: number }>()
);
export const loadBranchManagersByBranchIdSuccess = createAction(
  '[BranchManagers] Load By BranchId Success',
  props<{ items: BranchManager[] }>()
);
export const loadBranchManagersByBranchIdFailure = createAction(
  '[BranchManagers] Load By BranchId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteBranchManager = createAction(
  '[BranchManagers] Delete',
  props<{ id: number; branchId: number }>()
);
export const deleteBranchManagerSuccess = createAction(
  '[BranchManagers] Delete Success',
  props<{ id: number; branchId: number }>()
);
export const deleteBranchManagerFailure = createAction(
  '[BranchManagers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
