import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './purchasing-order-files.reducer';
import { adapter, State } from './purchasing-orders.state';

export const selectFeature = createFeatureSelector<State>(
  'purchasingOrderFiles'
);
export const selectPurchasingOrderFilesFeature = createFeatureSelector<State>(
  'purchasingOrderFiles'
);

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(
  selectPurchasingOrderFilesFeature
);

export const selectAllPurchasingOrderFiles = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectPurchasingOrderFileEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectPurchasingOrderFilesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectPurchasingOrderFilesError = createSelector(
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
export const selectPurchasingOrderFilesTotalCount = createSelector(
  selectPurchasingOrderFilesFeature,
  (state) => state
);
// History management selectors
export const selectPurchasingOrderFileState = createFeatureSelector<State>(
  'purchasingOrderFiles'
);

export const selectHistory = createSelector(
  selectPurchasingOrderFileState,
  (state) => state.history
);

export const selectHistoryLoaded = createSelector(
  selectPurchasingOrderFileState,
  (state) => state.historyLoaded
);

export const selectHistoryError = createSelector(
  selectPurchasingOrderFileState,
  (state) => state.historyError
);
