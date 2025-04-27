import { createAction, props } from '@ngrx/store';
import { Shareholder } from './client-share-holders.model';

export const loadShareholders = createAction(
  '[Client Shareholders] Load Shareholders',
  props<{ clientId: number }>()
);
export const loadShareholdersSuccess = createAction(
  '[Client Shareholders] Load Shareholders Success',
  props<{ shareholders: Shareholder[] }>()
);
export const loadShareholdersFailure = createAction(
  '[Client Shareholders] Load Shareholders Failure',
  props<{ error: any }>()
);

export const loadAllShareholders = createAction(
  '[Client Shareholders] Load All Shareholders'
);
export const loadAllShareholdersSuccess = createAction(
  '[Client Shareholders] Load All Shareholders Success',
  props<{ shareholders: Shareholder[] }>()
);
export const loadAllShareholdersFailure = createAction(
  '[Client Shareholders] Load All Shareholders Failure',
  props<{ error: any }>()
);

export const createShareholder = createAction(
  '[Client Shareholders] Create Shareholder',
  props<{ shareholder: Shareholder }>()
);
export const createShareholderSuccess = createAction(
  '[Client Shareholders] Create Shareholder Success',
  props<{ shareholder: Shareholder }>()
);
export const createShareholderFailure = createAction(
  '[Client Shareholders] Create Shareholder Failure',
  props<{ error: any }>()
);

export const updateShareholder = createAction(
  '[Client Shareholders] Update Shareholder',
  props<{ id: number; shareholder: Shareholder }>()
);
export const updateShareholderSuccess = createAction(
  '[Client Shareholders] Update Shareholder Success',
  props<{ shareholder: Shareholder }>()
);
export const updateShareholderFailure = createAction(
  '[Client Shareholders] Update Shareholder Failure',
  props<{ error: any }>()
);

export const deleteShareholder = createAction(
  '[Client Shareholders] Delete Shareholder',
  props<{ id: number }>()
);
export const deleteShareholderSuccess = createAction(
  '[Client Shareholders] Delete Shareholder Success',
  props<{ id: number }>()
);
export const deleteShareholderFailure = createAction(
  '[Client Shareholders] Delete Shareholder Failure',
  props<{ error: any }>()
);

export const loadShareholdersHistory = createAction(
  '[Client Shareholders] Load Shareholders History'
);
export const loadShareholdersHistorySuccess = createAction(
  '[Client Shareholders] Load Shareholders History Success',
  props<{ history: any[] }>()
);
export const loadShareholdersHistoryFailure = createAction(
  '[Client Shareholders] Load Shareholders History Failure',
  props<{ error: any }>()
);
