import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientsState } from './clients.state';

// 1) Declare the *global* slice shape here, inline:
interface ClientsFeature {
  clients: ClientsState;
}

// 2) Tell NgRx that under the key 'clients' you have a ClientsState
export const selectClientsState = createFeatureSelector<
  ClientsFeature,
  ClientsState
>('clients');

// 3) Now your projection functions see `state` as ClientsState, so `.clients` exists

export const selectAllClients = createSelector(
  selectClientsState,
  (state: ClientsState) => state.clients
);

export const selectClientsLoading = createSelector(
  selectClientsState,
  (state: ClientsState) => state.loading
);

export const selectSubSectorList = createSelector(
  selectClientsState,
  (state: ClientsState) => state.subSectorList
);

export const selectSelectedClient = createSelector(
  selectClientsState,
  (state: ClientsState) => state.selectedClient
);
