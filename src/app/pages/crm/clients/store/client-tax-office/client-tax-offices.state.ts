import { ClientTaxOffice } from './client-tax-office.model';

export interface ClientTaxOfficesState {
  items: ClientTaxOffice[];
  history: ClientTaxOffice[];
  current?: ClientTaxOffice;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialClientTaxOfficesState: ClientTaxOfficesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
