import { createAction, props } from '@ngrx/store';
import { Country } from './country.model';

// Load all
export const loadCountries = createAction('[Countries] Load All');
export const loadCountriesSuccess = createAction(
  '[Countries] Load All Success',
  props<{ items: Country[]; totalCount: number }>()
);
export const loadCountriesFailure = createAction(
  '[Countries] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadCountriesHistory = createAction(
  '[Countries] Load History'
);
export const loadCountriesHistorySuccess = createAction(
  '[Countries] Load History Success',
  props<{ history: Country[] }>()
);
export const loadCountriesHistoryFailure = createAction(
  '[Countries] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadCountry = createAction(
  '[Countries] Load One',
  props<{ id: number }>()
);
export const loadCountrySuccess = createAction(
  '[Countries] Load One Success',
  props<{ country: Country }>()
);
export const loadCountryFailure = createAction(
  '[Countries] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createCountry = createAction(
  '[Countries] Create',
  props<{ data: Partial<Country> }>()
);
export const createCountrySuccess = createAction(
  '[Countries] Create Success',
  props<{ country: Country }>()
);
export const createCountryFailure = createAction(
  '[Countries] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateCountry = createAction(
  '[Countries] Update',
  props<{ id: number; data: Partial<Country> }>()
);
export const updateCountrySuccess = createAction(
  '[Countries] Update Success',
  props<{ country: Country }>()
);
export const updateCountryFailure = createAction(
  '[Countries] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteCountry = createAction(
  '[Countries] Delete',
  props<{ id: number }>()
);
export const deleteCountrySuccess = createAction(
  '[Countries] Delete Success',
  props<{ id: number }>()
);
export const deleteCountryFailure = createAction(
  '[Countries] Delete Failure',
  props<{ error: any }>()
);
