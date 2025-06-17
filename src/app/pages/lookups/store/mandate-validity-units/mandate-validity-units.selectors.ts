import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './mandate-validity-units.reducer';
import { adapter, State } from './mandate-validity-units.state';

export const selectFeature = createFeatureSelector<State>(
  'mandateValidityUnits'
);
export const selectMandateValidityUnitsFeature = createFeatureSelector<State>(
  'mandateValidityUnits'
);

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectMandateValidityUnitsFeature);

export const selectAllMandateValidityUnits = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectMandateValidityUnitEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectMandateValidityUnitsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectMandateValidityUnitsError = createSelector(
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
export const selectMandateValidityUnitsTotalCount = createSelector(
  selectMandateValidityUnitsFeature,
  (state) => state
);
// History management selectors
export const selectMandateValidityUnitHistoryState =
  createFeatureSelector<State>('mandateValidityUnitHistory');

export const selectMandateValidityUnitHistory = createSelector(
  selectMandateValidityUnitHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectMandateValidityUnitHistoryState,
  (state) => state.historyLoaded
);
