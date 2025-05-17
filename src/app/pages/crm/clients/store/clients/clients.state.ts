import { Client } from './client.model';

export interface ClientsState {
  clients: Client[];
  loading: boolean;
  error: any;
  subSectorList: number[];
  selectedClient: Client | null;
}

export const initialClientsState: ClientsState = {
  subSectorList: [],
  clients: [],
  loading: false,
  error: null,
  selectedClient: null,
};
