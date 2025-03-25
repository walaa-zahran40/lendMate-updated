import { Client } from "../../../../../shared/interfaces/client.interface";

 
export interface ClientsState {
  clients: Client[];
  loading: boolean;
  error: any;
}

export const initialClientsState: ClientsState = {
  clients: [],
  loading: false,
  error: null
};
