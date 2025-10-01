import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AgreementContactPersonsState } from './agreement-contact-persons.state';

export const selectAgreementContactPersonsState =
  createFeatureSelector<AgreementContactPersonsState>(
    'agreementContactPersons'
  );
export const selectAgreementContactPersons = createSelector(
  selectAgreementContactPersonsState,
  (state) => state.items
);
export const selectAgreementContactPersonsTotal = createSelector(
  selectAgreementContactPersonsState,
  (state) => state.totalCount
);
export const selectAgreementContactPersonsHistory = createSelector(
  selectAgreementContactPersonsState,
  (state) => state.history
);
export const selectCurrentAgreementContactPerson = createSelector(
  selectAgreementContactPersonsState,
  (state) => state.current
);
export const selectAgreementContactPersonsLoading = createSelector(
  selectAgreementContactPersonsState,
  (state) => state.loading
);
export const selectAgreementContactPersonsError = createSelector(
  selectAgreementContactPersonsState,
  (state) => state.error
);
