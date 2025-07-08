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

export const createEntity = createAction(
  '[MandatesDetail] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<MandateDetail, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[MandatesDetail] Create Success',
  props<{ entity: MandateDetail }>()
);
export const createEntityFailure = createAction(
  '[MandatesDetail] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[MandatesDetail] Update',
  props<{ id: number; changes: Partial<MandateDetail> }>()
);
export const updateEntitySuccess = createAction(
  '[MandatesDetail] Update Success',
  props<{ id: number; changes: Partial<MandateDetail> }>()
);
export const updateEntityFailure = createAction(
  '[MandatesDetail] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[MandatesDetail] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[MandatesDetail] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[MandatesDetail] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
export const clearSelectedMandate = createAction(
  '[MandatesDetail] Clear Selected'
);

export const performWorkflowActionEntity = createAction(
  '[MandatesOnboarding] PerformWorkflowAction',
  props<{ id: number; changes: Partial<MandateWorkflowAction> }>()
);
export const performWorkflowActionEntitySuccess = createAction(
  '[MandatesOnboarding] PerformWorkflowAction Success',
  props<{ id: number; changes: Partial<MandateWorkflowAction> }>()
);
export const performWorkflowActionEntityFailure = createAction(
  '[MandatesOnboarding] PerformWorkflowAction Failure',
  props<{ error: any }>()
);
