import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './client-clones.reducer';
import { adapter, State } from './client-clones.state';

export const selectFeature = createFeatureSelector<State>('clientsClones');
export const selectClonesFeature =
  createFeatureSelector<State>('clientsClones');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectClonesFeature);

export const selectAllClones = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectCloneEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectClonesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectClonesError = createSelector(
  selectFeature,
  (state) => state.error
);

export const selectLoadedId = createSelector(
  selectFeature,
  (state) => state.loadedId
);
export const selectLoadedClientId = createSelector(
  selectFeature,
  (state) => state.loadedId
);
export const selectCurrent = createSelector(
  selectEntities,
  selectLoadedId,
  (entities, id) => (id != null ? entities[id] : null)
);
export const selectClonesTotalCount = createSelector(
  selectClonesFeature,
  (state) => state
);
