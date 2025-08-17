import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './purchasing-orders.reducer';
import { adapter, State } from './purchasing-orders.state';

export const selectFeature = createFeatureSelector<State>('purchasingOrders');
export const selectPurchasingOrdersFeature =
  createFeatureSelector<State>('purchasingOrders');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectPurchasingOrdersFeature);

export const selectAllPurchasingOrders = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectPurchasingOrderEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectPurchasingOrdersLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectPurchasingOrdersError = createSelector(
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
export const selectPurchasingOrdersTotalCount = createSelector(
  selectPurchasingOrdersFeature,
  (state) => state
);
// History management selectors
export const selectPurchasingOrderState =
  createFeatureSelector<State>('purchasingOrders');

export const selectHistory = createSelector(
  selectPurchasingOrderState,
  (state) => state.history
);

export const selectHistoryLoaded = createSelector(
  selectPurchasingOrderState,
  (state) => state.historyLoaded
);

export const selectHistoryError = createSelector(
  selectPurchasingOrderState,
  (state) => state.historyError
);
