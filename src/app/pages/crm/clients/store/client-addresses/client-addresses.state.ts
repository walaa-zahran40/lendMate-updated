import { ClientAddress } from './client-address.model';

export interface ClientAddressesState {
  items: ClientAddress[];
  history: ClientAddress[];
  current?: ClientAddress;
  loading: boolean;
  error: any;
  totalCount: number;
}

export const initialClientAddressesState: ClientAddressesState = {
  items: [],
  history: [],
  current: undefined,
  loading: false,
  error: null,
  totalCount: 0,
};
