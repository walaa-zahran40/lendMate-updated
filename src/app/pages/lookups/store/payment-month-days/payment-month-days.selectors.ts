import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './payment-month-days.reducer';
import { adapter, State } from './payment-month-days.state';

export const selectFeature = createFeatureSelector<State>('paymentMonthDays');
export const selectPaymentMonthDaysFeature =
  createFeatureSelector<State>('paymentMonthDays');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectPaymentMonthDaysFeature);

export const selectAllPaymentMonthDays = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectPaymentMonthDayEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectPaymentMonthDaysLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectPaymentMonthDaysError = createSelector(
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
export const selectPaymentMonthDaysTotalCount = createSelector(
  selectPaymentMonthDaysFeature,
  (state) => state
);
// History management selectors
export const selectPaymentMonthDayHistoryState =
  createFeatureSelector<State>('paymentMonthDays');

export const selectPaymentMonthDayHistory = createSelector(
  selectPaymentMonthDayHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectPaymentMonthDayHistoryState,
  (state) => state.historyLoaded
);
