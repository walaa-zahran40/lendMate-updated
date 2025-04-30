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
  on(Actions.loadCurrenciesuccess, (state, { Currency }) => ({
    ...state,
    current: Currency,
    loading: false,
  })),
  on(Actions.loadCurrencyFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createCurrency, (state) => ({ ...state, loading: true })),
  on(Actions.createCurrenciesuccess, (state, { Currency }) => ({
    ...state,
    items: [...state.items, Currency],
    loading: false,
  })),
  on(Actions.createCurrencyFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateCurrency, (state) => ({ ...state, loading: true })),
  on(Actions.updateCurrenciesuccess, (state, { Currency }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === Currency.id ? Currency : ct
    ),
    loading: false,
  })),
  on(Actions.updateCurrencyFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteCurrency, (state) => ({ ...state, loading: true })),
  on(Actions.deleteCurrenciesuccess, (state, { id }) => ({
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
