import { createAction, props } from '@ngrx/store';
import { ClientCentralBankInfo } from './client-central-bank.model';

// Load all
export const loadAllClientCentralBankInfo = createAction('[ClientCentralBankInfo] Load All');
export const loadAllClientCentralBankInfoSuccess = createAction(
  '[ClientCentralBankInfo] Load All Success',
  props<{ items: ClientCentralBankInfo[]; totalCount: number }>()
);
export const loadAllClientCentralBankInfoFailure = createAction(
  '[ClientCentralBankInfo] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadClientCentralBankInfoHistory = createAction(
  '[ClientCentralBankInfo] Load History'
);
export const loadClientCentralBankInfoHistorySuccess = createAction(
  '[ClientCentralBankInfo] Load History Success',
  props<{ history: ClientCentralBankInfo[] }>()
);
export const loadClientCentralBankInfoHistoryFailure = createAction(
  '[ClientCentralBankInfo] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadClientCentralBankInfo = createAction(
  '[ClientCentralBankInfo] Load One',
  props<{ id: number }>()
);
export const loadClientCentralBankInfoSuccess = createAction(
  '[ClientCentralBankInfo] Load One Success',
  props<{ client: ClientCentralBankInfo }>()
);
export const loadClientCentralBankInfoFailure = createAction(
  '[ClientCentralBankInfo] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createClientCentralBankInfo = createAction(
  '[ClientCentralBankInfo] Create',
  props<{ data: Partial<ClientCentralBankInfo> }>()
);
export const createClientCentralBankInfoSuccess = createAction(
  '[ClientCentralBankInfo] Create Success',
  props<{ client: ClientCentralBankInfo }>()
);
export const createClientCentralBankInfoFailure = createAction(
  '[ClientCentralBankInfo] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateClientCentralBankInfo = createAction(
  '[ClientCentralBankInfo] Update',
  props<{ id: number; data: Partial<ClientCentralBankInfo> }>()
);
export const updateClientCentralBankInfoSuccess = createAction(
  '[ClientCentralBankInfo] Update Success',
  props<{ client: ClientCentralBankInfo }>()
);
export const updateClientCentralBankInfoFailure = createAction(
  '[ClientCentralBankInfo] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadClientCentralBankInfoByClientId = createAction(
  '[ClientCentralBankInfo] Load By ClientId',
  props<{ clientId: number }>()
);
export const loadClientCentralBankInfoByClientIdSuccess = createAction(
  '[ClientCentralBankInfo] Load By ClientId Success',
  props<{ items: any }>()
);
export const loadClientCentralBankInfoByClientIdFailure = createAction(
  '[ClientCentralBankInfo] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteClientCentralBankInfo = createAction(
  '[ClientCentralBankInfo] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteClientCentralBankInfoSuccess = createAction(
  '[ClientCentralBankInfo] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteClientCentralBankInfoFailure = createAction(
  '[ClientCentralBankInfo] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
