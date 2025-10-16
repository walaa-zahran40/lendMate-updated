import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientStatusesState } from './client-statuses.state';

export const selectClientStatusesState =
  createFeatureSelector<ClientStatusesState>('clientStatuses');
export const selectClientStatuses = createSelector(
  selectClientStatusesState,
  (state) => state.items
);
export const selectClientStatusesTotal = createSelector(
  selectClientStatusesState,
  (state) => state.totalCount
);
export const selectClientStatusesHistory = createSelector(
  selectClientStatusesState,
  (state) => state.history
);
export const selectCurrentClientStatus = createSelector(
  selectClientStatusesState,
  (state) => state.current
);
export const selectClientStatusesLoading = createSelector(
  selectClientStatusesState,
  (state) => state.loading
);
export const selectClientStatusesError = createSelector(
  selectClientStatusesState,
  (state) => state.error
);
// History management selectors
export const selectClientStatusState =
  createFeatureSelector<ClientStatusesState>('clientStatuses');

export const selectClientStatusHistory = createSelector(
  selectClientStatusState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectClientStatusState,
  (state) => state.historyLoaded
);
