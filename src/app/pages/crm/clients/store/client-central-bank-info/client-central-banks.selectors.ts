import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientCentralBankInfoState } from './client-central-banks.state';

export const selectClientCentralBankInfoState =
  createFeatureSelector<ClientCentralBankInfoState>('clientCentralBankInfo');
export const selectClientCentralBankInfo = createSelector(
  selectClientCentralBankInfoState,
  (state) => state.items
);
export const selectClientCentralBankInfoTotal = createSelector(
  selectClientCentralBankInfoState,
  (state) => state.totalCount
);
export const selectClientCentralBankInfoHistory = createSelector(
  selectClientCentralBankInfoState,
  (state) => state.history
);
export const selectCurrentClientCentralBankInfo = createSelector(
  selectClientCentralBankInfoState,
  (state) => state.current
);
export const selectClientCentralBankInfoLoading = createSelector(
  selectClientCentralBankInfoState,
  (state) => state.loading
);
export const selectClientCentralBankInfoError = createSelector(
  selectClientCentralBankInfoState,
  (state) => state.error
);
