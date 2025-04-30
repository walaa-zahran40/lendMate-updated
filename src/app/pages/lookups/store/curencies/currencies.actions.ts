import { createAction, props } from '@ngrx/store';
import { Currency } from './currency.model';

// Load all
export const loadCurrencies = createAction('[Currencies] Load All');
export const loadCurrenciesSuccess = createAction(
  '[Currencies] Load All Success',
  props<{ items: Currency[]; totalCount: number }>()
);
export const loadCurrenciesFailure = createAction(
  '[Currencies] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadCurrenciesHistory = createAction(
  '[Currencies] Load History'
);
export const loadCurrenciesHistorySuccess = createAction(
  '[Currencies] Load History Success',
  props<{ history: Currency[] }>()
);
export const loadCurrenciesHistoryFailure = createAction(
  '[Currencies] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadCurrency = createAction(
  '[Currencies] Load One',
  props<{ id: number }>()
);
export const loadCurrenciesuccess = createAction(
  '[Currencies] Load One Success',
  props<{ Currency: Currency }>()
);
export const loadCurrencyFailure = createAction(
  '[Currencies] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createCurrency = createAction(
  '[Currencies] Create',
  props<{ data: Partial<Currency> }>()
);
export const createCurrenciesuccess = createAction(
  '[Currencies] Create Success',
  props<{ Currency: Currency }>()
);
export const createCurrencyFailure = createAction(
  '[Currencies] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateCurrency = createAction(
  '[Currencies] Update',
  props<{ id: number; data: Partial<Currency> }>()
);
export const updateCurrenciesuccess = createAction(
  '[Currencies] Update Success',
  props<{ Currency: Currency }>()
);
export const updateCurrencyFailure = createAction(
  '[Currencies] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteCurrency = createAction(
  '[Currencies] Delete',
  props<{ id: number }>()
);
export const deleteCurrenciesuccess = createAction(
  '[Currencies] Delete Success',
  props<{ id: number }>()
);
export const deleteCurrencyFailure = createAction(
  '[Currencies] Delete Failure',
  props<{ error: any }>()
);
