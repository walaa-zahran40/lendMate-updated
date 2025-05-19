import { createAction, props } from '@ngrx/store';
import { ClientCRAuthorityOffice } from './client-cr-authority-office.model';

// Load all
export const loadClientCRAuthorityOffices = createAction('[ClientCRAuthorityOffices] Load All');
export const loadClientCRAuthorityOfficesSuccess = createAction(
  '[ClientCRAuthorityOffices] Load All Success',
  props<{ items: ClientCRAuthorityOffice[]; totalCount: number }>()
);
export const loadClientCRAuthorityOfficesFailure = createAction(
  '[ClientCRAuthorityOffices] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadClientCRAuthorityOfficesHistory = createAction(
  '[ClientCRAuthorityOffices] Load History'
);
export const loadClientCRAuthorityOfficesHistorySuccess = createAction(
  '[ClientCRAuthorityOffices] Load History Success',
  props<{ history: ClientCRAuthorityOffice[] }>()
);
export const loadClientCRAuthorityOfficesHistoryFailure = createAction(
  '[ClientCRAuthorityOffices] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadClientCRAuthorityOffice = createAction(
  '[ClientCRAuthorityOffices] Load One',
  props<{ id: number }>()
);
export const loadClientCRAuthorityOfficeSuccess = createAction(
  '[ClientCRAuthorityOffices] Load One Success',
  props<{ client: ClientCRAuthorityOffice }>()
);
export const loadClientCRAuthorityOfficeFailure = createAction(
  '[ClientCRAuthorityOffices] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createClientCRAuthorityOffice = createAction(
  '[ClientCRAuthorityOffices] Create',
  props<{ data: Partial<ClientCRAuthorityOffice> }>()
);
export const createClientCRAuthorityOfficeSuccess = createAction(
  '[ClientCRAuthorityOffices] Create Success',
  props<{ client: ClientCRAuthorityOffice }>()
);
export const createClientCRAuthorityOfficeFailure = createAction(
  '[ClientCRAuthorityOffices] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateClientCRAuthorityOffice = createAction(
  '[ClientCRAuthorityOffices] Update',
  props<{ id: number; data: Partial<ClientCRAuthorityOffice> }>()
);
export const updateClientCRAuthorityOfficeSuccess = createAction(
  '[ClientCRAuthorityOffices] Update Success',
  props<{ client: ClientCRAuthorityOffice }>()
);
export const updateClientCRAuthorityOfficeFailure = createAction(
  '[ClientCRAuthorityOffices] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadClientCRAuthorityOfficesByClientId = createAction(
  '[ClientCRAuthorityOffices] Load By ClientId',
  props<{ clientId: number }>()
);
export const loadClientCRAuthorityOfficesByClientIdSuccess = createAction(
  '[ClientCRAuthorityOffices] Load By ClientId Success',
  props<{ items: any }>()
);
export const loadClientCRAuthorityOfficesByClientIdFailure = createAction(
  '[ClientCRAuthorityOffices] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteClientCRAuthorityOffice = createAction(
  '[ClientCRAuthorityOffices] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteClientCRAuthorityOfficeSuccess = createAction(
  '[ClientCRAuthorityOffices] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteClientCRAuthorityOfficeFailure = createAction(
  '[ClientCRAuthorityOffices] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
