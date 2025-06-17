import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './sectors.reducer';
import { adapter, State } from './sectors.state';

export const selectFeature = createFeatureSelector<State>('sectors');
export const selectSectorsFeature = createFeatureSelector<State>('sectors');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectSectorsFeature);

export const selectAllSectors = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectSectorEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectSectorsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectSectorsError = createSelector(
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
export const selectSectorsTotalCount = createSelector(
  selectSectorsFeature,
  (state) => state
);
// History management selectors
export const selectSectorHistoryState = createFeatureSelector<State>('sectors');

export const selectSectorHistory = createSelector(
  selectSectorHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectSectorHistoryState,
  (state) => state.historyLoaded
);
