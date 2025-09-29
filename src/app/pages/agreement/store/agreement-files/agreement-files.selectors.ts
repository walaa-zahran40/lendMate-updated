import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSlice from './agreement-files.reducer';
import { adapter, State } from './agreement-files.state';

export const selectFeature = createFeatureSelector<State>('agreementFiles');
export const selectAgreementFilesFeature =
  createFeatureSelector<State>('agreementFiles');

// these come from your EntityAdapter
const { selectEntities } = adapter.getSelectors(selectAgreementFilesFeature);

export const selectAllAgreementFiles = createSelector(
  selectFeature,
  fromSlice.selectAll
);
export const selectAgreementFileEntities = createSelector(
  selectFeature,
  fromSlice.selectEntities
);
export const selectAgreementFilesLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectAgreementFilesError = createSelector(
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
export const selectAgreementFilesTotalCount = createSelector(
  selectAgreementFilesFeature,
  (state) => state
);
// History management selectors
export const selectAgreementFileState =
  createFeatureSelector<State>('agreementFiles');

export const selectHistory = createSelector(
  selectAgreementFileState,
  (state) => state.history
);

export const selectHistoryLoaded = createSelector(
  selectAgreementFileState,
  (state) => state.historyLoaded
);

export const selectHistoryError = createSelector(
  selectAgreementFileState,
  (state) => state.historyError
);
