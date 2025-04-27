import { createAction, props } from '@ngrx/store';
import {
  ClientCRAuthorityOffice,
  ClientCRAuthorityOfficesResponse,
} from './client-cr-authority-office.model';

export const loadClientCRAuthorityOffices = createAction(
  '[ClientCRAuthorityOffices] Load All',
  props<{ page: number }>()
);
export const loadClientCRAuthorityOfficesSuccess = createAction(
  '[ClientCRAuthorityOffices] Load All Success',
  props<{ response: ClientCRAuthorityOfficesResponse }>()
);
export const loadClientCRAuthorityOfficesFailure = createAction(
  '[ClientCRAuthorityOffices] Load All Failure',
  props<{ error: any }>()
);

export const loadClientCRAuthorityOffice = createAction(
  '[ClientCRAuthorityOffices] Load One',
  props<{ id: number }>()
);
export const loadClientCRAuthorityOfficeSuccess = createAction(
  '[ClientCRAuthorityOffices] Load One Success',
  props<{ office: ClientCRAuthorityOffice }>()
);
export const loadClientCRAuthorityOfficeFailure = createAction(
  '[ClientCRAuthorityOffices] Load One Failure',
  props<{ error: any }>()
);

export const createClientCRAuthorityOffice = createAction(
  '[ClientCRAuthorityOffices] Create',
  props<{ office: Partial<ClientCRAuthorityOffice> }>()
);
export const createClientCRAuthorityOfficeSuccess = createAction(
  '[ClientCRAuthorityOffices] Create Success',
  props<{ office: ClientCRAuthorityOffice }>()
);
export const createClientCRAuthorityOfficeFailure = createAction(
  '[ClientCRAuthorityOffices] Create Failure',
  props<{ error: any }>()
);

export const updateClientCRAuthorityOffice = createAction(
  '[ClientCRAuthorityOffices] Update',
  props<{ id: number; changes: Partial<ClientCRAuthorityOffice> }>()
);
export const updateClientCRAuthorityOfficeSuccess = createAction(
  '[ClientCRAuthorityOffices] Update Success',
  props<{ office: ClientCRAuthorityOffice }>()
);
export const updateClientCRAuthorityOfficeFailure = createAction(
  '[ClientCRAuthorityOffices] Update Failure',
  props<{ error: any }>()
);

export const deleteClientCRAuthorityOffice = createAction(
  '[ClientCRAuthorityOffices] Delete',
  props<{ id: number }>()
);
export const deleteClientCRAuthorityOfficeSuccess = createAction(
  '[ClientCRAuthorityOffices] Delete Success',
  props<{ id: number }>()
);
export const deleteClientCRAuthorityOfficeFailure = createAction(
  '[ClientCRAuthorityOffices] Delete Failure',
  props<{ error: any }>()
);
