import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeamOfficersState } from './team-officers.state';

export const selectTeamOfficersState =
  createFeatureSelector<TeamOfficersState>('teamOfficers');
export const selectTeamOfficers = createSelector(
  selectTeamOfficersState,
  (state) => state.items
);
export const selectTeamOfficersTotal = createSelector(
  selectTeamOfficersState,
  (state) => state.totalCount
);
export const selectTeamOfficersHistory = createSelector(
  selectTeamOfficersState,
  (state) => state.history
);
export const selectCurrentTeamOfficer = createSelector(
  selectTeamOfficersState,
  (state) => state.current
);
export const selectTeamOfficersLoading = createSelector(
  selectTeamOfficersState,
  (state) => state.loading
);
export const selectTeamOfficersError = createSelector(
  selectTeamOfficersState,
  (state) => state.error
);
