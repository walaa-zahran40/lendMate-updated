import { createAction, props } from '@ngrx/store';
import { BranchAddress } from './branch-address.model';

// Load all
export const loadBranchAddresses = createAction('[BranchAddresses] Load All');
export const loadBranchAddressesSuccess = createAction(
  '[BranchAddresses] Load All Success',
  props<{ items: BranchAddress[]; totalCount: number }>()
);
export const loadBranchAddressesFailure = createAction(
  '[BranchAddresses] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadBranchAddressesHistory = createAction(
  '[BranchAddresses] Load History'
);
export const loadBranchAddressesHistorySuccess = createAction(
  '[BranchAddresses] Load History Success',
  props<{ history: BranchAddress[] }>()
);
export const loadBranchAddressesHistoryFailure = createAction(
  '[BranchAddresses] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadBranchAddress = createAction(
  '[BranchAddresses] Load One',
  props<{ id: number }>()
);
export const loadBranchAddressSuccess = createAction(
  '[BranchAddresses] Load One Success',
  props<{ branch: BranchAddress }>()
);
export const loadBranchAddressFailure = createAction(
  '[BranchAddresses] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createBranchAddress = createAction(
  '[BranchAddresses] Create',
  props<{ data: Partial<BranchAddress> }>()
);
export const createBranchAddressSuccess = createAction(
  '[BranchAddresses] Create Success',
  props<{ branch: BranchAddress }>()
);
export const createBranchAddressFailure = createAction(
  '[BranchAddresses] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateBranchAddress = createAction(
  '[BranchAddresses] Update',
  props<{ id: number; data: Partial<BranchAddress> }>()
);
export const updateBranchAddressSuccess = createAction(
  '[BranchAddresses] Update Success',
  props<{ branch: BranchAddress }>()
);
export const updateBranchAddressFailure = createAction(
  '[BranchAddresses] Update Failure',
  props<{ error: any }>()
);

// Load by BranchId
export const loadBranchAddressesByBranchId = createAction(
  '[BranchAddresses] Load By BranchId',
  props<{ branchId: number }>()
);
export const loadBranchAddressesByBranchIdSuccess = createAction(
  '[BranchAddresses] Load By BranchId Success',
  props<{ items: any }>()
);
export const loadBranchAddressesByBranchIdFailure = createAction(
  '[BranchAddresses] Load By BranchId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteBranchAddress = createAction(
  '[BranchAddresses] Delete',
  props<{ id: number; branchId: number }>()
);
export const deleteBranchAddressSuccess = createAction(
  '[BranchAddresses] Delete Success',
  props<{ id: number; branchId: number }>()
);
export const deleteBranchAddressFailure = createAction(
  '[BranchAddresses] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
