import { createAction, props } from '@ngrx/store';
import { ClientSalesTurnover } from './client-sales-turnover.model';

export const loadClientSalesTurnovers = createAction(
  '[ClientSalesTurnovers] Load All',
  props<{ pageNumber: number }>()
);

export const loadClientSalesTurnoversSuccess = createAction(
  '[ClientSalesTurnovers] Load All Success',
  props<{ items: ClientSalesTurnover[]; totalCount: number }>()
);

export const loadClientSalesTurnoversFailure = createAction(
  '[ClientSalesTurnovers] Load All Failure',
  props<{ error: any }>()
);

export const loadClientTurnoverHistory = createAction(
  '[ClientSalesTurnovers] Load History'
);

export const loadClientTurnoverHistorySuccess = createAction(
  '[ClientSalesTurnovers] Load History Success',
  props<{ items: ClientSalesTurnover[] }>()
);

export const loadClientTurnoverHistoryFailure = createAction(
  '[ClientSalesTurnovers] Load History Failure',
  props<{ error: any }>()
);

export const createClientSalesTurnover = createAction(
  '[ClientSalesTurnovers] Create',
  props<{ turnover: Partial<ClientSalesTurnover> }>()
);

export const createClientSalesTurnoverSuccess = createAction(
  '[ClientSalesTurnovers] Create Success',
  props<{ turnover: ClientSalesTurnover }>()
);

export const createClientSalesTurnoverFailure = createAction(
  '[ClientSalesTurnovers] Create Failure',
  props<{ error: any }>()
);

export const updateClientSalesTurnover = createAction(
  '[ClientSalesTurnovers] Update',
  props<{ id: number; changes: Partial<ClientSalesTurnover> }>()
);

export const updateClientSalesTurnoverSuccess = createAction(
  '[ClientSalesTurnovers] Update Success',
  props<{ turnover: ClientSalesTurnover }>()
);

export const updateClientSalesTurnoverFailure = createAction(
  '[ClientSalesTurnovers] Update Failure',
  props<{ error: any }>()
);

export const deleteClientSalesTurnover = createAction(
  '[ClientSalesTurnovers] Delete',
  props<{ id: number }>()
);

export const deleteClientSalesTurnoverSuccess = createAction(
  '[ClientSalesTurnovers] Delete Success',
  props<{ id: number }>()
);

export const deleteClientSalesTurnoverFailure = createAction(
  '[ClientSalesTurnovers] Delete Failure',
  props<{ error: any }>()
);
