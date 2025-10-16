import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './teams.reducer';
import { adapter, State } from './teams.state';

export const selectFeature = createFeatureSelector<State>('teams');
export const selectTeamsFeature = createFeatureSelector<State>('teams');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectTeamsFeature);

export const selectAllTeams = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectTeamsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectTeamsError = createSelector(
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
export const selectTeamsTotalCount = createSelector(
  selectTeamsFeature,
  (state) => state
);
