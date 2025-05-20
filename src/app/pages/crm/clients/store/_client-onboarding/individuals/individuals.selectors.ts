import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './individuals.reducer';
import { adapter, State } from './individuals.state';

export const selectFeature = createFeatureSelector<State>('individuals');
export const selectIndividualsFeature =
  createFeatureSelector<State>('individuals');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectIndividualsFeature);

export const selectAllIndividuals = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectIndividualEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectIndividualsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectIndividualsError = createSelector(
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
export const selectIndividualsTotalCount = createSelector(
  selectIndividualsFeature,
  (state) => state
);
