import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientCRAuthorityOfficesState } from './client-cr-authority-office.state';

export const selectClientCRAuthorityOfficesState =
  createFeatureSelector<ClientCRAuthorityOfficesState>('clientCRAuthorityOffices');
export const selectClientCRAuthorityOffices = createSelector(
  selectClientCRAuthorityOfficesState,
  (state) => state.items
);
export const selectClientCRAuthorityOfficesTotal = createSelector(
  selectClientCRAuthorityOfficesState,
  (state) => state.totalCount
);
export const selectClientCRAuthorityOfficesHistory = createSelector(
  selectClientCRAuthorityOfficesState,
  (state) => state.history
);
export const selectCurrentClientCRAuthorityOffice = createSelector(
  selectClientCRAuthorityOfficesState,
  (state) => state.current
);
export const selectClientCRAuthorityOfficesLoading = createSelector(
  selectClientCRAuthorityOfficesState,
  (state) => state.loading
);
export const selectClientCRAuthorityOfficesError = createSelector(
  selectClientCRAuthorityOfficesState,
  (state) => state.error
);
