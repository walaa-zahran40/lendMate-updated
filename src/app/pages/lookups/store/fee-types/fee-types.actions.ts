import { createAction, props } from '@ngrx/store';
import { FeeType } from './fee-type.model';

// Load all
export const loadFeeTypes = createAction('[FeeTypes] Load All');
export const loadFeeTypesSuccess = createAction(
  '[FeeTypes] Load All Success',
  props<{ items: FeeType[]; totalCount: number }>()
);
export const loadFeeTypesFailure = createAction(
  '[FeeTypes] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadFeeTypesHistory = createAction('[FeeTypes] Load History');
export const loadFeeTypesHistorySuccess = createAction(
  '[FeeTypes] Load History Success',
  props<{ history: FeeType[] }>()
);
export const loadFeeTypesHistoryFailure = createAction(
  '[FeeTypes] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadFeeType = createAction(
  '[FeeTypes] Load One',
  props<{ id: number }>()
);
export const loadFeeTypeSuccess = createAction(
  '[FeeTypes] Load One Success',
  props<{ feeType: FeeType }>()
);
export const loadFeeTypeFailure = createAction(
  '[FeeTypes] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createFeeType = createAction(
  '[FeeTypes] Create',
  props<{ data: Partial<FeeType> }>()
);
export const createFeeTypeSuccess = createAction(
  '[FeeTypes] Create Success',
  props<{ feeType: FeeType }>()
);
export const createFeeTypeFailure = createAction(
  '[FeeTypes] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateFeeType = createAction(
  '[FeeTypes] Update',
  props<{ id: number; data: Partial<FeeType> }>()
);
export const updateFeeTypeSuccess = createAction(
  '[FeeTypes] Update Success',
  props<{ feeType: FeeType }>()
);
export const updateFeeTypeFailure = createAction(
  '[FeeTypes] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteFeeType = createAction(
  '[FeeTypes] Delete',
  props<{ id: number }>()
);
export const deleteFeeTypeSuccess = createAction(
  '[FeeTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteFeeTypeFailure = createAction(
  '[FeeTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
