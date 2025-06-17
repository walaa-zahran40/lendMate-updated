import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrencyExchangeRatesState } from './currency-exchange-rates.state';

export const selectCurrencyExchangeRatesState =
  createFeatureSelector<CurrencyExchangeRatesState>('currencyExchangeRates');
export const selectCurrencyExchangeRates = createSelector(
  selectCurrencyExchangeRatesState,
  (state) => state.items
);
export const selectCurrencyExchangeRatesTotal = createSelector(
  selectCurrencyExchangeRatesState,
  (state) => state.totalCount
);
export const selectCurrencyExchangeRatesHistory = createSelector(
  selectCurrencyExchangeRatesState,
  (state) => state.history
);
export const selectCurrentCurrencyExchangeRate = createSelector(
  selectCurrencyExchangeRatesState,
  (state) => state.current
);
export const selectCurrencyExchangeRatesLoading = createSelector(
  selectCurrencyExchangeRatesState,
  (state) => state.loading
);
export const selectCurrencyExchangeRatesError = createSelector(
  selectCurrencyExchangeRatesState,
  (state) => state.error
);

// History management selectors
export const selectCurrencyExchangeRateHistoryState =
  createFeatureSelector<CurrencyExchangeRatesState>(
    'currencyExchangeRateHistory'
  );

export const selectCurrencyExchangeRateHistory = createSelector(
  selectCurrencyExchangeRateHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectCurrencyExchangeRateHistoryState,
  (state) => state.historyLoaded
);
