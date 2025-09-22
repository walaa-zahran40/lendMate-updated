import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './mandate-officers.reducer';
import { adapter, State } from './mandate-officers.state';

export const selectFeature = createFeatureSelector<State>('mandateOfficers');
export const selectMandateOfficersFeature =
  createFeatureSelector<State>('mandateOfficers');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectMandateOfficersFeature);

export const selectAllMandateOfficers = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectMandateOfficerEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectMandateOfficersLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectMandateOfficersError = createSelector(
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
export const selectMandateOfficersTotalCount = createSelector(
  selectMandateOfficersFeature,
  (state) => state
);
