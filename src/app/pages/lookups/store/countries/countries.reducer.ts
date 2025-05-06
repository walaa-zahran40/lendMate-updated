import { createReducer, on } from '@ngrx/store';
import * as Actions from './countries.actions';
import { initialCountriesState } from './countries.state';

export const countriesReducer = createReducer(
  initialCountriesState,
  on(Actions.loadCountries, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadCountriesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadCountriesHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadCountriesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadCountriesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadCountry, (state) => ({ ...state, loading: true })),
  on(Actions.loadCountrySuccess, (state, { country }) => ({
    ...state,
    current: country,
    loading: false,
  })),
  on(Actions.loadCountryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createCountry, (state) => ({ ...state, loading: true })),
  on(Actions.createCountrySuccess, (state, { country }) => ({
    ...state,
    items: [...state.items, country],
    loading: false,
  })),
  on(Actions.createCountryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateCountry, (state) => ({ ...state, loading: true })),
  on(Actions.updateCountrySuccess, (state, { country }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === country.id ? country : ct)),
    loading: false,
  })),
  on(Actions.updateCountryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteCountry, (state) => ({ ...state, loading: true })),
  on(Actions.deleteCountrySuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteCountryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
