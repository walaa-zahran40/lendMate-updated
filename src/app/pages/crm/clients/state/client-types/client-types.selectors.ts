import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientTypesState } from './client-types.reducer';

export const selectClientTypesState =
  createFeatureSelector<ClientTypesState>('clientTypes');

export const selectAllClientTypes = createSelector(
  selectClientTypesState,
  (state) => state.types
);

export const selectClientTypesLoading = createSelector(
  selectClientTypesState,
  (state) => state.loading
);

export const selectClientTypesError = createSelector(
  selectClientTypesState,
  (state) => state.error
);
