import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { CurrencyExchangeRate } from './currency-exchange-rate.model';

export interface CurrencyExchangeRatesState {
  items: CurrencyExchangeRate[];
  current?: CurrencyExchangeRate;
  loading: boolean;
  error: any;
  totalCount: number;
  //History management
  history: CurrencyExchangeRate[];
  historyLoaded: boolean;
  historyError: any;
}
export const adapter: EntityAdapter<CurrencyExchangeRate> =
  createEntityAdapter<CurrencyExchangeRate>();

export const initialCurrencyExchangeRatesState: CurrencyExchangeRatesState = {
  items: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
  history: [],
  historyLoaded: false,
  historyError: null,
};
