import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromClientIdentities from './client-identities.reducer';

export const selectClientIdentitiesState =
  createFeatureSelector<fromClientIdentities.State>('clientIdentities');

export const selectAllClientIdentities = createSelector(
  selectClientIdentitiesState,
  fromClientIdentities.selectAll
);

export const selectClientIdentitiesEntities = createSelector(
  selectClientIdentitiesState,
  fromClientIdentities.selectEntities
);

export const selectClientIdentitiesLoading = createSelector(
  selectClientIdentitiesState,
  (state) => state.loading
);

export const selectClientIdentitiesError = createSelector(
  selectClientIdentitiesState,
  (state) => state.error
);

export const selectClientIdentitiesTotalCount = createSelector(
  selectClientIdentitiesState,
  (state) => state.totalCount
);
