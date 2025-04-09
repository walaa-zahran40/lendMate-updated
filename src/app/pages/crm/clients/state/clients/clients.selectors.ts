import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientsState } from './clients.state';

export const selectClientsState =
  createFeatureSelector<ClientsState>('clients');

export const selectAllClients = createSelector(
  selectClientsState,
  (state: ClientsState) => state.clients ?? [] // ✅ fallback to []
);

export const selectClientsLoading = createSelector(
  selectClientsState,
  (state: ClientsState) => state.loading
);
export const selectSubSectorList = createSelector(
  selectClientsState,
  (state) => state.subSectorList
);
