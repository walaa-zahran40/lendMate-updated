import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TMLOfficersState } from './client-tml-officers.state';

export const selectTMLOfficersState =
  createFeatureSelector<TMLOfficersState>('clientTMLOfficers');
export const selectTMLOfficers = createSelector(
  selectTMLOfficersState,
  (state) => state.items
);
export const selectTMLOfficersHistory = createSelector(
  selectTMLOfficersState,
  (state) => state.history
);
export const selectTMLOfficersLoading = createSelector(
  selectTMLOfficersState,
  (state) => state.loading
);
export const selectTMLOfficersError = createSelector(
  selectTMLOfficersState,
  (state) => state.error
);
