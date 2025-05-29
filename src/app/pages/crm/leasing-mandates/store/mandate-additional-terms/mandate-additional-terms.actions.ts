import { createAction, props } from '@ngrx/store';
import { MandateAdditionalTerm } from './mandate-additional-term.model';

// Load all
export const loadMandateAdditionalTerms = createAction(
  '[MandateAdditionalTerms] Load All'
);
export const loadMandateAdditionalTermsSuccess = createAction(
  '[MandateAdditionalTerms] Load All Success',
  props<{ items: MandateAdditionalTerm[]; totalCount: number }>()
);
export const loadMandateAdditionalTermsFailure = createAction(
  '[MandateAdditionalTerms] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadMandateAdditionalTermsHistory = createAction(
  '[MandateAdditionalTerms] Load History'
);
export const loadMandateAdditionalTermsHistorySuccess = createAction(
  '[MandateAdditionalTerms] Load History Success',
  props<{ history: MandateAdditionalTerm[] }>()
);
export const loadMandateAdditionalTermsHistoryFailure = createAction(
  '[MandateAdditionalTerms] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadMandateAdditionalTerm = createAction(
  '[MandateAdditionalTerms] Load One',
  props<{ id: number }>()
);
export const loadMandateAdditionalTermSuccess = createAction(
  '[MandateAdditionalTerms] Load One Success',
  props<{ mandate: MandateAdditionalTerm }>()
);
export const loadMandateAdditionalTermFailure = createAction(
  '[MandateAdditionalTerms] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createMandateAdditionalTerm = createAction(
  '[MandateAdditionalTerms] Create',
  props<{ data: Partial<MandateAdditionalTerm> }>()
);
export const createMandateAdditionalTermSuccess = createAction(
  '[MandateAdditionalTerms] Create Success',
  props<{ mandate: MandateAdditionalTerm }>()
);
export const createMandateAdditionalTermFailure = createAction(
  '[MandateAdditionalTerms] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateMandateAdditionalTerm = createAction(
  '[MandateAdditionalTerms] Update',
  props<{ id: number; data: Partial<MandateAdditionalTerm> }>()
);
export const updateMandateAdditionalTermSuccess = createAction(
  '[MandateAdditionalTerms] Update Success',
  props<{ mandate: MandateAdditionalTerm }>()
);
export const updateMandateAdditionalTermFailure = createAction(
  '[MandateAdditionalTerms] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadMandateAdditionalTermsByClientId = createAction(
  '[MandateAdditionalTerms] Load By ClientId',
  props<{ mandateId: number }>()
);
export const loadMandateAdditionalTermsByClientIdSuccess = createAction(
  '[MandateAdditionalTerms] Load By ClientId Success',
  props<{ items: MandateAdditionalTerm[] }>()
);
export const loadMandateAdditionalTermsByClientIdFailure = createAction(
  '[MandateAdditionalTerms] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteMandateAdditionalTerm = createAction(
  '[MandateAdditionalTerms] Delete',
  props<{ id: number; mandateId: number }>()
);
export const deleteMandateAdditionalTermSuccess = createAction(
  '[MandateAdditionalTerms] Delete Success',
  props<{ id: number; mandateId: number }>()
);
export const deleteMandateAdditionalTermFailure = createAction(
  '[MandateAdditionalTerms] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
