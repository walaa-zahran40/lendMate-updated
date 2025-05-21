import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientTMLOfficersState } from './client-tml-officers.state';

export const selectClientTMLOfficersState =
  createFeatureSelector<ClientTMLOfficersState>('clientTMLOfficers');
export const selectClientTMLOfficers = createSelector(
  selectClientTMLOfficersState,
  (state) => state.items
);
export const selectClientTMLOfficersTotal = createSelector(
  selectClientTMLOfficersState,
  (state) => state.totalCount
);
export const selectClientTMLOfficersHistory = createSelector(
  selectClientTMLOfficersState,
  (state) => state.history
);
export const selectCurrentClientTMLOfficer = createSelector(
  selectClientTMLOfficersState,
  (state) => state.current
);
export const selectClientTMLOfficersLoading = createSelector(
  selectClientTMLOfficersState,
  (state) => state.loading
);
export const selectClientTMLOfficersError = createSelector(
  selectClientTMLOfficersState,
  (state) => state.error
);
