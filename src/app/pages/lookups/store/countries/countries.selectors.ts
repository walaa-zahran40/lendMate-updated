import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './countries.reducer';
import { adapter, State } from './countries.state';

export const selectFeature = createFeatureSelector<State>('countries');
export const selectCountriesFeature = createFeatureSelector<State>('countries');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectCountriesFeature);

export const selectAllCountries = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectCountriesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectCountriesError = createSelector(
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
export const selectCountriesTotalCount = createSelector(
  selectCountriesFeature,
  (state) => state
);
// History management selectors
export const selectCountryHistoryState =
  createFeatureSelector<State>('countryHistory');

export const selectCountryHistory = createSelector(
  selectCountryHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectCountryHistoryState,
  (state) => state.historyLoaded
);
