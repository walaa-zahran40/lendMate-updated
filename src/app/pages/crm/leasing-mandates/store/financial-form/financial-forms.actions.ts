// src/app/features/financial-forms/financial-forms.actions.ts

import { createAction, props } from '@ngrx/store';
import {
  CalculationConfigurationByFeeType,
  FinancialForm,
} from './financial-form.model';
import { Calculation } from '../../../../../shared/interfaces/calculations.interface';
import { PaymentRow, PaymentsRequest } from './payments-request.model';

// ─── Load All ───────────────────────────────────────────────────────────────
export const loadAll = createAction(
  '[FinancialForms] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[FinancialForms] Load All Success',
  props<{ result: FinancialForm[] }>()
);
export const loadAllFailure = createAction(
  '[FinancialForms] Load All Failure',
  props<{ error: any }>()
);

// ─── Load By Id ──────────────────────────────────────────────────────────────
export const loadById = createAction(
  '[FinancialForms] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[FinancialForms] Load By Id Success',
  props<{ entity: FinancialForm }>()
);
export const loadByIdFailure = createAction(
  '[FinancialForms] Load By Id Failure',
  props<{ error: any }>()
);

// ─── Load By LeasingMandateId ─────────────────────────────────────────────────
export const loadByLeasingMandateId = createAction(
  '[FinancialForms] Load By LeasingMandateId',
  props<{ leasingMandateId: number }>()
);
export const loadByLeasingMandateIdSuccess = createAction(
  '[FinancialForms] Load By LeasingMandateId Success',
  props<{ entity: FinancialForm }>()
);
export const loadByLeasingMandateIdFailure = createAction(
  '[FinancialForms] Load By LeasingMandateId Failure',
  props<{ error: any }>()
);

// ─── Calculate ────────────────────────────────────────────────────────────────
export const calculateEntity = createAction(
  '[Leasing] Calculate Entity',
  props<{ payload: PaymentsRequest; requestId: string }>()
);

export const calculateEntitySuccess = createAction(
  '[Leasing] Calculate Entity Success',
  props<{ rows: PaymentRow[]; requestId: string }>() // ⬅️ CHANGED
);

export const calculateEntityFailure = createAction(
  '[Leasing] Calculate Entity Failure',
  props<{ error: unknown; requestId: string }>()
);

// ─── Create ──────────────────────────────────────────────────────────────────
export const createEntity = createAction(
  '[FinancialForms] Create',
  props<{ payload: Omit<FinancialForm, 'id'> }>()
);
export const createEntitySuccess = createAction(
  '[FinancialForms] Create Success',
  props<{ entity: FinancialForm }>()
);
export const createEntityFailure = createAction(
  '[FinancialForms] Create Failure',
  props<{ error: any }>()
);

// ─── Update ──────────────────────────────────────────────────────────────────
export const updateEntity = createAction(
  '[FinancialForms] Update',
  props<{ id: number; changes: Partial<FinancialForm> }>()
);
export const updateEntitySuccess = createAction(
  '[FinancialForms] Update Success',
  props<{ id: number; changes: Partial<FinancialForm> }>()
);
export const updateEntityFailure = createAction(
  '[FinancialForms] Update Failure',
  props<{ error: any }>()
);

// ─── Delete ──────────────────────────────────────────────────────────────────
export const deleteEntity = createAction(
  '[FinancialForms] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[FinancialForms] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[FinancialForms] Delete Failure',
  props<{ error: any }>()
);

// ─── Entity Operation Success (shared) ───────────────────────────────────────
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);

export const clearSelectedFinancialForm = createAction(
  '[FinancialForms] Clear Selected'
);
export const financialFormCalculatedRowsSaved = createAction(
  '[FinancialForms] Calculated Rows Saved',
  props<{ rows: Calculation[] }>()
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
