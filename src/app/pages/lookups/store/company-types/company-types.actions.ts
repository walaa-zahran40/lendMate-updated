import { createAction, props } from '@ngrx/store';
import { CompanyType } from './company-type.model';

// Load all
export const loadCompanyTypes = createAction('[CompanyTypes] Load All');
export const loadCompanyTypesSuccess = createAction(
  '[CompanyTypes] Load All Success',
  props<{ items: CompanyType[]; totalCount: number }>()
);
export const loadCompanyTypesFailure = createAction(
  '[CompanyTypes] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadCompanyTypesHistory = createAction(
  '[CompanyTypes] Load History'
);
export const loadCompanyTypesHistorySuccess = createAction(
  '[CompanyTypes] Load History Success',
  props<{ history: CompanyType[] }>()
);
export const loadCompanyTypesHistoryFailure = createAction(
  '[CompanyTypes] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadCompanyType = createAction(
  '[CompanyTypes] Load One',
  props<{ id: number }>()
);
export const loadCompanyTypeSuccess = createAction(
  '[CompanyTypes] Load One Success',
  props<{ companyType: CompanyType }>()
);
export const loadCompanyTypeFailure = createAction(
  '[CompanyTypes] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createCompanyType = createAction(
  '[CompanyTypes] Create',
  props<{ data: Partial<CompanyType> }>()
);
export const createCompanyTypeSuccess = createAction(
  '[CompanyTypes] Create Success',
  props<{ companyType: CompanyType }>()
);
export const createCompanyTypeFailure = createAction(
  '[CompanyTypes] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateCompanyType = createAction(
  '[CompanyTypes] Update',
  props<{ id: number; data: Partial<CompanyType> }>()
);
export const updateCompanyTypeSuccess = createAction(
  '[CompanyTypes] Update Success',
  props<{ companyType: CompanyType }>()
);
export const updateCompanyTypeFailure = createAction(
  '[CompanyTypes] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteCompanyType = createAction(
  '[CompanyTypes] Delete',
  props<{ id: number }>()
);
export const deleteCompanyTypeSuccess = createAction(
  '[CompanyTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteCompanyTypeFailure = createAction(
  '[CompanyTypes] Delete Failure',
  props<{ error: any }>()
);
