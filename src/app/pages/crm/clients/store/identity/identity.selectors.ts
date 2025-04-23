import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IdentityState } from './identity.reducer';

export const selectIdentityState =
  createFeatureSelector<IdentityState>('identityTypes');

export const selectAllClientIdentities = createSelector(
  selectIdentityState,
  (state) => state.items
);

export const selectClientIdentitiesLoading = createSelector(
  selectIdentityState,
  (state) => state.loading
);
