import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LegalFormsState } from './legal-forms.state';

export const selectLegalFormsState =
  createFeatureSelector<LegalFormsState>('legalForms');
export const selectLegalForms = createSelector(
  selectLegalFormsState,
  (state) => state.items
);
export const selectLegalFormsTotal = createSelector(
  selectLegalFormsState,
  (state) => state.totalCount
);
export const selectLegalFormsHistory = createSelector(
  selectLegalFormsState,
  (state) => state.history
);
export const selectCurrentLegalForm = createSelector(
  selectLegalFormsState,
  (state) => state.current
);
export const selectLegalFormsLoading = createSelector(
  selectLegalFormsState,
  (state) => state.loading
);
export const selectLegalFormsError = createSelector(
  selectLegalFormsState,
  (state) => state.error
);

