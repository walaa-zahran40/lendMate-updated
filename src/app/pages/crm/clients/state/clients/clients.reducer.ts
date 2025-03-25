import { createReducer, on } from '@ngrx/store';
import { initialClientsState } from './clients.state';
import * as ClientsActions from './clients.actions';

export const clientsReducer = createReducer(
  initialClientsState,
  on(ClientsActions.loadClients, (state: any) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ClientsActions.loadClientsSuccess, (state: any, { clients }: any) => ({
    ...state,
    clients,
    loading: false
  })),
  on(ClientsActions.loadClientsFailure, (state: any, { error }: any) => ({
    ...state,
    error,
    loading: false
  }))
);
