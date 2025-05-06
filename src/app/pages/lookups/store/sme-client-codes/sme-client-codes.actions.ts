import { createAction, props } from '@ngrx/store';
import { SMEClientCode } from './sme-client-codes.model';

export const loadAll = createAction(
  '[SMEClientCodes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[SMEClientCodes] Load All Success',
  props<{ result: SMEClientCode[] }>()
);

export const loadAllFailure = createAction(
  '[SMEClientCodes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[SMEClientCodes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[SMEClientCodes] Load By Id Success',
  props<{ entity: SMEClientCode }>()
);
export const loadByIdFailure = createAction(
  '[SMEClientCodes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[SMEClientCodes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<SMEClientCode, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[SMEClientCodes] Create Success',
  props<{ entity: SMEClientCode }>()
);
export const createEntityFailure = createAction(
  '[SMEClientCodes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[SMEClientCodes] Update',
  props<{ id: number; changes: Partial<SMEClientCode> }>()
);
export const updateEntitySuccess = createAction(
  '[SMEClientCodes] Update Success',
  props<{ id: number; changes: Partial<SMEClientCode> }>()
);
export const updateEntityFailure = createAction(
  '[SMEClientCodes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[SMEClientCodes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[SMEClientCodes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[SMEClientCodes] Delete Failure',
  props<{ error: any }>()
);
