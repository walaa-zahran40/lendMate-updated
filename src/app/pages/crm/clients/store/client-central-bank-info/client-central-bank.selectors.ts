import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  clientCentralBankFeatureKey,
  ClientCentralBankState,
  adapter,
} from './client-central-bank.state';

// 1) Create a feature selector
const selectFeature = createFeatureSelector<ClientCentralBankState>(
  clientCentralBankFeatureKey
);

// 2) Pull the selectors off your adapter
export const {
  selectAll: selectAllBanks,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors(selectFeature);

export const selectLoading = createSelector(
  selectFeature,
  (state) => state.loading
);

export const selectError = createSelector(
  selectFeature,
  (state) => state.error
);

export const selectSelectedId = createSelector(
  selectFeature,
  (state) => state.selectedId
);

export const selectSelectedBank = createSelector(
  selectFeature,
  selectSelectedId,
  (state, id) => (id != null ? state.entities[id] : null)
);

export const selectHistory = createSelector(
  selectFeature,
  (state) => state.history
);

export const selectHistoryLoading = createSelector(
  selectFeature,
  (state) => state.historyLoading
);
