import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './authority-offices.reducer';
import { adapter, State } from './authority-offices.state';

export const selectFeature = createFeatureSelector<State>('authorityOffices');
export const selectAuthorityOfficesFeature =
  createFeatureSelector<State>('authorityOffices');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectAuthorityOfficesFeature);

export const selectAllAuthorityOffices = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectAuthorityOfficesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectAuthorityOfficesError = createSelector(
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
export const selectAuthorityOfficesTotalCount = createSelector(
  selectAuthorityOfficesFeature,
  (state) => state
);
// History management selectors
export const selectAuthorityOfficeState =
  createFeatureSelector<State>('authorityOffices');

export const selectAuthorityOfficeHistory = createSelector(
  selectAuthorityOfficeState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectAuthorityOfficeState,
  (state) => state.historyLoaded
);
