import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './clients-onboarding.reducer';
import { adapter, State } from './clients-onboarding.state';

export const selectFeature = createFeatureSelector<State>('clientsOnboarding');
export const selectClientsOnboardingFeature =
  createFeatureSelector<State>('clientsOnboarding');

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectClientsOnboardingFeature);

export const selectAllClientsOnboarding = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectClientOnboardingEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectClientsOnboardingLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectClientsOnboardingError = createSelector(
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
export const selectClientsOnboardingTotalCount = createSelector(
  selectClientsOnboardingFeature,
  (state) => state
);
export const selectWorkflowActionSuccess = createSelector(
  selectFeature,
  fromSlice.reducer
);
