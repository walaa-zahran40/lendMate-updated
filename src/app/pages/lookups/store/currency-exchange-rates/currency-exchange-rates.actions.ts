import { createAction, props } from '@ngrx/store';
import { CurrencyExchangeRate } from './currency-exchange-rate.model';

// Load all
export const loadCurrencyExchangeRates = createAction(
  '[CurrencyExchangeRates] Load All'
);
export const loadCurrencyExchangeRatesSuccess = createAction(
  '[CurrencyExchangeRates] Load All Success',
  props<{ items: CurrencyExchangeRate[]; totalCount: number }>()
);
export const loadCurrencyExchangeRatesFailure = createAction(
  '[CurrencyExchangeRates] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadCurrencyExchangeRatesHistory = createAction(
  '[CurrencyExchangeRates] Load History'
);
export const loadCurrencyExchangeRatesHistorySuccess = createAction(
  '[CurrencyExchangeRates] Load History Success',
  props<{ history: CurrencyExchangeRate[] }>()
);
export const loadCurrencyExchangeRatesHistoryFailure = createAction(
  '[CurrencyExchangeRates] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadCurrencyExchangeRate = createAction(
  '[CurrencyExchangeRates] Load One',
  props<{ id: number }>()
);
export const loadCurrencyExchangeRateSuccess = createAction(
  '[CurrencyExchangeRates] Load One Success',
  props<{ currency: CurrencyExchangeRate }>()
);
export const loadCurrencyExchangeRateFailure = createAction(
  '[CurrencyExchangeRates] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createCurrencyExchangeRate = createAction(
  '[CurrencyExchangeRates] Create',
  props<{ data: Partial<CurrencyExchangeRate> }>()
);
export const createCurrencyExchangeRateSuccess = createAction(
  '[CurrencyExchangeRates] Create Success',
  props<{ currency: CurrencyExchangeRate }>()
);
export const createCurrencyExchangeRateFailure = createAction(
  '[CurrencyExchangeRates] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateCurrencyExchangeRate = createAction(
  '[CurrencyExchangeRates] Update',
  props<{ id: number; data: Partial<CurrencyExchangeRate> }>()
);
export const updateCurrencyExchangeRateSuccess = createAction(
  '[CurrencyExchangeRates] Update Success',
  props<{ currency: CurrencyExchangeRate }>()
);
export const updateCurrencyExchangeRateFailure = createAction(
  '[CurrencyExchangeRates] Update Failure',
  props<{ error: any }>()
);

// Load by CurrencyId
export const loadCurrencyExchangeRatesByCurrencyId = createAction(
  '[CurrencyExchangeRates] Load By CurrencyId',
  props<{ currencyId: number }>()
);
export const loadCurrencyExchangeRatesByCurrencyIdSuccess = createAction(
  '[CurrencyExchangeRates] Load By CurrencyId Success',
  props<{ items: CurrencyExchangeRate[] }>()
);
export const loadCurrencyExchangeRatesByCurrencyIdFailure = createAction(
  '[CurrencyExchangeRates] Load By CurrencyId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteCurrencyExchangeRate = createAction(
  '[CurrencyExchangeRates] Delete',
  props<{ id: number; currencyId: number }>()
);
export const deleteCurrencyExchangeRateSuccess = createAction(
  '[CurrencyExchangeRates] Delete Success',
  props<{ id: number; currencyId: number }>()
);
export const deleteCurrencyExchangeRateFailure = createAction(
  '[CurrencyExchangeRates] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadCurrencyExchangeRateHistory = createAction(
  '[CurrencyExchangeRate/API] Load CurrencyExchangeRate History'
);

export const loadCurrencyExchangeRateHistorySuccess = createAction(
  '[CurrencyExchangeRate/API] Load CurrencyExchangeRate History Success',
  props<{ history: CurrencyExchangeRate[] }>()
);

export const loadCurrencyExchangeRateHistoryFailure = createAction(
  '[CurrencyExchangeRate/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
