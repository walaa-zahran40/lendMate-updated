import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './client-cr-authority-office.reducer';

export const selectState = createFeatureSelector<fromFeature.State>(
  fromFeature.clientCRAuthorityOfficesFeatureKey
);

export const selectAllOffices = createSelector(
  selectState,
  fromFeature.selectAll
);
export const selectLoading = createSelector(
  selectState,
  (state) => state.loading
);
export const selectError = createSelector(selectState, (state) => state.error);
export const selectTotalCount = createSelector(
  selectState,
  (state) => state.totalCount
);
export const selectEntities = createSelector(
  selectState,
  fromFeature.selectEntities
);
export const selectById = (id: number) =>
  createSelector(selectEntities, (entities) => entities[id]);
