import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientTaxOfficesState } from './client-tax-office.state';

export const selectClientTaxOfficesState =
  createFeatureSelector<ClientTaxOfficesState>('clientTaxOffices');
export const selectClientTaxOffices = createSelector(
  selectClientTaxOfficesState,
  (state) => state.items
);
export const selectClientTaxOfficesTotal = createSelector(
  selectClientTaxOfficesState,
  (state) => state.totalCount
);
export const selectClientTaxOfficesHistory = createSelector(
  selectClientTaxOfficesState,
  (state) => state.history
);
export const selectCurrentClientTaxOffice = createSelector(
  selectClientTaxOfficesState,
  (state) => state.current
);
export const selectClientTaxOfficesLoading = createSelector(
  selectClientTaxOfficesState,
  (state) => state.loading
);
export const selectClientTaxOfficesError = createSelector(
  selectClientTaxOfficesState,
  (state) => state.error
);
