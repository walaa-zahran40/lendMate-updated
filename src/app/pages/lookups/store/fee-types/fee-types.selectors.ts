import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './fee-types.reducer';
import { adapter, State } from './fee-types.state';

export const selectFeature = createFeatureSelector<State>('feeTypes');
export const selectFeeTypesFeature = createFeatureSelector<State>('feeTypes');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectFeeTypesFeature);

export const selectAllFeeTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectFeeTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectFeeTypesError = createSelector(
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
export const selectFeeTypesTotalCount = createSelector(
  selectFeeTypesFeature,
  (state) => state
);
// History management selectors
export const selectFeeTypeHistoryState =
  createFeatureSelector<State>('feeTypeHistory');

export const selectFeeTypeHistory = createSelector(
  selectFeeTypeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectFeeTypeHistoryState,
  (state) => state.historyLoaded
);
