import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './mandate-fees.reducer';
import { adapter, State } from './mandate-fees.state';

export const selectFeature = createFeatureSelector<State>(
  'mandateAdditionalTerms'
);
export const selectMandateFeesFeature = createFeatureSelector<State>(
  'mandateAdditionalTerms'
);

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectMandateFeesFeature);

export const selectAllMandateFees = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectMandateFeeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectMandateFeesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectMandateFeesError = createSelector(
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
export const selectMandateFeesTotalCount = createSelector(
  selectMandateFeesFeature,
  (state) => state
);
