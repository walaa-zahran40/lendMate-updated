import { createAction, props } from '@ngrx/store';
import { LegalFormLaw } from './legal-form-law.model';

// Load all
export const loadLegalFormLaws = createAction('[LegalFormLaws] Load All');
export const loadLegalFormLawsSuccess = createAction(
  '[LegalFormLaws] Load All Success',
  props<{ items: LegalFormLaw[]; totalCount: number }>()
);
export const loadLegalFormLawsFailure = createAction(
  '[LegalFormLaws] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadLegalFormLawsHistory = createAction(
  '[LegalFormLaws] Load History'
);
export const loadLegalFormLawsHistorySuccess = createAction(
  '[LegalFormLaws] Load History Success',
  props<{ history: LegalFormLaw[] }>()
);
export const loadLegalFormLawsHistoryFailure = createAction(
  '[LegalFormLaws] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadLegalFormLaw = createAction(
  '[LegalFormLaws] Load One',
  props<{ id: number }>()
);
export const loadLegalFormLawSuccess = createAction(
  '[LegalFormLaws] Load One Success',
  props<{ legalFormLaw: LegalFormLaw }>()
);
export const loadLegalFormLawFailure = createAction(
  '[LegalFormLaws] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createLegalFormLaw = createAction(
  '[LegalFormLaws] Create',
  props<{ data: Partial<LegalFormLaw> }>()
);
export const createLegalFormLawSuccess = createAction(
  '[LegalFormLaws] Create Success',
  props<{ legalFormLaw: LegalFormLaw }>()
);
export const createLegalFormLawFailure = createAction(
  '[LegalFormLaws] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateLegalFormLaw = createAction(
  '[LegalFormLaws] Update',
  props<{ id: number; data: Partial<LegalFormLaw> }>()
);
export const updateLegalFormLawSuccess = createAction(
  '[LegalFormLaws] Update Success',
  props<{ legalFormLaw: LegalFormLaw }>()
);
export const updateLegalFormLawFailure = createAction(
  '[LegalFormLaws] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteLegalFormLaw = createAction(
  '[LegalFormLaws] Delete',
  props<{ id: number }>()
);
export const deleteLegalFormLawSuccess = createAction(
  '[LegalFormLaws] Delete Success',
  props<{ id: number }>()
);
export const deleteLegalFormLawFailure = createAction(
  '[LegalFormLaws] Delete Failure',
  props<{ error: any }>()
);
