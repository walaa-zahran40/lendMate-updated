// individual.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IndividualState } from './individual.state';

export const selectIndividualState =
  createFeatureSelector<IndividualState>('individual');

export const selectAllIndividuals = createSelector(
  selectIndividualState,
  (state) => state.individuals
);

export const selectTotalCount = createSelector(
  selectIndividualState,
  (state) => state.totalCount
);

export const selectSelectedIndividual = createSelector(
  selectIndividualState,
  (state) => state.selectedIndividual
);

export const selectLoading = createSelector(
  selectIndividualState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectIndividualState,
  (state) => state.error
);
