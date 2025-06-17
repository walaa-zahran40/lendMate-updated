import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './business-lines.reducer';
import { adapter, State } from './business-lines.state';

export const selectFeature = createFeatureSelector<State>('businessLines');
export const selectBusinessLinesFeature =
  createFeatureSelector<State>('businessLines');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectBusinessLinesFeature);

export const selectAllBusinessLines = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectBusinessLinesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectBusinessLinesError = createSelector(
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
export const selectBusinessLinesTotalCount = createSelector(
  selectBusinessLinesFeature,
  (state) => state
);
// History management selectors
export const selectBusinessLineState =
  createFeatureSelector<State>('businessLines');

export const selectBusinessLineHistory = createSelector(
  selectBusinessLineState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectBusinessLineState,
  (state) => state.historyLoaded
);
