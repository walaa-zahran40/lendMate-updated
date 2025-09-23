import { createSelector } from '@ngrx/store';
import { mandateOfficerAdapter } from './mandate-officers.state';
import { mandateOfficersFeature } from './mandate-officers.reducer';

const { selectAll, selectEntities, selectIds, selectTotal } =
  mandateOfficerAdapter.getSelectors();

export const selectFeatureState =
  mandateOfficersFeature.selectMandateOfficersState;

export const selectAllOfficers = createSelector(selectFeatureState, selectAll);
export const selectOfficerEntities = createSelector(
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
export const selectOfficerIdsByMandate = (mandateId: number) =>
  createSelector(selectFeatureState, (s) => s.byMandateMap[mandateId] ?? []);
export const selectOfficersByMandate = (mandateId: number) =>
  createSelector(
    selectOfficerEntities,
    selectOfficerIdsByMandate(mandateId),
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
export const selectOfficerById = (id: number) =>
  createSelector(selectOfficerEntities, (ents) => ents[id] ?? null);
