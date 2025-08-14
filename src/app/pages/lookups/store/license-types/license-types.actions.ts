import { createAction, props } from '@ngrx/store';
import { LicenseType } from './license-type.model';

export const loadAll = createAction(
  '[LicenseTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[LicenseTypes] Load All Success',
  props<{ result: LicenseType[] }>()
);

export const loadAllFailure = createAction(
  '[LicenseTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[LicenseTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[LicenseTypes] Load By Id Success',
  props<{ entity: LicenseType }>()
);
export const loadByIdFailure = createAction(
  '[LicenseTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[LicenseTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<LicenseType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[LicenseTypes] Create Success',
  props<{ entity: LicenseType }>()
);
export const createEntityFailure = createAction(
  '[LicenseTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[LicenseTypes] Update',
  props<{ id: number; changes: Partial<LicenseType> }>()
);
export const updateEntitySuccess = createAction(
  '[LicenseTypes] Update Success',
  props<{ id: number; changes: Partial<LicenseType> }>()
);
export const updateEntityFailure = createAction(
  '[LicenseTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[LicenseTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[LicenseTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[LicenseTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadLicenseTypeHistory = createAction(
  '[LicenseType/API] Load LicenseType History'
);

export const loadLicenseTypeHistorySuccess = createAction(
  '[LicenseType/API] Load LicenseType History Success',
  props<{ history: LicenseType[] }>()
);

export const loadLicenseTypeHistoryFailure = createAction(
  '[LicenseType/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
