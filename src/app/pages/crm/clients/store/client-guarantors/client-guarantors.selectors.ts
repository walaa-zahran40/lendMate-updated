import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GuarantorsState } from './client-guarantors.model';

export const selectGuarantorsState =
  createFeatureSelector<GuarantorsState>('clientGuarantors');
export const selectGuarantorList = createSelector(
  selectGuarantorsState,
  (state) => state.list
);
export const selectGuarantorsHistory = createSelector(
  selectGuarantorsState,
  (state) => state.history
);
export const selectGuarantorsLoading = createSelector(
  selectGuarantorsState,
  (state) => state.loading
);
export const selectGuarantorsError = createSelector(
  selectGuarantorsState,
  (state) => state.error
);
