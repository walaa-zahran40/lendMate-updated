import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './insured-by.reducer';
import { adapter, State } from './insured-by.state';

export const selectFeature = createFeatureSelector<State>('insuredBy');
export const selectInsuredByFeature = createFeatureSelector<State>('insuredBy');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectInsuredByFeature);

export const selectAllInsuredBy = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectInsuredByEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectInsuredByLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectInsuredByError = createSelector(
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
export const selectInsuredByTotalCount = createSelector(
  selectInsuredByFeature,
  (state) => state
);
