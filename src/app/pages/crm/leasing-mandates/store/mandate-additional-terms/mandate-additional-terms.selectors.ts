import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MandateAdditionalTermsState } from './mandate-additional-terms.state';

export const selectMandateAdditionalTermsState =
  createFeatureSelector<MandateAdditionalTermsState>('mandateAdditionalTerms');
export const selectMandateAdditionalTerms = createSelector(
  selectMandateAdditionalTermsState,
  (state) => state.items
);
export const selectMandateAdditionalTermsTotal = createSelector(
  selectMandateAdditionalTermsState,
  (state) => state.totalCount
);
export const selectMandateAdditionalTermsHistory = createSelector(
  selectMandateAdditionalTermsState,
  (state) => state.history
);
export const selectCurrentMandateAdditionalTerm = createSelector(
  selectMandateAdditionalTermsState,
  (state) => state.current
);
export const selectMandateAdditionalTermsLoading = createSelector(
  selectMandateAdditionalTermsState,
  (state) => state.loading
);
export const selectMandateAdditionalTermsError = createSelector(
  selectMandateAdditionalTermsState,
  (state) => state.error
);

