import { createAction, props } from '@ngrx/store';
import { BranchAddress } from './branch-addresses.model';

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
//Load all by branch Id
export const loadBranchAddressesByBranchId = createAction(
  '[BranchAddresses] Load By BranchId',
  props<{ branchId: number }>()
);
export const loadBranchAddressesByBranchIdSuccess = createAction(
  '[BranchAddresses] Load By BranchId Success',
  props<{ items: BranchAddress[] }>()
);
export const loadBranchAddressesByBranchIdFailure = createAction(
  '[BranchAddresses] Load By BranchId Failure',
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
  props<{ branchAddress: BranchAddress }>()
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
  props<{ branchAddress: BranchAddress }>()
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
  props<{ branchAddress: BranchAddress }>()
);
export const updateBranchAddressFailure = createAction(
  '[BranchAddresses] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteBranchAddress = createAction(
  '[BranchAddresses] Delete',
  props<{ id: number }>()
);
export const deleteBranchAddressSuccess = createAction(
  '[BranchAddresses] Delete Success',
  props<{ id: number }>()
);
export const deleteBranchAddressFailure = createAction(
  '[BranchAddresses] Delete Failure',
  props<{ error: any }>()
);

