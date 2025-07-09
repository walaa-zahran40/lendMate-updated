import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './mandate-additional-terms.reducer';
import { adapter, State } from './mandate-additional-terms.state';

export const selectFeature = createFeatureSelector<State>(
  'mandateAdditionalTerms'
);
export const selectMandateAdditionalTermsFeature = createFeatureSelector<State>(
  'mandateAdditionalTerms'
);

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectMandateAdditionalTermsFeature);

export const selectAllMandateAdditionalTerms = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectMandateAdditionalTermEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectMandateAdditionalTermsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectMandateAdditionalTermsError = createSelector(
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
export const selectMandateAdditionalTermsTotalCount = createSelector(
  selectMandateAdditionalTermsFeature,
  (state) => state
);
