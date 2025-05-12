import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './roles.reducer';
import { adapter, State } from './roles.state';

export const selectFeature = createFeatureSelector<State>('roles');
export const selectRolesFeature = createFeatureSelector<State>('roles');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectRolesFeature);

export const selectAllRoles = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAddressTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectRolesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectRolesError = createSelector(
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
export const selectRolesTotalCount = createSelector(
  selectRolesFeature,
  (state) => state
);
