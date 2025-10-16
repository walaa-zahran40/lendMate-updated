import { createAction, props } from '@ngrx/store';
import { ClientTaxOffice } from './client-tax-office.model';

// Load all
export const loadClientTaxOffices = createAction('[ClientTaxOffices] Load All');
export const loadClientTaxOfficesSuccess = createAction(
  '[ClientTaxOffices] Load All Success',
  props<{ items: ClientTaxOffice[]; totalCount: number }>()
);
export const loadClientTaxOfficesFailure = createAction(
  '[ClientTaxOffices] Load All Failure',
  props<{ error: any }>()
);
// Load history
export const loadClientTaxOfficesHistory = createAction(
  '[ClientTaxOffices] Load History'
);
export const loadClientTaxOfficesHistorySuccess = createAction(
  '[ClientTaxOffices] Load History Success',
  props<{ history: ClientTaxOffice[] }>()
);
export const loadClientTaxOfficesHistoryFailure = createAction(
  '[ClientTaxOffices] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadClientTaxOffice = createAction(
  '[ClientTaxOffices] Load One',
  props<{ id: number }>()
);
export const loadClientTaxOfficeSuccess = createAction(
  '[ClientTaxOffices] Load One Success',
  props<{ client: ClientTaxOffice }>()
);
export const loadClientTaxOfficeFailure = createAction(
  '[ClientTaxOffices] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createClientTaxOffice = createAction(
  '[ClientTaxOffices] Create',
  props<{ data: Partial<ClientTaxOffice> }>()
);
export const createClientTaxOfficeSuccess = createAction(
  '[ClientTaxOffices] Create Success',
  props<{ client: ClientTaxOffice }>()
);
export const createClientTaxOfficeFailure = createAction(
  '[ClientTaxOffices] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateClientTaxOffice = createAction(
  '[ClientTaxOffices] Update',
  props<{ id: number; data: Partial<ClientTaxOffice> }>()
);
export const updateClientTaxOfficeSuccess = createAction(
  '[ClientTaxOffices] Update Success',
  props<{ client: ClientTaxOffice }>()
);
export const updateClientTaxOfficeFailure = createAction(
  '[ClientTaxOffices] Update Failure',
  props<{ error: any }>()
);

// Load by ClientId
export const loadClientTaxOfficesByClientId = createAction(
  '[ClientTaxOffices] Load By ClientId',
  props<{ clientId: number }>()
);
export const loadClientTaxOfficesByClientIdSuccess = createAction(
  '[ClientTaxOffices] Load By ClientId Success',
  props<{ items: any }>()
);
export const loadClientTaxOfficesByClientIdFailure = createAction(
  '[ClientTaxOffices] Load By ClientId Failure',
  props<{ error: any }>()
);
//Delete
export const deleteClientTaxOffice = createAction(
  '[ClientTaxOffices] Delete',
  props<{ id: number; clientId: number }>()
);
export const deleteClientTaxOfficeSuccess = createAction(
  '[ClientTaxOffices] Delete Success',
  props<{ id: number; clientId: number }>()
);
export const deleteClientTaxOfficeFailure = createAction(
  '[ClientTaxOffices] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
