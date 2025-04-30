import { createReducer, on } from '@ngrx/store';
import * as Actions from './currencies.actions';
import { initialCurrenciesState } from './currencies.state';

export const currenciesReducer = createReducer(
  initialCurrenciesState,
  on(Actions.loadCurrencies, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadCurrenciesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadCurrenciesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadCurrenciesHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadCurrenciesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadCurrenciesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadCurrency, (state) => ({ ...state, loading: true })),
  on(Actions.loadCurrencySuccess, (state, { currency }) => ({
    ...state,
    current: currency,
    loading: false,
  })),
  on(Actions.loadCurrencyFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createCurrency, (state) => ({ ...state, loading: true })),
  on(Actions.createCurrencySuccess, (state, { currency }) => ({
    ...state,
    items: [...state.items, currency],
    loading: false,
  })),
  on(Actions.createCurrencyFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateCurrency, (state) => ({ ...state, loading: true })),
  on(Actions.updateCurrencySuccess, (state, { currency }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === currency.id ? currency : ct
    ),
    loading: false,
  })),
  on(Actions.updateCurrencyFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteCurrency, (state) => ({ ...state, loading: true })),
  on(Actions.deleteCurrencySuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteCurrencyFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
