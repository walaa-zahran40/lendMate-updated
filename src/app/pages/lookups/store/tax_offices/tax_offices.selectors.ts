import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './tax_offices.reducer';
import { adapter, State } from './tax_offices.state';

export const selectFeature = createFeatureSelector<State>('taxOffices');
export const selectTaxOfficesFeature =
  createFeatureSelector<State>('taxOffices');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectTaxOfficesFeature);

export const selectAllTaxOffices = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectTaxOfficeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectTaxOfficesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectTaxOfficesError = createSelector(
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
export const selectTaxOfficesTotalCount = createSelector(
  selectTaxOfficesFeature,
  (state) => state
);
// History management selectors
export const selectTaxOfficeHistoryState =
  createFeatureSelector<State>('taxOffices');

export const selectTaxOfficeHistory = createSelector(
  selectTaxOfficeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectTaxOfficeHistoryState,
  (state) => state.historyLoaded
);
