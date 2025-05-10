import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OfficersState } from './officers.state';

export const selectOfficersState =
  createFeatureSelector<OfficersState>('officers');
export const selectOfficers = createSelector(
  selectOfficersState,
  (state) => state.items
);
export const selectOfficersTotal = createSelector(
  selectOfficersState,
  (state) => state.totalCount
);
export const selectOfficersHistory = createSelector(
  selectOfficersState,
  (state) => state.history
);
export const selectCurrentOfficer = createSelector(
  selectOfficersState,
  (state) => state.current
);
export const selectOfficersLoading = createSelector(
  selectOfficersState,
  (state) => state.loading
);
export const selectOfficersError = createSelector(
  selectOfficersState,
  (state) => state.error
);

