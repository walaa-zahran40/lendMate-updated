import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AgreementOfficersState } from './agreement-officers.state';

export const selectAgreementOfficersState =
  createFeatureSelector<AgreementOfficersState>('agreementOfficers');
export const selectAgreementOfficers = createSelector(
  selectAgreementOfficersState,
  (state) => state.items
);
export const selectAgreementOfficersTotal = createSelector(
  selectAgreementOfficersState,
  (state) => state.totalCount
);
export const selectAgreementOfficersHistory = createSelector(
  selectAgreementOfficersState,
  (state) => state.history
);
export const selectCurrentAgreementOfficer = createSelector(
  selectAgreementOfficersState,
  (state) => state.current
);
export const selectAgreementOfficersLoading = createSelector(
  selectAgreementOfficersState,
  (state) => state.loading
);
export const selectAgreementOfficersError = createSelector(
  selectAgreementOfficersState,
  (state) => state.error
);
