import { ClientLegal } from './client-legal.model';

export interface ClientLegalsState {
  items: ClientLegal[];
  history: ClientLegal[];
  current?: ClientLegal;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialClientLegalsState: ClientLegalsState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
