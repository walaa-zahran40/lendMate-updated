import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './tml-officer-types.reducer';
import { adapter, State } from './tml-officer-types.state';

export const selectFeature = createFeatureSelector<State>('tmlOfficerTypes');
export const selectTmlOfficerTypesFeature =
  createFeatureSelector<State>('tmlOfficerTypes');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectTmlOfficerTypesFeature);

export const selectAllTmlOfficerTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectTmlOfficerTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectTmlOfficerTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectTmlOfficerTypesError = createSelector(
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
export const selectTmlOfficerTypesTotalCount = createSelector(
  selectTmlOfficerTypesFeature,
  (state) => state
);
// History management selectors
export const selectTmlOfficerTypeHistoryState =
  createFeatureSelector<State>('tmlOfficerTypes');

export const selectTmlOfficerTypeHistory = createSelector(
  selectTmlOfficerTypeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectTmlOfficerTypeHistoryState,
  (state) => state.historyLoaded
);
