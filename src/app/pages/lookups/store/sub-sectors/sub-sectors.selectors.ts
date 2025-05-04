import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './sub-sectors.reducer';
import { adapter, State } from './sub-sectors.state';

export const selectFeature = createFeatureSelector<State>('subSectors');
export const selectSubSectorsFeature =
  createFeatureSelector<State>('subSectors');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectSubSectorsFeature);

export const selectAllSubSectors = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectSubSectorEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectSubSectorsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectSubSectorsError = createSelector(
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
export const selectSubSectorsTotalCount = createSelector(
  selectSubSectorsFeature,
  (state) => state
);
