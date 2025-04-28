import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LegalFormLawState } from './legal-form-law.reducer';

export const selectLegalFormLawState =
  createFeatureSelector<LegalFormLawState>('legalFormLaw');

export const selectAllLegalFormLaws = createSelector(
  selectLegalFormLawState,
  (state) => state.legalFormLaws ?? [] // prevents null issues
);

export const selectLegalFormLawLoading = createSelector(
  selectLegalFormLawState,
  (state) => state.loading
);

export const selectLegalFormLawError = createSelector(
  selectLegalFormLawState,
  (state) => state.error
);
