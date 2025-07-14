import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MandateFeesState } from './mandate-fees.state';

export const selectMandateFeesState =
  createFeatureSelector<MandateFeesState>('mandateFees');
export const selectMandateFees = createSelector(
  selectMandateFeesState,
  (state) => state.items
);
export const selectMandateFeesTotal = createSelector(
  selectMandateFeesState,
  (state) => state.totalCount
);
export const selectMandateFeesHistory = createSelector(
  selectMandateFeesState,
  (state) => state.history
);
export const selectCurrentMandateFee = createSelector(
  selectMandateFeesState,
  (state) => state.current
);
export const selectMandateFeesLoading = createSelector(
  selectMandateFeesState,
  (state) => state.loading
);
export const selectMandateFeesError = createSelector(
  selectMandateFeesState,
  (state) => state.error
);
export const selectCalcConfig = createSelector(
  selectMandateFeesState,
  (state) => state.calcConfig
);
export const selectCalcConfigLoading = createSelector(
  selectMandateFeesState,
  (state) => state.calcConfigLoading
);
export const selectCalcConfigError = createSelector(
  selectMandateFeesState,
  (state) => state.calcConfigError
);
