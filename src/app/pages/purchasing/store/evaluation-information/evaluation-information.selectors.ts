import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './evaluation-information.reducer';
import { adapter, State } from './evaluation-information.state';

export const selectFeature = createFeatureSelector<State>(
  'evaluationInformation'
);
export const selectEvaluationInformationFeature = createFeatureSelector<State>(
  'evaluationInformation'
);

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(
  selectEvaluationInformationFeature
);

export const selectAllEvaluationInformation = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAssetEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectEvaluationInformationLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectEvaluationInformationError = createSelector(
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
export const selectEvaluationInformationTotalCount = createSelector(
  selectEvaluationInformationFeature,
  (state) => state
);
// History management selectors
export const selectEvaluationInformationtate = createFeatureSelector<State>(
  'evaluationInformation'
);

export const selectHistory = createSelector(
  selectEvaluationInformationtate,
  (state) => state.history
);

export const selectHistoryLoaded = createSelector(
  selectEvaluationInformationtate,
  (state) => state.historyLoaded
);

export const selectHistoryError = createSelector(
  selectEvaluationInformationtate,
  (state) => state.historyError
);
