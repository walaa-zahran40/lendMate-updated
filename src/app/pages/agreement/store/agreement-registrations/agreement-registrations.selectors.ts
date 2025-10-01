import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AgreementRegistrationsState } from './agreement-registrations.state';

export const selectAgreementRegistrationsState =
  createFeatureSelector<AgreementRegistrationsState>('agreementRegistrations');
export const selectAgreementRegistrations = createSelector(
  selectAgreementRegistrationsState,
  (state) => state.items
);
export const selectAgreementRegistrationsTotal = createSelector(
  selectAgreementRegistrationsState,
  (state) => state.totalCount
);
export const selectAgreementRegistrationsHistory = createSelector(
  selectAgreementRegistrationsState,
  (state) => state.history
);
export const selectCurrentAgreementRegistration = createSelector(
  selectAgreementRegistrationsState,
  (state) => state.current
);
export const selectAgreementRegistrationsLoading = createSelector(
  selectAgreementRegistrationsState,
  (state) => state.loading
);
export const selectAgreementRegistrationsError = createSelector(
  selectAgreementRegistrationsState,
  (state) => state.error
);
