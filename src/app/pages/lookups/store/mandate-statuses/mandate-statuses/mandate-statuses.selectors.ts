import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MandateStatusesState } from './mandate-statuses.state';

export const selectMandateStatusesState =
  createFeatureSelector<MandateStatusesState>('mandateStatuses');
export const selectMandateStatuses = createSelector(
  selectMandateStatusesState,
  (state) => state.items
);
export const selectMandateStatusesTotal = createSelector(
  selectMandateStatusesState,
  (state) => state.totalCount
);
export const selectMandateStatusesHistory = createSelector(
  selectMandateStatusesState,
  (state) => state.history
);
export const selectCurrentMandateStatus = createSelector(
  selectMandateStatusesState,
  (state) => state.current
);
export const selectMandateStatusesLoading = createSelector(
  selectMandateStatusesState,
  (state) => state.loading
);
export const selectMandateStatusesError = createSelector(
  selectMandateStatusesState,
  (state) => state.error
);

// History management selectors
export const selectMandateStatusHistoryState =
  createFeatureSelector<MandateStatusesState>('mandateStatusHistory');

export const selectMandateStatusHistory = createSelector(
  selectMandateStatusHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectMandateStatusHistoryState,
  (state) => state.historyLoaded
);
