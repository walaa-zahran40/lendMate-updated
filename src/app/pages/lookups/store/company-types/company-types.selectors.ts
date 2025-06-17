import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './company-types.reducer';
import { adapter, State } from './company-types.state';

export const selectFeature = createFeatureSelector<State>('companyTypes');
export const selectCompanyTypesFeature =
  createFeatureSelector<State>('companyTypes');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectCompanyTypesFeature);

export const selectAllCompanyTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectCompanyTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectCompanyTypesError = createSelector(
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
export const selectCompanyTypesTotalCount = createSelector(
  selectCompanyTypesFeature,
  (state) => state
);
// History management selectors
export const selectCompanyTypeHistoryState =
  createFeatureSelector<State>('companyTypeHistory');

export const selectCompanyTypeHistory = createSelector(
  selectCompanyTypeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectCompanyTypeHistoryState,
  (state) => state.historyLoaded
);
