import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GovernoratesState } from './governorates.state';

export const selectGovernoratesState =
  createFeatureSelector<GovernoratesState>('companyTypes');
export const selectGovernorates = createSelector(
  selectGovernoratesState,
  (state) => state.items
);
export const selectGovernoratesTotal = createSelector(
  selectGovernoratesState,
  (state) => state.totalCount
);
export const selectGovernoratesHistory = createSelector(
  selectGovernoratesState,
  (state) => state.history
);
export const selectCurrentGovernorate = createSelector(
  selectGovernoratesState,
  (state) => state.current
);
export const selectGovernoratesLoading = createSelector(
  selectGovernoratesState,
  (state) => state.loading
);
export const selectGovernoratesError = createSelector(
  selectGovernoratesState,
  (state) => state.error
);
