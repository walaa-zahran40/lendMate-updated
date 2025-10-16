import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './address-types.reducer';
import { adapter, State } from './address-types.state';

export const selectFeature = createFeatureSelector<State>('addressTypes');
export const selectAddressTypesFeature =
  createFeatureSelector<State>('addressTypes');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectAddressTypesFeature);

export const selectAllAddressTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAddressTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectAddressTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectAddressTypesError = createSelector(
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
export const selectAddressTypesTotalCount = createSelector(
  selectAddressTypesFeature,
  (state) => state
);
// History management selectors
export const selectAddressTypeState =
  createFeatureSelector<State>('addressTypes');

export const selectHistory = createSelector(
  selectAddressTypeState,
  (state) => state.history
);

export const selectHistoryLoaded = createSelector(
  selectAddressTypeState,
  (state) => state.historyLoaded
);

export const selectHistoryError = createSelector(
  selectAddressTypeState,
  (state) => state.historyError
);
