import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UIState } from './ui-state.reducer';

export const selectUIState = createFeatureSelector<UIState>('ui');

export const selectLastOperationSuccess = createSelector(
  selectUIState,
  (state) => state?.lastOperationSuccess
);
