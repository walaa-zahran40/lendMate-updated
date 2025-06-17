import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './payment-periods.reducer';
import { adapter, State } from './payment-periods.state';

export const selectFeature = createFeatureSelector<State>('paymentPeriods');
export const selectPaymentPeriodsFeature =
  createFeatureSelector<State>('paymentPeriods');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectPaymentPeriodsFeature);

export const selectAllPaymentPeriods = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectPaymentPeriodEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectPaymentPeriodsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectPaymentPeriodsError = createSelector(
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
export const selectPaymentPeriodsTotalCount = createSelector(
  selectPaymentPeriodsFeature,
  (state) => state
);
// History management selectors
export const selectPaymentPeriodHistoryState = createFeatureSelector<State>(
  'paymentPeriodHistory'
);

export const selectPaymentPeriodHistory = createSelector(
  selectPaymentPeriodHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectPaymentPeriodHistoryState,
  (state) => state.historyLoaded
);
