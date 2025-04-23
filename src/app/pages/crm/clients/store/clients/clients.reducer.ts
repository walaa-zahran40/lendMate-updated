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
  on(ClientsActions.createClientSuccess, (state, { client }) => ({
    ...state,
    clients: [client, ...(state.clients ?? [])],
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
  })),
  on(ClientsActions.deleteClientSuccess, (state, { clientId }) => ({
    ...state,
    clients: state.clients.filter((client) => client.id !== clientId),
  })),
  // Load client edit form
  on(ClientsActions.loadClientSuccess, (state, { client }) => ({
    ...state,
    selectedClient: client,
    error: null,
  })),
  on(ClientsActions.loadClientFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  // Update client
  on(ClientsActions.updateClientSuccess, (state, { client }) => ({
    ...state,
    // Option A: Update the selected client used for the edit form
    selectedClient: client,
    // Option B (if you’re storing the list): Replace the updated client in the list
    clients: state.clients.map((item) =>
      item.id === client.id ? client : item
    ),
    error: null,
  })),
  on(ClientsActions.updateClientFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
