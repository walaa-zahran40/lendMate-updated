import { createAction, props } from '@ngrx/store';
import {
  CalculationConfigurationByFeeType,
  MandateFee,
} from './mandate-fee.model';

// Load all
export const loadMandateFees = createAction('[MandateFees] Load All');
export const loadMandateFeesSuccess = createAction(
  '[MandateFees] Load All Success',
  props<{ items: MandateFee[]; totalCount: number }>()
);
export const loadMandateFeesFailure = createAction(
  '[MandateFees] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadMandateFeesHistory = createAction(
  '[MandateFees] Load History'
);
export const loadMandateFeesHistorySuccess = createAction(
  '[MandateFees] Load History Success',
  props<{ history: MandateFee[] }>()
);
export const loadMandateFeesHistoryFailure = createAction(
  '[MandateFees] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadMandateFee = createAction(
  '[MandateFees] Load One',
  props<{ id: number }>()
);
export const loadMandateFeeSuccess = createAction(
  '[MandateFees] Load One Success',
  props<{ mandate: MandateFee }>()
);
export const loadMandateFeeFailure = createAction(
  '[MandateFees] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createMandateFee = createAction(
  '[MandateFees] Create',
  props<{ data: Partial<MandateFee> }>()
);
export const createMandateFeeSuccess = createAction(
  '[MandateFees] Create Success',
  props<{ mandate: MandateFee }>()
);
export const createMandateFeeFailure = createAction(
  '[MandateFees] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateMandateFee = createAction(
  '[MandateFees] Update',
  props<{ id: number; data: Partial<MandateFee> }>()
);
export const updateMandateFeeSuccess = createAction(
  '[MandateFees] Update Success',
  props<{ mandate: MandateFee }>()
);
export const updateMandateFeeFailure = createAction(
  '[MandateFees] Update Failure',
  props<{ error: any }>()
);

// Load by MandateId
export const loadMandateFeesByMandateId = createAction(
  '[MandateFees] Load By MandateId',
  props<{ mandateId: number }>()
);
export const loadMandateFeesByMandateIdSuccess = createAction(
  '[MandateFees] Load By MandateId Success',
  props<{ items: MandateFee[] }>()
);
export const loadMandateFeesByMandateIdFailure = createAction(
  '[MandateFees] Load By MandateId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteMandateFee = createAction(
  '[MandateFees] Delete',
  props<{ id: number; mandateId: number }>()
);
export const deleteMandateFeeSuccess = createAction(
  '[MandateFees] Delete Success',
  props<{ id: number; mandateId: number }>()
);
export const deleteMandateFeeFailure = createAction(
  '[MandateFees] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
// Load calc config
export const loadCalcConfig = createAction(
  '[MandateFees] Load Calculation Config',
  props<{ feeTypeId: number }>()
);
export const loadCalcConfigSuccess = createAction(
  '[MandateFees] Load Calculation Config Success',
  props<{ config: CalculationConfigurationByFeeType }>()
);
export const loadCalcConfigFailure = createAction(
  '[MandateFees] Load Calculation Config Failure',
  props<{ error: any }>()
);
