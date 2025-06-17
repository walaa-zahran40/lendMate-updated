import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './currencies.reducer';
import { adapter, State } from './currencies.state';

export const selectFeature = createFeatureSelector<State>('currencies');
export const selectCurrenciesFeature =
  createFeatureSelector<State>('currencies');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectCurrenciesFeature);

export const selectAllCurrencies = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectCurrenciesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectCurrenciesError = createSelector(
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
export const selectCurrenciesTotalCount = createSelector(
  selectCurrenciesFeature,
  (state) => state
);
// History management selectors
export const selectCurrencyHistoryState =
  createFeatureSelector<State>('currencies');

export const selectCurrencyHistory = createSelector(
  selectCurrencyHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectCurrencyHistoryState,
  (state) => state.historyLoaded
);
