import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientSalesTurnoversState } from './client-sales-turnovers.state';

export const selectClientSalesTurnoversState =
  createFeatureSelector<ClientSalesTurnoversState>('clientSalesTurnovers');
export const selectClientSalesTurnovers = createSelector(
  selectClientSalesTurnoversState,
  (state) => state.items
);
export const selectClientSalesTurnoversTotal = createSelector(
  selectClientSalesTurnoversState,
  (state) => state.totalCount
);
export const selectClientSalesTurnoversHistory = createSelector(
  selectClientSalesTurnoversState,
  (state) => state.history
);
export const selectCurrentClientSalesTurnover = createSelector(
  selectClientSalesTurnoversState,
  (state) => state.current
);
export const selectClientSalesTurnoversLoading = createSelector(
  selectClientSalesTurnoversState,
  (state) => state.loading
);
export const selectClientSalesTurnoversError = createSelector(
  selectClientSalesTurnoversState,
  (state) => state.error
);

