import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './meeting-types.reducer';
import { adapter, State } from './meeting-types.state';

export const selectFeature = createFeatureSelector<State>('meetingTypes');
export const selectMeetingTypesFeature =
  createFeatureSelector<State>('meetingTypes');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectMeetingTypesFeature);

export const selectAllMeetingTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectMeetingTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectMeetingTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectMeetingTypesError = createSelector(
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
export const selectMeetingTypesTotalCount = createSelector(
  selectMeetingTypesFeature,
  (state) => state
);
// History management selectors
export const selectMeetingTypeHistoryState =
  createFeatureSelector<State>('meetingTypeHistory');

export const selectMeetingTypeHistory = createSelector(
  selectMeetingTypeHistoryState,
  (state) => state.history
);
export const selectHistoryLoaded = createSelector(
  selectMeetingTypeHistoryState,
  (state) => state.historyLoaded
);
