import { createAction, props } from '@ngrx/store';
import { WorkflowActionType } from './workflow-action-type.model';

export const loadAll = createAction(
  '[WorkflowActionTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[WorkflowActionTypes] Load All Success',
  props<{ result: WorkflowActionType[] }>()
);

export const loadAllFailure = createAction(
  '[WorkflowActionTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[WorkflowActionTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[WorkflowActionTypes] Load By Id Success',
  props<{ entity: WorkflowActionType }>()
);
export const loadByIdFailure = createAction(
  '[WorkflowActionTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[WorkflowActionTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<WorkflowActionType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[WorkflowActionTypes] Create Success',
  props<{ entity: WorkflowActionType }>()
);
export const createEntityFailure = createAction(
  '[WorkflowActionTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[WorkflowActionTypes] Update',
  props<{ id: number; changes: Partial<WorkflowActionType> }>()
);
export const updateEntitySuccess = createAction(
  '[WorkflowActionTypes] Update Success',
  props<{ id: number; changes: Partial<WorkflowActionType> }>()
);
export const updateEntityFailure = createAction(
  '[WorkflowActionTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[WorkflowActionTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[WorkflowActionTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[WorkflowActionTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
