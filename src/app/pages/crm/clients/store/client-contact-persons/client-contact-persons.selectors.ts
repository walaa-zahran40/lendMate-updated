import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientContactPersonsState } from './client-contact-persons.state';

export const selectClientContactPersonsState =
  createFeatureSelector<ClientContactPersonsState>('clientContactPersons');
export const selectClientContactPersons = createSelector(
  selectClientContactPersonsState,
  (state) => state.items
);
export const selectClientContactPersonsTotal = createSelector(
  selectClientContactPersonsState,
  (state) => state.totalCount
);
export const selectClientContactPersonsHistory = createSelector(
  selectClientContactPersonsState,
  (state) => state.history
);
export const selectCurrentClientContactPerson = createSelector(
  selectClientContactPersonsState,
  (state) => state.current
);
export const selectClientContactPersonsLoading = createSelector(
  selectClientContactPersonsState,
  (state) => state.loading
);
export const selectClientContactPersonsError = createSelector(
  selectClientContactPersonsState,
  (state) => state.error
);

