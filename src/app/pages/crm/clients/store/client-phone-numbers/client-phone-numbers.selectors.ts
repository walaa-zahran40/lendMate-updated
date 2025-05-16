import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientPhoneNumbersState } from './client-phone-numbers.state';

export const selectClientPhoneNumbersState =
  createFeatureSelector<ClientPhoneNumbersState>('clientPhoneNumbers');
export const selectClientPhoneNumbers = createSelector(
  selectClientPhoneNumbersState,
  (state) => state.items
);
export const selectClientPhoneNumbersTotal = createSelector(
  selectClientPhoneNumbersState,
  (state) => state.totalCount
);
export const selectClientPhoneNumbersHistory = createSelector(
  selectClientPhoneNumbersState,
  (state) => state.history
);
export const selectCurrentClientPhoneNumber = createSelector(
  selectClientPhoneNumbersState,
  (state) => state.current
);
export const selectClientPhoneNumbersLoading = createSelector(
  selectClientPhoneNumbersState,
  (state) => state.loading
);
export const selectClientPhoneNumbersError = createSelector(
  selectClientPhoneNumbersState,
  (state) => state.error
);

