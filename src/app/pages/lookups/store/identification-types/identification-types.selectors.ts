import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './identification-types.reducer';
import { adapter, State } from './identification-types.state';

export const selectFeature = createFeatureSelector<State>(
  'identificationTypes'
);
export const selectIdentificationTypesFeature = createFeatureSelector<State>(
  'identificationTypes'
);

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectIdentificationTypesFeature);

export const selectAllIdentificationTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectIdentificationTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectIdentificationTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectIdentificationTypesError = createSelector(
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
export const selectIdentificationTypesTotalCount = createSelector(
  selectIdentificationTypesFeature,
  (state) => state
);
