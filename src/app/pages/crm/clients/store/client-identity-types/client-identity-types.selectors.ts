// client-identity-types.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  adapter,
  State,
  CLIENT_IDENTITY_TYPES_FEATURE_KEY,
} from './client-identity-types.reducer';

const selectFeature = createFeatureSelector<State>(
  CLIENT_IDENTITY_TYPES_FEATURE_KEY
);
const { selectAll } = adapter.getSelectors();

export const selectAllClientIdentityTypes = createSelector(
  selectFeature,
  selectAll
);
export const selectClientIdentityTypesTotalCount = createSelector(
  selectFeature,
  (state) => state.totalCount
);
export const selectClientIdentityTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectClientIdentityTypesError = createSelector(
  selectFeature,
  (state) => state.error
);
