import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientShareHoldersState } from './client-share-holders.state';

export const selectClientShareHoldersState =
  createFeatureSelector<ClientShareHoldersState>('clientShareHolders');
export const selectClientShareHolders = createSelector(
  selectClientShareHoldersState,
  (state) => state.items
);
export const selectClientShareHoldersTotal = createSelector(
  selectClientShareHoldersState,
  (state) => state.totalCount
);
export const selectClientShareHoldersHistory = createSelector(
  selectClientShareHoldersState,
  (state) => state.history
);
export const selectCurrentClientShareHolder = createSelector(
  selectClientShareHoldersState,
  (state) => state.current
);
export const selectClientShareHoldersLoading = createSelector(
  selectClientShareHoldersState,
  (state) => state.loading
);
export const selectClientShareHoldersError = createSelector(
  selectClientShareHoldersState,
  (state) => state.error
);
