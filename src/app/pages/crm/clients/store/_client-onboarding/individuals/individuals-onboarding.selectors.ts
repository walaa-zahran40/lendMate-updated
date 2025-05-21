import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './individuals-onboarding.reducer';
import { adapter, State } from './individuals-onboarding.state';

export const selectFeature = createFeatureSelector<State>(
  'individualOnboardings'
);
export const selectIndividualOnboardingsFeature = createFeatureSelector<State>(
  'individualOnboardings'
);

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectIndividualOnboardingsFeature);

export const selectAllIndividualOnboardings = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectIndividualOnboardingEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectIndividualOnboardingsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectIndividualOnboardingsError = createSelector(
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
export const selectIndividualOnboardingsTotalCount = createSelector(
  selectIndividualOnboardingsFeature,
  (state) => state
);
