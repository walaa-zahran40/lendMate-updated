import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './vehicles.reducer';
import { adapter, State } from './vehicles.state';

export const selectFeature = createFeatureSelector<State>('assets');
export const selectAssetsFeature = createFeatureSelector<State>('assets');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectAssetsFeature);

export const selectAllAssets = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAssetEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectAssetsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectAssetsError = createSelector(
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
export const selectAssetsTotalCount = createSelector(
  selectAssetsFeature,
  (state) => state
);
// History management selectors
export const selectAssetState = createFeatureSelector<State>('assets');

export const selectHistory = createSelector(
  selectAssetState,
  (state) => state.history
);

export const selectHistoryLoaded = createSelector(
  selectAssetState,
  (state) => state.historyLoaded
);

export const selectHistoryError = createSelector(
  selectAssetState,
  (state) => state.historyError
);
