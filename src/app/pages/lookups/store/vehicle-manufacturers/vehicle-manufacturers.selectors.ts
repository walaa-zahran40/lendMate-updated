import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './vehicle-manufacturers.reducer';
import { adapter, State } from './vehicle-manufacturers.state';

export const selectFeature = createFeatureSelector<State>(
  'vehicleManufacturers'
);
export const selectVehicleManufacturersFeature = createFeatureSelector<State>(
  'vehicleManufacturers'
);

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectVehicleManufacturersFeature);

export const selectAllVehicleManufacturers = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectVehicleManufacturerEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectVehicleManufacturersLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectVehicleManufacturersError = createSelector(
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
export const selectVehicleManufacturersTotalCount = createSelector(
  selectVehicleManufacturersFeature,
  (state) => state
);
// History management selectors
export const selectVehicleManufacturerState = createFeatureSelector<State>(
  'vehicleManufacturers'
);

export const selectHistory = createSelector(
  selectVehicleManufacturerState,
  (state) => state.history
);

export const selectHistoryLoaded = createSelector(
  selectVehicleManufacturerState,
  (state) => state.historyLoaded
);

export const selectHistoryError = createSelector(
  selectVehicleManufacturerState,
  (state) => state.historyError
);
