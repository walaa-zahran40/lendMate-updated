import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientOfficersState } from './client-officers.state';

export const selectClientOfficersState =
  createFeatureSelector<ClientOfficersState>('clientOfficers');
export const selectClientOfficers = createSelector(
  selectClientOfficersState,
  (state) => state.items
);
export const selectClientOfficersTotal = createSelector(
  selectClientOfficersState,
  (state) => state.totalCount
);
export const selectClientOfficersHistory = createSelector(
  selectClientOfficersState,
  (state) => state.history
);
export const selectCurrentClientOfficer = createSelector(
  selectClientOfficersState,
  (state) => state.current
);
export const selectClientOfficersLoading = createSelector(
  selectClientOfficersState,
  (state) => state.loading
);
export const selectClientOfficersError = createSelector(
  selectClientOfficersState,
  (state) => state.error
);
