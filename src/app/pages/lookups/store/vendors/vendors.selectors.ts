import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './vendors.reducer';
import { adapter, State } from './vendors.state';

export const selectFeature = createFeatureSelector<State>('vendors');
export const selectVendorsFeature = createFeatureSelector<State>('vendors');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectVendorsFeature);

export const selectAllVendors = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectVendorEntities = createSelector(
  selectFeature,
  (state) => state.entities
);
export const makeSelectVendorById = (id: number) =>
  createSelector(selectVendorEntities, (entities) => entities[id]);

export const selectVendorsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectVendorsError = createSelector(
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
export const selectVendorsTotalCount = createSelector(
  selectVendorsFeature,
  (state) => state
);
// History management selectors
export const selectVendorState = createFeatureSelector<State>('vendors');

export const selectVendorHistory = createSelector(
  selectVendorState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectVendorState,
  (state) => state.historyLoaded
);

export const selectHistoryError = createSelector(
  selectVendorState,
  (state) => state.historyError
);
