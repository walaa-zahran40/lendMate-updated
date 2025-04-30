import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './fee-calculation-types.reducer';
import { adapter, State } from './fee-calculation-types.state';

export const selectFeature = createFeatureSelector<State>(
  'feeCalculationTypes'
);
export const selectFeeCalculationTypesFeature = createFeatureSelector<State>(
  'feeCalculationTypes'
);

// these come from your EntityAdapter
const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(selectFeeCalculationTypesFeature);

export const selectAllFeeCalculationTypes = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectFeeCalculationTypeEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectFeeCalculationTypesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectFeeCalculationTypesError = createSelector(
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
export const selectFeeCalculationTypesTotalCount = createSelector(
  selectFeeCalculationTypesFeature,
  (state) => state
);
