import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientIdentitiesState } from './client-identities.state';

export const selectClientIdentitiesState =
  createFeatureSelector<ClientIdentitiesState>('clientIdentities');
export const selectClientIdentities = createSelector(
  selectClientIdentitiesState,
  (state) => state.items
);
export const selectClientIdentitiesTotal = createSelector(
  selectClientIdentitiesState,
  (state) => state.totalCount
);
export const selectClientIdentitiesHistory = createSelector(
  selectClientIdentitiesState,
  (state) => state.history
);
export const selectCurrentClientIdentity = createSelector(
  selectClientIdentitiesState,
  (state) => state.current
);
export const selectClientIdentitiesLoading = createSelector(
  selectClientIdentitiesState,
  (state) => state.loading
);
export const selectClientIdentitiesError = createSelector(
  selectClientIdentitiesState,
  (state) => state.error
);

