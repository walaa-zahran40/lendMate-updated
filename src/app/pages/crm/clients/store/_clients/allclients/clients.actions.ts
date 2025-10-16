import { createAction, props } from '@ngrx/store';
import { Client, ClientWorkFlowAction } from './client.model';

export const loadAll = createAction(
  '[Clients] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Clients] Load All Success',
  props<{ result: Client[] }>()
);

export const loadAllFailure = createAction(
  '[Clients] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Clients] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Clients] Load By Id Success',
  props<{ entity: Client }>()
);
export const loadByIdFailure = createAction(
  '[Clients] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Clients] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Client, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Clients] Create Success',
  props<{ entity: Client }>()
);
export const createEntityFailure = createAction(
  '[Clients] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Clients] Update',
  props<{ id: number; changes: Partial<Client> }>()
);
export const updateEntitySuccess = createAction(
  '[Clients] Update Success',
  props<{ id: number; changes: Partial<Client> }>()
);
export const updateEntityFailure = createAction(
  '[Clients] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Clients] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Clients] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Clients] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
export const clearSelectedClient = createAction('[Clients] Clear Selected');

export const performWorkflowActionEntity = createAction(
  '[ClientsOnboarding] PerformWorkflowAction',
  props<{ id: number; changes: Partial<ClientWorkFlowAction> }>()
);
export const performWorkflowActionEntitySuccess = createAction(
  '[ClientsOnboarding] PerformWorkflowAction Success',
  props<{ id: number; changes: Partial<ClientWorkFlowAction> }>()
);
export const performWorkflowActionEntityFailure = createAction(
  '[ClientsOnboarding] PerformWorkflowAction Failure',
  props<{ error: any }>()
);