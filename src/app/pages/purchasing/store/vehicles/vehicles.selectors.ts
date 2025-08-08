import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './vehicles.reducer';
import { adapter, State } from './vehicles.state';

export const selectFeature = createFeatureSelector<State>('vehicles');
export const selectVehiclesFeature = createFeatureSelector<State>('vehicles');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectVehiclesFeature);

export const selectAllVehicles = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectVehicleEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectVehiclesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectVehiclesError = createSelector(
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
export const selectVehiclesTotalCount = createSelector(
  selectVehiclesFeature,
  (state) => state
);
// History management selectors
export const selectVehicleState = createFeatureSelector<State>('vehicles');

export const selectHistory = createSelector(
  selectVehicleState,
  (state) => state.history
);

export const selectHistoryLoaded = createSelector(
  selectVehicleState,
  (state) => state.historyLoaded
);

export const selectHistoryError = createSelector(
  selectVehicleState,
  (state) => state.historyError
);
