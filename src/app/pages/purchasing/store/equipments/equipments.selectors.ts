import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './equipments.reducer';
import { adapter, State } from './equipments.state';

export const selectFeature = createFeatureSelector<State>('equipments');
export const selectEquipmentsFeature =
  createFeatureSelector<State>('equipments');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectEquipmentsFeature);

export const selectAllEquipments = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectEquipmentEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectEquipmentsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectEquipmentsError = createSelector(
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
export const selectEquipmentsTotalCount = createSelector(
  selectEquipmentsFeature,
  (state) => state
);
// History management selectors
export const selectEquipmentState = createFeatureSelector<State>('equipments');

export const selectHistory = createSelector(
  selectEquipmentState,
  (state) => state.history
);

export const selectHistoryLoaded = createSelector(
  selectEquipmentState,
  (state) => state.historyLoaded
);

export const selectHistoryError = createSelector(
  selectEquipmentState,
  (state) => state.historyError
);
