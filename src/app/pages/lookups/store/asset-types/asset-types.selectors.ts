import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './asset-types.reducer';
import { adapter, State } from './asset-types.state';

export const selectFeature = createFeatureSelector<State>('assetTypes');
export const selectAssetTypesFeature =
  createFeatureSelector<State>('assetTypes');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectAssetTypesFeature);

export const selectAllAssetTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectAssetTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectAssetTypesError = createSelector(
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
export const selectAssetTypesTotalCount = createSelector(
  selectAssetTypesFeature,
  (state) => state
);
// History management selectors
export const selectAssetTypeState = createFeatureSelector<State>('assetTypes');

export const selectAssetTypeHistory = createSelector(
  selectAssetTypeState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectAssetTypeState,
  (state) => state.historyLoaded
);
