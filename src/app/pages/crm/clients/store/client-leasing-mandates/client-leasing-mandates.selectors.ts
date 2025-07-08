import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './client-leasing-mandates.reducer';
import { adapter, State } from './client-leasing-mandates.state';

export const selectFeature = createFeatureSelector<State>('mandatesClient');
export const selectMandatesFeature =
  createFeatureSelector<State>('mandatesClient');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectMandatesFeature);

export const selectAllMandates = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectMandateEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectMandatesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectMandatesError = createSelector(
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
export const selectMandatesTotalCount = createSelector(
  selectMandatesFeature,
  (state) => state
);
