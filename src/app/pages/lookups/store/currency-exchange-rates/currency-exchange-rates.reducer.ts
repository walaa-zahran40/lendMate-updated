import { createReducer, on } from '@ngrx/store';
import * as Actions from './currency-exchange-rates.actions';
import { initialCurrencyExchangeRatesState } from './currency-exchange-rates.state';

export const currencyExchangeRatesReducer = createReducer(
  initialCurrencyExchangeRatesState,
  on(Actions.loadCurrencyExchangeRates, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadCurrencyExchangeRatesSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadCurrencyExchangeRatesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadCurrencyExchangeRatesHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadCurrencyExchangeRatesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadCurrencyExchangeRatesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadCurrencyExchangeRate, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadCurrencyExchangeRateSuccess, (state, { currency }) => ({
    ...state,
    current: currency,
    loading: false,
  })),
  on(Actions.loadCurrencyExchangeRateFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createCurrencyExchangeRate, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createCurrencyExchangeRateSuccess, (state, { currency }) => ({
    ...state,
    items: [...state.items, currency],
    loading: false,
  })),
  on(Actions.createCurrencyExchangeRateFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateCurrencyExchangeRate, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateCurrencyExchangeRateSuccess, (state, { currency }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === currency.id ? currency : ct)),
    loading: false,
  })),
  on(Actions.updateCurrencyExchangeRateFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteCurrencyExchangeRate, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteCurrencyExchangeRateSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteCurrencyExchangeRateFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadCurrencyExchangeRatesByCurrencyId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadCurrencyExchangeRatesByCurrencyIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadCurrencyExchangeRatesByCurrencyIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
