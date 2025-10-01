import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AgreementFilesState } from './agreement-files.state';

export const selectAgreementFilesState =
  createFeatureSelector<AgreementFilesState>('agreementFiles');
export const selectAgreementFiles = createSelector(
  selectAgreementFilesState,
  (state) => state.items
);
export const selectAgreementFilesTotal = createSelector(
  selectAgreementFilesState,
  (state) => state.totalCount
);
export const selectAgreementFilesHistory = createSelector(
  selectAgreementFilesState,
  (state) => state.history
);
export const selectCurrentAgreementFile = createSelector(
  selectAgreementFilesState,
  (state) => state.current
);
export const selectAgreementFilesLoading = createSelector(
  selectAgreementFilesState,
  (state) => state.loading
);
export const selectAgreementFilesError = createSelector(
  selectAgreementFilesState,
  (state) => state.error
);
