import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FollowupPointsState } from './followup-points.state';

export const selectFollowupPointsState =
  createFeatureSelector<FollowupPointsState>('followupPoints');
export const selectFollowupPoints = createSelector(
  selectFollowupPointsState,
  (state) => state.items
);
export const selectFollowupPointsTotal = createSelector(
  selectFollowupPointsState,
  (state) => state.totalCount
);
export const selectFollowupPointsHistory = createSelector(
  selectFollowupPointsState,
  (state) => state.history
);
export const selectCurrentFollowupPoint = createSelector(
  selectFollowupPointsState,
  (state) => state.current
);
export const selectFollowupPointsLoading = createSelector(
  selectFollowupPointsState,
  (state) => state.loading
);
export const selectFollowupPointsError = createSelector(
  selectFollowupPointsState,
  (state) => state.error
);

