import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './vehicle-models.reducer';
import { adapter, State } from './vehicle-models.state';

export const selectFeature = createFeatureSelector<State>('vehicleModels');
export const selectVehicleModelsFeature =
  createFeatureSelector<State>('vehicleModels');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectVehicleModelsFeature);

export const selectAllVehicleModels = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectVehicleModelEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectVehicleModelsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectVehicleModelsError = createSelector(
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
export const selectVehicleModelsTotalCount = createSelector(
  selectVehicleModelsFeature,
  (state) => state
);
// History management selectors
export const selectVehicleModelState =
  createFeatureSelector<State>('vehicleModels');

export const selectHistory = createSelector(
  selectVehicleModelState,
  (state) => state.history
);

export const selectHistoryLoaded = createSelector(
  selectVehicleModelState,
  (state) => state.historyLoaded
);

export const selectHistoryError = createSelector(
  selectVehicleModelState,
  (state) => state.historyError
);
