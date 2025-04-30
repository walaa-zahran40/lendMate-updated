// currencies.state.ts
import { Currency } from './currency.model';

export interface CurrenciesState {
  items: Currency[];
  history: Currency[];
  current?: Currency;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialCurrenciesState: CurrenciesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
