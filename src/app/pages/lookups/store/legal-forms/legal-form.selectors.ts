import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LegalFormState } from './legal-form.reducer';

export const selectLegalFormState =
  createFeatureSelector<LegalFormState>('legalForm');

export const selectAllLegalForms = createSelector(
  selectLegalFormState,
  (state) => state.legalForms
);

export const selectLegalFormLoading = createSelector(
  selectLegalFormState,
  (state) => state.loading
);

export const selectLegalFormError = createSelector(
  selectLegalFormState,
  (state) => state.error
);
