import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './doc-types.reducer';
import { adapter, State } from './doc-types.state';

export const selectFeature = createFeatureSelector<State>('docTypes');
export const selectDocTypesFeature = createFeatureSelector<State>('docTypes');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectDocTypesFeature);

export const selectAllDocTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectDocTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectDocTypesError = createSelector(
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
export const selectDocTypesTotalCount = createSelector(
  selectDocTypesFeature,
  (state) => state
);
// History management selectors
export const selectDocTypeHistoryState =
  createFeatureSelector<State>('docTypeHistory');

export const selectDocTypeHistory = createSelector(
  selectDocTypeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectDocTypeHistoryState,
  (state) => state.historyLoaded
);
