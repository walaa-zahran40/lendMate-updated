import { ClientSalesTurnover } from './client-sales-turnovers.model';

export interface ClientSalesTurnoversState {
  items: ClientSalesTurnover[];
  history: ClientSalesTurnover[];
  current?: ClientSalesTurnover;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialClientSalesTurnoversState: ClientSalesTurnoversState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
