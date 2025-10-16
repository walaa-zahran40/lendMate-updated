import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './properties.reducer';
import { adapter, State } from './properties.state';

export const selectFeature = createFeatureSelector<State>('properties');
export const selectPropertiesFeature =
  createFeatureSelector<State>('properties');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectPropertiesFeature);

export const selectAllProperties = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectPropertyEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectPropertiesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectPropertiesError = createSelector(
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
export const selectPropertiesTotalCount = createSelector(
  selectPropertiesFeature,
  (state) => state
);
// History management selectors
export const selectPropertiestate = createFeatureSelector<State>('properties');

export const selectHistory = createSelector(
  selectPropertiestate,
  (state) => state.history
);

export const selectHistoryLoaded = createSelector(
  selectPropertiestate,
  (state) => state.historyLoaded
);

export const selectHistoryError = createSelector(
  selectPropertiestate,
  (state) => state.historyError
);
export const selectByAssetId = (assetId: number) =>
  createSelector(
    selectAll,
    (list) =>
      list.find(
        (e) => e.id === assetId /* or e.assetId if your model has it */
      ) || null
  );
