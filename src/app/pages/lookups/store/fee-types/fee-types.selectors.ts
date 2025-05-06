import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeeTypesState } from './fee-types.state';

export const selectFeeTypesState =
  createFeatureSelector<FeeTypesState>('feeTypes');
export const selectFeeTypes = createSelector(
  selectFeeTypesState,
  (state) => state.items
);
export const selectFeeTypesTotal = createSelector(
  selectFeeTypesState,
  (state) => state.totalCount
);
export const selectFeeTypesHistory = createSelector(
  selectFeeTypesState,
  (state) => state.history
);
export const selectCurrentFeeType = createSelector(
  selectFeeTypesState,
  (state) => state.current
);
export const selectFeeTypesLoading = createSelector(
  selectFeeTypesState,
  (state) => state.loading
);
export const selectFeeTypesError = createSelector(
  selectFeeTypesState,
  (state) => state.error
);

