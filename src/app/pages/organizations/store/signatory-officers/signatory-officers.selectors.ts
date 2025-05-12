import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './signatory-officers.reducer';
import { adapter, State } from './signatory-officers.state';

export const selectFeature = createFeatureSelector<State>('signatoryOfficers');
export const selectSignatoryOfficersFeature = createFeatureSelector<State>('signatoryOfficers');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectSignatoryOfficersFeature);

export const selectAllSignatoryOfficers = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAreaEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectSignatoryOfficersLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectSignatoryOfficersError = createSelector(
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
export const selectSignatoryOfficersTotalCount = createSelector(
  selectSignatoryOfficersFeature,
  (state) => state
);
