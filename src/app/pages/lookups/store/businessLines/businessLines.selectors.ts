import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BusinessLinesState } from './businessLines.state';

export const selectBusinessLinesState =
  createFeatureSelector<BusinessLinesState>('businessLines');
export const selectBusinessLines = createSelector(
  selectBusinessLinesState,
  (state) => state.items
);
export const selectBusinessLinesTotal = createSelector(
  selectBusinessLinesState,
  (state) => state.totalCount
);
export const selectBusinessLinesHistory = createSelector(
  selectBusinessLinesState,
  (state) => state.history
);
export const selectCurrentBusinessLine = createSelector(
  selectBusinessLinesState,
  (state) => state.current
);
export const selectBusinessLinesLoading = createSelector(
  selectBusinessLinesState,
  (state) => state.loading
);
export const selectBusinessLinesError = createSelector(
  selectBusinessLinesState,
  (state) => state.error
);

