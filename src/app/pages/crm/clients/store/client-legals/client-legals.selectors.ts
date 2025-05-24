import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientLegalsState } from './client-legals.state';

export const selectClientLegalsState =
  createFeatureSelector<ClientLegalsState>('clientLegals');
export const selectClientLegals = createSelector(
  selectClientLegalsState,
  (state) => state.items
);
export const selectClientLegalsTotal = createSelector(
  selectClientLegalsState,
  (state) => state.totalCount
);
export const selectClientLegalsHistory = createSelector(
  selectClientLegalsState,
  (state) => state.history
);
export const selectCurrentClientLegal = createSelector(
  selectClientLegalsState,
  (state) => state.current
);
export const selectClientLegalsLoading = createSelector(
  selectClientLegalsState,
  (state) => state.loading
);
export const selectClientLegalsError = createSelector(
  selectClientLegalsState,
  (state) => state.error
);
