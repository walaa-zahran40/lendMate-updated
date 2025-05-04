import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './grace-period-units.reducer';
import { adapter, State } from './grace-period-units.state';

export const selectFeature = createFeatureSelector<State>('gracePeriodUnits');
export const selectGracePeriodUnitsFeature =
  createFeatureSelector<State>('gracePeriodUnits');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectGracePeriodUnitsFeature);

export const selectAllGracePeriodUnits = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectGracePeriodUnitEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectGracePeriodUnitsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectGracePeriodUnitsError = createSelector(
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
export const selectGracePeriodUnitsTotalCount = createSelector(
  selectGracePeriodUnitsFeature,
  (state) => state
);
