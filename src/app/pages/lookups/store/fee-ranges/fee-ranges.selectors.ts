import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './fee-ranges.reducer';
import { adapter, State } from './fee-ranges.state';

export const selectFeature = createFeatureSelector<State>('feeRanges');
export const selectFeeRangesFeature = createFeatureSelector<State>('feeRanges');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectFeeRangesFeature);

export const selectAllFeeRanges = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectFeeRangeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectFeeRangesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectFeeRangesError = createSelector(
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
export const selectFeeRangesTotalCount = createSelector(
  selectFeeRangesFeature,
  (state) => state
);
// History management selectors
export const selectFeeRangeHistoryState =
  createFeatureSelector<State>('feeRanges');

export const selectFeeRangeHistory = createSelector(
  selectFeeRangeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectFeeRangeHistoryState,
  (state) => state.historyLoaded
);
