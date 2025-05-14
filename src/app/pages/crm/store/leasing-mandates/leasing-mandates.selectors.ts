import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './leasing-mandates.reducer';
import { adapter, State } from './leasing-mandates.state';

export const selectFeature = createFeatureSelector<State>('leasingMandates');
export const selectLeasingMandatesFeature = createFeatureSelector<State>('leasingMandates');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectLeasingMandatesFeature);

export const selectAllLeasingMandates = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectLeasingMandatesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectLeasingMandatesError = createSelector(
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
export const selectLeasingMandatesTotalCount = createSelector(
  selectLeasingMandatesFeature,
  (state) => state
);
