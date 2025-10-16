import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FollowupsState } from './followups.state';

export const selectFollowupsState =
  createFeatureSelector<FollowupsState>('followups');
export const selectFollowups = createSelector(
  selectFollowupsState,
  (state) => state.items
);
export const selectFollowupsTotal = createSelector(
  selectFollowupsState,
  (state) => state.totalCount
);
export const selectFollowupsHistory = createSelector(
  selectFollowupsState,
  (state) => state.history
);
export const selectCurrentFollowup = createSelector(
  selectFollowupsState,
  (state) => state.current
);
export const selectFollowupsLoading = createSelector(
  selectFollowupsState,
  (state) => state.loading
);
export const selectFollowupsError = createSelector(
  selectFollowupsState,
  (state) => state.error
);

