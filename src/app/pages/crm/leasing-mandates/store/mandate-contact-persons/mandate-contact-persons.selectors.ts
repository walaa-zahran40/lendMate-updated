import { createSelector } from '@ngrx/store';
import { mandateContactPersonAdapter } from './mandate-contact-persons.state';
import { mandateContactPersonsFeature } from './mandate-contact-persons.reducer';

const { selectAll, selectEntities, selectIds, selectTotal } =
  mandateContactPersonAdapter.getSelectors();

export const selectFeatureState =
  mandateContactPersonsFeature.selectMandateContactPersonsState;

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

export const selectByMandateLoading = createSelector(
  selectFeatureState,
  (s) => s.byMandateLoading
);
export const selectByMandateError = createSelector(
  selectFeatureState,
  (s) => s.byMandateError
);
export const selectContactPersonIdsByMandate = (mandateId: number) =>
  createSelector(selectFeatureState, (s) => s.byMandateMap[mandateId] ?? []);
export const selectContactPersonsByMandate = (mandateId: number) =>
  createSelector(
    selectContactPersonEntities,
    selectContactPersonIdsByMandate(mandateId),
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
