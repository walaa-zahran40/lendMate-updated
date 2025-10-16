import { createAction, props } from '@ngrx/store';
import { LegalForm } from './legal-form.model';

// Load all
export const loadLegalForms = createAction('[LegalForms] Load All');
export const loadLegalFormsSuccess = createAction(
  '[LegalForms] Load All Success',
  props<{ items: LegalForm[]; totalCount: number }>()
);
export const loadLegalFormsFailure = createAction(
  '[LegalForms] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadLegalFormsHistory = createAction(
  '[LegalForms] Load History'
);
export const loadLegalFormsHistorySuccess = createAction(
  '[LegalForms] Load History Success',
  props<{ history: LegalForm[] }>()
);
export const loadLegalFormsHistoryFailure = createAction(
  '[LegalForms] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadLegalForm = createAction(
  '[LegalForms] Load One',
  props<{ id: number }>()
);
export const loadLegalFormSuccess = createAction(
  '[LegalForms] Load One Success',
  props<{ legalForm: LegalForm }>()
);
export const loadLegalFormFailure = createAction(
  '[LegalForms] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createLegalForm = createAction(
  '[LegalForms] Create',
  props<{ data: Partial<LegalForm> }>()
);
export const createLegalFormSuccess = createAction(
  '[LegalForms] Create Success',
  props<{ legalForm: LegalForm }>()
);
export const createLegalFormFailure = createAction(
  '[LegalForms] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateLegalForm = createAction(
  '[LegalForms] Update',
  props<{ id: number; data: Partial<LegalForm> }>()
);
export const updateLegalFormSuccess = createAction(
  '[LegalForms] Update Success',
  props<{ legalForm: LegalForm }>()
);
export const updateLegalFormFailure = createAction(
  '[LegalForms] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteLegalForm = createAction(
  '[LegalForms] Delete',
  props<{ id: number }>()
);
export const deleteLegalFormSuccess = createAction(
  '[LegalForms] Delete Success',
  props<{ id: number }>()
);
export const deleteLegalFormFailure = createAction(
  '[LegalForms] Delete Failure',
  props<{ error: any }>()
);
