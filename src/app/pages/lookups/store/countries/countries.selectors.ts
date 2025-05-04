import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountriesState } from './countries.state';

export const selectCountriesState =
  createFeatureSelector<CountriesState>('countries');
export const selectCountries = createSelector(
  selectCountriesState,
  (state) => state.items
);
export const selectCountriesTotal = createSelector(
  selectCountriesState,
  (state) => state.totalCount
);
export const selectCountriesHistory = createSelector(
  selectCountriesState,
  (state) => state.history
);
export const selectCurrentCountry = createSelector(
  selectCountriesState,
  (state) => state.current
);
export const selectCountriesLoading = createSelector(
  selectCountriesState,
  (state) => state.loading
);
export const selectCountriesError = createSelector(
  selectCountriesState,
  (state) => state.error
);
