// src/app/features/financial-forms/financial-forms.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, State } from './financial-forms.state';

export const selectFeature = createFeatureSelector<State>('financialForms');

// EntityAdapter selectors
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectFeature);

export const selectAllFinancialForms = createSelector(selectFeature, (state) =>
  selectAll(state)
);

export const selectFinancialFormsEntities = createSelector(
  selectFeature,
  (state) => selectEntities(state)
);

export const selectFinancialFormsLoading = createSelector(
  selectFeature,
  (state) => state.loading
);

export const selectFinancialFormsError = createSelector(
  selectFeature,
  (state) => state.error
);

export const selectLoadedId = createSelector(
  selectFeature,
  (state) => state.loadedId
);

export const selectCurrentFinancialForm = createSelector(
  selectFinancialFormsEntities,
  selectLoadedId,
  (entities, id) => (id != null ? entities[id] : null)
);

export const selectFinancialFormsTotalCount = createSelector(
  selectFeature,
  (state) => selectTotal(state)
);
// ─── “Grab the map-of-calculatedRows, then pick by mandateId” ────────────────
export const selectCalculatedRowsByMandateMap = createSelector(
  selectFeature,
  (state) => state.calculatedRowsByMandate
);
export const selectCalculatedRowsForId = (mandateId: number) =>
  createSelector(
    selectFeature,
    (state) => state.calculatedRowsByMandate[mandateId] || []
  );
