import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './calls.reducer';
import { adapter, State } from './calls.state';

export const selectFeature = createFeatureSelector<State>('calls');
export const selectCallsFeature =
  createFeatureSelector<State>('calls');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectCallsFeature);

export const selectAllCalls = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectCallEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectCallsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectCallsError = createSelector(
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
export const selectCallsTotalCount = createSelector(
  selectCallsFeature,
  (state) => state
);
