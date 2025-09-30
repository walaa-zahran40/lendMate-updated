import { createSelector } from '@ngrx/store';
import { agreementContactPersonAdapter } from './agreement-contact-persons.state';
import { agreementContactPersonsFeature } from './agreement-contact-persons.reducer';

const { selectAll, selectEntities, selectIds, selectTotal } =
  agreementContactPersonAdapter.getSelectors();

export const selectFeatureState =
  agreementContactPersonsFeature.selectAgreementContactPersonsState;

export const selectAllContactPersons = createSelector(
  selectFeatureState,
  selectAll
);
export const selectContactPersonEntities = createSelector(
  selectFeatureState,
  selectEntities
);

export const selectListLoading = createSelector(
  selectFeatureState,
  (s) => s.listLoading
);
export const selectListError = createSelector(
  selectFeatureState,
  (s) => s.listError
);
export const selectListPageNumber = createSelector(
  selectFeatureState,
  (s) => s.listPageNumber
);
export const selectListTotalCount = createSelector(
  selectFeatureState,
  (s) => s.listTotalCount
);

export const selectByAgreementLoading = createSelector(
  selectFeatureState,
  (s) => s.createLoading
);
export const selectByAgreementError = createSelector(
  selectFeatureState,
  (s) => s.createError
);
export const selectContactPersonIdsByAgreement = (agreementId: number) =>
  createSelector(
    selectFeatureState,
    (s) => s.byAgreementMap[agreementId] ?? []
  );
export const selectContactPersonsByAgreement = (agreementId: number) =>
  createSelector(
    selectContactPersonEntities,
    selectContactPersonIdsByAgreement(agreementId),
    (entities, ids) => ids.map((id) => entities[id]!).filter(Boolean)
  );

export const selectSingleLoading = createSelector(
  selectFeatureState,
  (s) => s.singleLoading
);
export const selectCreateLoading = createSelector(
  selectFeatureState,
  (s) => s.createLoading
);
export const selectUpdateLoading = createSelector(
  selectFeatureState,
  (s) => s.updateLoading
);
export const selectDeleteLoading = createSelector(
  selectFeatureState,
  (s) => s.deleteLoading
);
export const selectContactPersonById = (id: number) =>
  createSelector(selectContactPersonEntities, (ents) => ents[id] ?? null);
