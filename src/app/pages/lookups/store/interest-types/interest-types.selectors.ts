import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './interest-types.reducer';
import { adapter, State } from './interest-types.state';

export const selectFeature = createFeatureSelector<State>('interestTypes');
export const selectInterestTypesFeature =
  createFeatureSelector<State>('interestTypes');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectInterestTypesFeature);

export const selectAllInterestTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectInterestTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectInterestTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectInterestTypesError = createSelector(
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
export const selectInterestTypesTotalCount = createSelector(
  selectInterestTypesFeature,
  (state) => state
);
// History management selectors
export const selectInterestTypeHistoryState = createFeatureSelector<State>(
  'interestTypeHistory'
);

export const selectInterestTypeHistory = createSelector(
  selectInterestTypeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectInterestTypeHistoryState,
  (state) => state.historyLoaded
);
