import { createAction, props } from '@ngrx/store';
import { LicenseInformation } from './license-information.model';

export const loadAll = createAction(
  '[LicenseInformation] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[LicenseInformation] Load All Success',
  props<{ result: LicenseInformation[] }>()
);

export const loadAllFailure = createAction(
  '[LicenseInformation] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[LicenseInformation] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[LicenseInformation] Load By Id Success',
  props<{ entity: LicenseInformation }>()
);
export const loadByIdFailure = createAction(
  '[LicenseInformation] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[LicenseInformation] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<LicenseInformation, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[LicenseInformation] Create Success',
  props<{ entity: LicenseInformation }>()
);
export const createEntityFailure = createAction(
  '[LicenseInformation] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[LicenseInformation] Update',
  props<{ id: number; changes: Partial<LicenseInformation> }>()
);
export const updateEntitySuccess = createAction(
  '[LicenseInformation] Update Success',
  props<{ id: number; changes: Partial<LicenseInformation> }>()
);
export const updateEntityFailure = createAction(
  '[LicenseInformation] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[LicenseInformation] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[LicenseInformation] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[LicenseInformation] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadLicenseInformationHistory = createAction(
  '[LicenseInformation/API] Load Address Type History'
);

export const loadLicenseInformationHistorySuccess = createAction(
  '[LicenseInformation/API] Load Address Type History Success',
  props<{ history: LicenseInformation[] }>()
);
export const performWorkflowActionEntityFailure = createAction(
  '[LicenseInformation] PerformWorkflowAction Failure',
  props<{ error: any }>()
);
export const clearSelectedClient = createAction(
  '[LicenseInformation] Clear Selected'
);

export const loadLicenseInformationHistoryFailure = createAction(
  '[LicenseInformation/API] Load Address Type History Failure',
  props<{ error: any }>()
);
