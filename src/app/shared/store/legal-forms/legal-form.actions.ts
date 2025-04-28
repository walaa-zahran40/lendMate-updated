import { createAction, props } from '@ngrx/store';
import { LegalForm } from '../../interfaces/legal-form.interface';

export const loadLegalForms = createAction('[LegalForm] Load');
export const loadLegalFormsSuccess = createAction(
  '[LegalForm] Load Success',
  props<{ legalForms: LegalForm[] }>()
);
export const loadLegalFormsFailure = createAction(
  '[LegalForm] Load Failure',
  props<{ error: any }>()
);
