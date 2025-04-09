import { createReducer, on } from '@ngrx/store';
import * as ClientsActions from './clients.actions';
import { initialClientsState } from './clients.state';

export const clientsReducer = createReducer(
  initialClientsState,
  on(ClientsActions.loadClients, (state: any) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClientsActions.loadClientsSuccess, (state: any, { clients }: any) => ({
    ...state,
    clients,
    loading: false,
  })),
  on(ClientsActions.createClientSuccess, (state: any, { client }: any) => ({
    ...state,
    clients: [...(state.clients ?? []), client],
    loading: false,
  })),
  on(ClientsActions.createClientFailure, (state: any, { error }: any) => ({
    ...state,
    error,
    loading: false,
  })),
  on(ClientsActions.loadClientsFailure, (state: any, { error }: any) => ({
    ...state,
    error,
    loading: false,
  })),
  on(ClientsActions.updateSubSectorList, (state, { subSectorIds }) => ({
    ...state,
    subSectorList: subSectorIds,
  }))
);
