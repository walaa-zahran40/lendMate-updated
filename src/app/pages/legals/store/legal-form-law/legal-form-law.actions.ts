import { createAction, props } from '@ngrx/store';
import { LegalFormLaw } from '../legal-form-laws/legal-form-law.model';

export const loadLegalFormLaws = createAction('[LegalFormLaw] Load');

export const loadLegalFormLawsSuccess = createAction(
  '[LegalFormLaw] Load Success',
  props<{ legalFormLaws: LegalFormLaw[] }>()
);

export const loadLegalFormLawsFailure = createAction(
  '[LegalFormLaw] Load Failure',
  props<{ error: any }>()
);
