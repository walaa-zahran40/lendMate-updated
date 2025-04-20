import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IndividualState } from './individual.state';

export const selectIndividualState =
  createFeatureSelector<IndividualState>('individual');

export const selectIndividual = createSelector(
  selectIndividualState,
  (state: IndividualState) => state.selectedIndividual
);
export const selectIsLoading = createSelector(
  selectIndividualState,
  (state) => state.loading
);

export const selectIndividualError = createSelector(
  selectIndividualState,
  (state) => state.error
);
