import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './meetings.reducer';
import { adapter, State } from './meetings.state';

export const selectFeature = createFeatureSelector<State>('meetings');
export const selectMeetingsFeature =
  createFeatureSelector<State>('meetings');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectMeetingsFeature);

export const selectAllMeetings = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectMeetingEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectMeetingsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectMeetingsError = createSelector(
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
export const selectMeetingsTotalCount = createSelector(
  selectMeetingsFeature,
  (state) => state
);
