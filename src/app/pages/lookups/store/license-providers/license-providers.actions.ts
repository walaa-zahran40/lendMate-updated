import { createAction, props } from '@ngrx/store';
import { LicenseProvider } from './license-provider.model';

export const loadAll = createAction(
  '[LicenseProviders] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[LicenseProviders] Load All Success',
  props<{ result: LicenseProvider[] }>()
);

export const loadAllFailure = createAction(
  '[LicenseProviders] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[LicenseProviders] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[LicenseProviders] Load By Id Success',
  props<{ entity: LicenseProvider }>()
);
export const loadByIdFailure = createAction(
  '[LicenseProviders] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[LicenseProviders] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<LicenseProvider, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[LicenseProviders] Create Success',
  props<{ entity: LicenseProvider }>()
);
export const createEntityFailure = createAction(
  '[LicenseProviders] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[LicenseProviders] Update',
  props<{ id: number; changes: Partial<LicenseProvider> }>()
);
export const updateEntitySuccess = createAction(
  '[LicenseProviders] Update Success',
  props<{ id: number; changes: Partial<LicenseProvider> }>()
);
export const updateEntityFailure = createAction(
  '[LicenseProviders] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[LicenseProviders] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[LicenseProviders] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[LicenseProviders] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadLicenseProviderHistory = createAction(
  '[LicenseProvider/API] Load LicenseProvider History'
);

export const loadLicenseProviderHistorySuccess = createAction(
  '[LicenseProvider/API] Load LicenseProvider History Success',
  props<{ history: LicenseProvider[] }>()
);

export const loadLicenseProviderHistoryFailure = createAction(
  '[LicenseProvider/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
