import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './interest-rate-benchmarks.reducer';
import { adapter, State } from './interest-rate-benchmarks.state';

export const selectFeature = createFeatureSelector<State>(
  'interestRateBenchmarks'
);
export const selectInterestRateBenchmarksFeature = createFeatureSelector<State>(
  'interestRateBenchmarks'
);

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(
  selectInterestRateBenchmarksFeature
);

export const selectAllInterestRateBenchmarks = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectInterestRateBenchmarkEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectInterestRateBenchmarksLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectInterestRateBenchmarksError = createSelector(
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
export const selectInterestRateBenchmarksTotalCount = createSelector(
  selectInterestRateBenchmarksFeature,
  (state) => state
);
