import { ClientAddress } from './client-addresses.model';

export interface ClientsAddressesState {
  items: ClientAddress[];
  totalCount: number;
  loading: boolean;
  error: any;
}

export const initialClientsAddressesState: ClientsAddressesState = {
  items: [],
  totalCount: 0,
  loading: false,
  error: null,
};
