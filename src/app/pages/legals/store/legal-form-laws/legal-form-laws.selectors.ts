import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LegalFormLawsState } from './legal-form-laws.state';

export const selectLegalFormLawsState =
  createFeatureSelector<LegalFormLawsState>('legalFormLaws');
export const selectLegalFormLaws = createSelector(
  selectLegalFormLawsState,
  (state) => state.items
);
export const selectLegalFormLawsTotal = createSelector(
  selectLegalFormLawsState,
  (state) => state.totalCount
);
export const selectLegalFormLawsHistory = createSelector(
  selectLegalFormLawsState,
  (state) => state.history
);
export const selectCurrentLegalFormLaw = createSelector(
  selectLegalFormLawsState,
  (state) => state.current
);
export const selectLegalFormLawsLoading = createSelector(
  selectLegalFormLawsState,
  (state) => state.loading
);
export const selectLegalFormLawsError = createSelector(
  selectLegalFormLawsState,
  (state) => state.error
);

