// app/core/agreement-files/data-access/agreement-files.selectors.ts
import { createSelector } from '@ngrx/store';
import {
  selectAgreementFilesState,
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
  selectLoaded,
  selectLoading,
  selectError,
  selectTotalCount,
  selectCurrentAgreementId,
  selectCurrentPage,
  selectCreating,
  selectUpdating,
  selectDeletingIds,
} from './agreement-files.reducer';

export const AgreementFilesSelectors = {
  // entity
  selectAll,
  selectEntities,
  selectIds,
  selectCountInStore: selectTotal,

  // ui
  loaded: selectLoaded,
  loading: selectLoading,
  error: selectError,
  totalCount: selectTotalCount,
  currentAgreementId: selectCurrentAgreementId,
  currentPage: selectCurrentPage,
  creating: selectCreating,
  updating: selectUpdating,
  deletingIds: selectDeletingIds,

  // derived
  selectById: (id: number) =>
    createSelector(selectEntities, (entities) => entities[id] ?? null),

  selectDeleting: (id: number) =>
    createSelector(selectDeletingIds, (ids) => ids.includes(id)),
};
