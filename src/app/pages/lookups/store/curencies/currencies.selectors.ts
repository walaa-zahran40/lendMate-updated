import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrenciesState } from './currencies.state';

export const selectCurrenciesState =
  createFeatureSelector<CurrenciesState>('currencies');
export const selectCurrencies = createSelector(
  selectCurrenciesState,
  (state) => state.items
);
export const selectCurrenciesTotal = createSelector(
  selectCurrenciesState,
  (state) => state.totalCount
);
export const selectCurrenciesHistory = createSelector(
  selectCurrenciesState,
  (state) => state.history
);
export const selectCurrentCurrencyy = createSelector(
  selectCurrenciesState,
  (state) => state.current
);
export const selectCurrenciesLoading = createSelector(
  selectCurrenciesState,
  (state) => state.loading
);
export const selectCurrenciesError = createSelector(
  selectCurrenciesState,
  (state) => state.error
);

