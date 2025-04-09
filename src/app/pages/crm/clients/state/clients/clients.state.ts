import { Client } from '../../../../../shared/interfaces/client.interface';

export interface ClientsState {
  clients: Client[];
  loading: boolean;
  error: any;
  subSectorList: number[];
}

export const initialClientsState: ClientsState = {
  subSectorList: [],
  clients: [],
  loading: false,
  error: null,
};
