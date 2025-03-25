import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientsState } from './clients.state';

export const selectClientsState = createFeatureSelector<ClientsState>('clients');

export const selectAllClients = createSelector(
  selectClientsState,
  (state: { clients: any; }) => state.clients
);

export const selectClientsLoading = createSelector(
  selectClientsState,
  (state: { loading: any; }) => state.loading
);
