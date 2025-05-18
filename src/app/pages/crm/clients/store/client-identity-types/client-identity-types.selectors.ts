import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './client-identity-types.reducer';
import { adapter, State } from './client-identity-types.state';

export const selectFeature = createFeatureSelector<State>(
  'clientIdentityTypes'
);
export const selectClientIdentityTypesFeature = createFeatureSelector<State>(
  'clientIdentityTypes'
);

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectClientIdentityTypesFeature);

export const selectAllClientIdentityTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectClientIdentityTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectClientIdentityTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectClientIdentityTypesError = createSelector(
  selectFeature,
  (state) => state.error
);

export const selectLoadedId = createSelector(
  selectFeature,
  (state) => state.loadedId
);

export const selectCurrent = createSelector(
  selectEntities,
  selectLoadedId,
  (entities, id) => (id != null ? entities[id] : null)
);
export const selectClientIdentityTypesTotalCount = createSelector(
  selectClientIdentityTypesFeature,
  (state) => state
);
