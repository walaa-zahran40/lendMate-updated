import { createAction, props } from '@ngrx/store';
import { AgreementFile } from './agreement-file.model';

export const loadAll = createAction(
  '[AgreementFiles] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[AgreementFiles] Load All Success',
  props<{ result: AgreementFile[] }>()
);
export const createEntityBinary = createAction(
  '[AgreementFiles] Create (Binary)',
  props<{ formData: FormData }>()
);

export const clearSelectedClient = createAction(
  '[AgreementFiles] Clear Selected'
);

export const loadAllFailure = createAction(
  '[AgreementFiles] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[AgreementFiles] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[AgreementFiles] Load By Id Success',
  props<{ entity: AgreementFile }>()
);
export const loadByIdFailure = createAction(
  '[AgreementFiles] Load By Id Failure',
  props<{ error: any }>()
);
export const loadByIdEdit = createAction(
  '[AgreementFiles] Load By Id Edit',
  props<{ id: number }>()
);
export const loadByIdEditSuccess = createAction(
  '[AgreementFiles] Load By Id Edit Success',
  props<{ entity: AgreementFile }>()
);
export const loadByIdEditFailure = createAction(
  '[AgreementFiles] Load By Id Edit Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[AgreementFiles] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<AgreementFile, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[AgreementFiles] Create Success',
  props<{ entity: AgreementFile }>()
);
export const createEntityFailure = createAction(
  '[AgreementFiles] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[AgreementFiles] Update',
  props<{ id: number; changes: Partial<AgreementFile> }>()
);
export const updateEntitySuccess = createAction(
  '[AgreementFiles] Update Success',
  props<{ id: number; changes: Partial<AgreementFile> }>()
);
export const updateEntityFailure = createAction(
  '[AgreementFiles] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[AgreementFiles] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[AgreementFiles] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[AgreementFiles] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadAgreementFileHistory = createAction(
  '[AgreementFile/API] Load Address Type History'
);

export const loadAgreementFileHistorySuccess = createAction(
  '[AgreementFile/API] Load Address Type History Success',
  props<{ history: AgreementFile[] }>()
);
export const performWorkflowActionEntityFailure = createAction(
  '[AgreementFiles] PerformWorkflowAction Failure',
  props<{ error: any }>()
);

export const loadAgreementFileHistoryFailure = createAction(
  '[AgreementFile/API] Load Address Type History Failure',
  props<{ error: any }>()
);
