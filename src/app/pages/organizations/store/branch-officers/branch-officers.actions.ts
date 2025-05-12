import { createAction, props } from '@ngrx/store';
import { BranchOfficer } from './branch-officer.model';

// Load all
export const loadBranchOfficers = createAction(
  '[BranchOfficers] Load All'
);
export const loadBranchOfficersSuccess = createAction(
  '[BranchOfficers] Load All Success',
  props<{ items: BranchOfficer[]; totalCount: number }>()
);
export const loadBranchOfficersFailure = createAction(
  '[BranchOfficers] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadBranchOfficersHistory = createAction(
  '[BranchOfficers] Load History'
);
export const loadBranchOfficersHistorySuccess = createAction(
  '[BranchOfficers] Load History Success',
  props<{ history: BranchOfficer[] }>()
);
export const loadBranchOfficersHistoryFailure = createAction(
  '[BranchOfficers] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadBranchOfficer = createAction(
  '[BranchOfficers] Load One',
  props<{ id: number }>()
);
export const loadBranchOfficerSuccess = createAction(
  '[BranchOfficers] Load One Success',
  props<{ branch: BranchOfficer }>()
);
export const loadBranchOfficerFailure = createAction(
  '[BranchOfficers] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createBranchOfficer = createAction(
  '[BranchOfficers] Create',
  props<{ data: Partial<BranchOfficer> }>()
);
export const createBranchOfficerSuccess = createAction(
  '[BranchOfficers] Create Success',
  props<{ branch: BranchOfficer }>()
);
export const createBranchOfficerFailure = createAction(
  '[BranchOfficers] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateBranchOfficer = createAction(
  '[BranchOfficers] Update',
  props<{ id: number; data: Partial<BranchOfficer> }>()
);
export const updateBranchOfficerSuccess = createAction(
  '[BranchOfficers] Update Success',
  props<{ branch: BranchOfficer }>()
);
export const updateBranchOfficerFailure = createAction(
  '[BranchOfficers] Update Failure',
  props<{ error: any }>()
);

// Load by BranchId
export const loadBranchOfficersByBranchId = createAction(
  '[BranchOfficers] Load By BranchId',
  props<{ branchId: number }>()
);
export const loadBranchOfficersByBranchIdSuccess = createAction(
  '[BranchOfficers] Load By BranchId Success',
  props<{ items: BranchOfficer[] }>()
);
export const loadBranchOfficersByBranchIdFailure = createAction(
  '[BranchOfficers] Load By BranchId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteBranchOfficer = createAction(
  '[BranchOfficers] Delete',
  props<{ id: number; branchId: number }>()
);
export const deleteBranchOfficerSuccess = createAction(
  '[BranchOfficers] Delete Success',
  props<{ id: number; branchId: number }>()
);
export const deleteBranchOfficerFailure = createAction(
  '[BranchOfficers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
