import { createSelector } from '@ngrx/store';
import { leasingAgreementsFeature } from './agreements.reducer';
import { agreementsAdapter } from './agreements.state';

const { selectAll, selectEntities, selectIds, selectTotal } =
  agreementsAdapter.getSelectors();

export const selectAgreementsState =
  leasingAgreementsFeature.selectLeasingAgreementsState;
export const selectAgreementsLoading = leasingAgreementsFeature.selectLoading;
export const selectAgreementsError = leasingAgreementsFeature.selectError;
export const selectSelectedAgreementId =
  leasingAgreementsFeature.selectSelectedId;
export const selectHistory = leasingAgreementsFeature.selectHistory;

export const selectAllAgreements = createSelector(
  selectAgreementsState,
  selectAll
);
export const selectAgreementsEntities = createSelector(
  selectAgreementsState,
  selectEntities
);
export const selectAgreementsTotal = createSelector(
  selectAgreementsState,
  selectTotal
);
export const selectSelectedAgreement = createSelector(
  selectAgreementsEntities,
  selectSelectedAgreementId,
  (entities, id) => (id != null ? entities[id] ?? null : null)
);
