import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './payment-types.reducer';
import { adapter, State } from './payment-types.state';

export const selectFeature = createFeatureSelector<State>('paymentTypes');
export const selectPaymentTypesFeature =
  createFeatureSelector<State>('paymentTypes');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectPaymentTypesFeature);

export const selectAllPaymentTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectPaymentTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectPaymentTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectPaymentTypesError = createSelector(
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
export const selectPaymentTypesTotalCount = createSelector(
  selectPaymentTypesFeature,
  (state) => state
);
// History management selectors
export const selectPaymentTypeHistoryState =
  createFeatureSelector<State>('paymentTypeHistory');

export const selectPaymentTypeHistory = createSelector(
  selectPaymentTypeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectPaymentTypeHistoryState,
  (state) => state.historyLoaded
);
