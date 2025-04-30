import { createAction, props } from '@ngrx/store';
import { Branch } from './branch.model';

// Load all
export const loadBranches = createAction('[Branches] Load Branches');

export const loadBranchesSuccess = createAction(
  '[Branches] Load Branches Success',
  props<{ branches: Branch[] }>()
);

export const loadBranchesFailure = createAction(
  '[Branches] Load Branches Failure',
  props<{ error: any }>()
);
// Load history
export const loadBranchesHistory = createAction('[Branches] Load History');
export const loadBranchesHistorySuccess = createAction(
  '[Branches] Load History Success',
  props<{ history: Branch[] }>()
);
export const loadBranchesHistoryFailure = createAction(
  '[Branches] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadBranch = createAction(
  '[Branches] Load One',
  props<{ id: number }>()
);
export const loadBranchSuccess = createAction(
  '[Branches] Load One Success',
  props<{ branch: Branch }>()
);
export const loadBranchFailure = createAction(
  '[Branches] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createBranch = createAction(
  '[Branches] Create',
  props<{ data: Partial<Branch> }>()
);
export const createBranchSuccess = createAction(
  '[Branches] Create Success',
  props<{ branch: Branch }>()
);
export const createBranchFailure = createAction(
  '[Branches] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateBranch = createAction(
  '[Branches] Update',
  props<{ id: number; data: Partial<Branch> }>()
);
export const updateBranchSuccess = createAction(
  '[Branches] Update Success',
  props<{ branch: Branch }>()
);
export const updateBranchFailure = createAction(
  '[Branches] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteBranch = createAction(
  '[Branches] Delete',
  props<{ id: number }>()
);
export const deleteBranchSuccess = createAction(
  '[Branches] Delete Success',
  props<{ id: number }>()
);
export const deleteBranchFailure = createAction(
  '[Branches] Delete Failure',
  props<{ error: any }>()
);
