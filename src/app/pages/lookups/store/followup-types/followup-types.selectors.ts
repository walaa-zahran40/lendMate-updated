import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './followup-types.reducer';
import { adapter, State } from './followup-types.state';

export const selectFeature = createFeatureSelector<State>('followupTypes');
export const selectFollowupTypesFeature =
  createFeatureSelector<State>('followupTypes');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectFollowupTypesFeature);

export const selectAllFollowupTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectFollowupTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectFollowupTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectFollowupTypesError = createSelector(
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
export const selectFollowupTypesTotalCount = createSelector(
  selectFollowupTypesFeature,
  (state) => state
);
// History management selectors
export const selectFollowUpTypeHistoryState =
  createFeatureSelector<State>('followupTypes');

export const selectFollowUpTypeHistory = createSelector(
  selectFollowUpTypeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectFollowUpTypeHistoryState,
  (state) => state.historyLoaded
);
