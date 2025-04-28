import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyTypesState } from './company-types.state';

export const selectCompanyTypesState =
  createFeatureSelector<CompanyTypesState>('companyTypes');
export const selectCompanyTypes = createSelector(
  selectCompanyTypesState,
  (state) => state.items
);
export const selectCompanyTypesTotal = createSelector(
  selectCompanyTypesState,
  (state) => state.totalCount
);
export const selectCompanyTypesHistory = createSelector(
  selectCompanyTypesState,
  (state) => state.history
);
export const selectCurrentCompanyType = createSelector(
  selectCompanyTypesState,
  (state) => state.current
);
export const selectCompanyTypesLoading = createSelector(
  selectCompanyTypesState,
  (state) => state.loading
);
export const selectCompanyTypesError = createSelector(
  selectCompanyTypesState,
  (state) => state.error
);
