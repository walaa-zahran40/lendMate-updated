import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './payment-methods.reducer';
import { adapter, State } from './payment-methods.state';

export const selectFeature = createFeatureSelector<State>('paymentMethods');
export const selectPaymentMethodsFeature =
  createFeatureSelector<State>('paymentMethods');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectPaymentMethodsFeature);

export const selectAllPaymentMethods = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectPaymentMethodEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectPaymentMethodsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectPaymentMethodsError = createSelector(
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
export const selectPaymentMethodsTotalCount = createSelector(
  selectPaymentMethodsFeature,
  (state) => state
);
// History management selectors
export const selectPaymentMethodHistoryState =
  createFeatureSelector<State>('paymentMethods');

export const selectPaymentMethodHistory = createSelector(
  selectPaymentMethodHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectPaymentMethodHistoryState,
  (state) => state.historyLoaded
);
