import { CurrencyExchangeRate } from './currency-exchange-rate.model';

export interface CurrencyExchangeRatesState {
  items: CurrencyExchangeRate[];
  history: CurrencyExchangeRate[];
  current?: CurrencyExchangeRate;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialCurrencyExchangeRatesState: CurrencyExchangeRatesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
