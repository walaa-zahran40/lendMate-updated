import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './mandate-status-actions.reducer';
import { adapter, State } from './mandate-status-actions.state';

export const selectFeature = createFeatureSelector<State>(
  'mandateStatusActions'
);
export const selectMandateStatusActionsFeature = createFeatureSelector<State>(
  'mandateStatusActions'
);

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(
  selectMandateStatusActionsFeature
);

export const selectAllMandateStatusActions = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectMandateStatusActionEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectMandateStatusActionsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectMandateStatusActionsError = createSelector(
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
export const selectMandateStatusActionsTotalCount = createSelector(
  selectMandateStatusActionsFeature,
  (state) => state
);
