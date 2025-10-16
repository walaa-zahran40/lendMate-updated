import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientGuarantorsState } from './client-guarantors.state';

export const selectClientGuarantorsState =
  createFeatureSelector<ClientGuarantorsState>('clientGuarantors');
export const selectClientGuarantors = createSelector(
  selectClientGuarantorsState,
  (state) => state.items
);
export const selectClientGuarantorsTotal = createSelector(
  selectClientGuarantorsState,
  (state) => state.totalCount
);
export const selectClientGuarantorsHistory = createSelector(
  selectClientGuarantorsState,
  (state) => state.history
);
export const selectCurrentClientGuarantor = createSelector(
  selectClientGuarantorsState,
  (state) => state.current
);
export const selectClientGuarantorsLoading = createSelector(
  selectClientGuarantorsState,
  (state) => state.loading
);
export const selectClientGuarantorsError = createSelector(
  selectClientGuarantorsState,
  (state) => state.error
);
