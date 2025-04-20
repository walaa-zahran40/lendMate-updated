import { createAction, props } from '@ngrx/store';
import { LegalFormLaw } from '../../../../interfaces/legal-form-law.interface';

export const loadLegalFormLaws = createAction('[LegalFormLaw] Load');

export const loadLegalFormLawsSuccess = createAction(
  '[LegalFormLaw] Load Success',
  props<{ legalFormLaws: LegalFormLaw[] }>()
);

export const loadLegalFormLawsFailure = createAction(
  '[LegalFormLaw] Load Failure',
  props<{ error: any }>()
);
