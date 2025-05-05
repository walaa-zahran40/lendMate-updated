import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './areas.reducer';
import { adapter, State } from './areas.state';

export const selectFeature = createFeatureSelector<State>('areas');
export const selectAreasFeature = createFeatureSelector<State>('areas');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectAreasFeature);

export const selectAllAreas = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectAreasLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectAreasError = createSelector(
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
export const selectAreasTotalCount = createSelector(
  selectAreasFeature,
  (state) => state
);
