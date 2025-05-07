export interface CurrencyExchangeRate {
  id: number;
  currencyId: number;
  currency?: any;
  exchangeRate: number;
  exchangeDate: Date;
  isCurrent?: boolean;
  isActive?: boolean;
  currencyExchangeRates?: boolean;
}
