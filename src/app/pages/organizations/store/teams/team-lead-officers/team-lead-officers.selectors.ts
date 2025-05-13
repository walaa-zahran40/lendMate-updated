import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeamLeadOfficersState } from './team-lead-officers.state';

export const selectTeamLeadOfficersState =
  createFeatureSelector<TeamLeadOfficersState>('teamLeadOfficers');
export const selectTeamLeadOfficers = createSelector(
  selectTeamLeadOfficersState,
  (state) => state.items
);
export const selectTeamLeadOfficersTotal = createSelector(
  selectTeamLeadOfficersState,
  (state) => state.totalCount
);
export const selectTeamLeadOfficersHistory = createSelector(
  selectTeamLeadOfficersState,
  (state) => state.history
);
export const selectCurrentTeamLeadOfficer = createSelector(
  selectTeamLeadOfficersState,
  (state) => state.current
);
export const selectTeamLeadOfficersLoading = createSelector(
  selectTeamLeadOfficersState,
  (state) => state.loading
);
export const selectTeamLeadOfficersError = createSelector(
  selectTeamLeadOfficersState,
  (state) => state.error
);

