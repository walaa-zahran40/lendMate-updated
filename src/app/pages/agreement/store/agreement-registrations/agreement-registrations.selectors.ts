import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FEATURE_KEY,
  State,
  selectAll,
  selectEntities,
} from './agreement-registrations.reducer';

export const selectFeature = createFeatureSelector<State>(FEATURE_KEY);

export const selectAllRegistrations = createSelector(selectFeature, selectAll);
export const selectEntitiesMap = createSelector(selectFeature, selectEntities);

export const selectLoading = createSelector(selectFeature, (s) => s.loading);
export const selectError = createSelector(selectFeature, (s) => s.error);
export const selectSelectedId = createSelector(
  selectFeature,
  (s) => s.selectedId
);

export const selectSelected = createSelector(
  selectEntitiesMap,
  selectSelectedId,
  (entities, id) => (id ? entities[id] ?? null : null)
);

export const selectByLeasingAgreementId = (leasingAgreementId: number) =>
  createSelector(selectAllRegistrations, (items) =>
    items.filter((i) => i.leasingAgreementId === leasingAgreementId)
  );
