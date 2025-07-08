import { createAction, props } from '@ngrx/store';
import {
  MandateDetail,
  MandateWorkflowAction,
} from './client-leasing-mandate.model';

export const loadAll = createAction(
  '[MandatesDetail] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[MandatesDetail] Load All Success',
  props<{ result: MandateDetail[] }>()
);

export const loadAllFailure = createAction(
  '[MandatesDetail] Load All Failure',
  props<{ error: any }>()
);
/** Load one mandate by its leasing-mandate ID */
export const loadByLeasingId = createAction(
  '[Client Mandates] Load By LeasingId',
  props<{ id: number }>()
);

export const loadByLeasingIdSuccess = createAction(
  '[Client Mandates] Load By LeasingId Success',
  props<{ entity: MandateDetail }>()
);

export const loadByLeasingIdFailure = createAction(
  '[Client Mandates] Load By LeasingId Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[MandatesDetail] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[MandatesDetail] Load By Id Success',
  props<{ entity: MandateDetail }>()
);
export const loadByIdFailure = createAction(
  '[MandatesDetail] Load By Id Failure',
  props<{ error: any }>()
);

// CREATE

export const createEntity = createAction(
  '[MandatesDetail] Create',
  props<{
    clientId: number;
    payload: Partial<Omit<MandateDetail, 'id'>>;
  }>()
);
export const createEntitySuccess = createAction(
  '[MandatesDetail] Create Success',
  props<{
    clientId: number;
    entity: MandateDetail;
  }>()
);
export const createEntityFailure = createAction(
  '[MandatesDetail] Create Failure',
  props<{ clientId: number; error: any }>()
);

// UPDATE
export const updateEntity = createAction(
  '[MandatesDetail] Update',
  props<{
    clientId: number;
    id: number;
    changes: Partial<MandateDetail>;
  }>()
);
export const updateEntitySuccess = createAction(
  '[MandatesDetail] Update Success',
  props<{
    clientId: number;
    id: number;
    changes: Partial<MandateDetail>;
  }>()
);
export const updateEntityFailure = createAction(
  '[MandatesDetail] Update Failure',
  props<{ clientId: number; error: any }>()
);

// DELETE
export const deleteEntity = createAction(
  '[MandatesDetail] Delete',
  props<{ clientId: number; id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[MandatesDetail] Delete Success',
  props<{ clientId: number; id: number }>()
);
export const deleteEntityFailure = createAction(
  '[MandatesDetail] Delete Failure',
  props<{ clientId: number; error: any }>()
);

// GENERIC OP SUCCESS (if you still need this)
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{
    clientId: number;
    entity: string;
    operation: 'create' | 'update' | 'delete';
  }>()
);
export const clearSelectedMandate = createAction(
  '[MandatesDetail] Clear Selected'
);

// include clientId on request
export const performWorkflowActionEntity = createAction(
  '[MandatesOnboarding] PerformWorkflowAction',
  props<{
    clientId: number;
    id: number;
    changes: Partial<MandateWorkflowAction>;
  }>()
);

// include clientId on success
export const performWorkflowActionEntitySuccess = createAction(
  '[MandatesOnboarding] PerformWorkflowAction Success',
  props<{
    clientId: number;
    id: number;
    changes: Partial<MandateWorkflowAction>;
  }>()
);

// include clientId on failure
export const performWorkflowActionEntityFailure = createAction(
  '[MandatesOnboarding] PerformWorkflowAction Failure',
  props<{
    clientId: number;
    error: any;
  }>()
);
