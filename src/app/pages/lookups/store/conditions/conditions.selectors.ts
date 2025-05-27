import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './conditions.reducer';
import { adapter, State } from './conditions.state';

export const selectFeature = createFeatureSelector<State>('conditions');
export const selectConditionsFeature =
  createFeatureSelector<State>('conditions');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectConditionsFeature);

export const selectAllConditions = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectConditionEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectConditionsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectConditionsError = createSelector(
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
export const selectConditionsTotalCount = createSelector(
  selectConditionsFeature,
  (state) => state
);
