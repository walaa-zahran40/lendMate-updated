import { createAction, props } from '@ngrx/store';
import { IdentificationType } from './identification-type.model';

export const loadAll = createAction(
  '[IdentificationTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[IdentificationTypes] Load All Success',
  props<{ result: IdentificationType[] }>()
);

export const loadAllFailure = createAction(
  '[IdentificationTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[IdentificationTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[IdentificationTypes] Load By Id Success',
  props<{ entity: IdentificationType }>()
);
export const loadByIdFailure = createAction(
  '[IdentificationTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[IdentificationTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<IdentificationType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[IdentificationTypes] Create Success',
  props<{ entity: IdentificationType }>()
);
export const createEntityFailure = createAction(
  '[IdentificationTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[IdentificationTypes] Update',
  props<{ id: number; changes: Partial<IdentificationType> }>()
);
export const updateEntitySuccess = createAction(
  '[IdentificationTypes] Update Success',
  props<{ id: number; changes: Partial<IdentificationType> }>()
);
export const updateEntityFailure = createAction(
  '[IdentificationTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[IdentificationTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[IdentificationTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[IdentificationTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadIdentificationTypeHistory = createAction(
  '[IdentificationType/API] Load IdentificationType History'
);

export const loadIdentificationTypeHistorySuccess = createAction(
  '[IdentificationType/API] Load IdentificationType History Success',
  props<{ history: IdentificationType[] }>()
);

export const loadIdentificationTypeHistoryFailure = createAction(
  '[IdentificationType/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
