import { createAction, props } from '@ngrx/store';
import { EvaluationInformation } from './evaluation-information.model';

export const loadAll = createAction(
  '[EvaluationInformation] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[EvaluationInformation] Load All Success',
  props<{ result: EvaluationInformation[] }>()
);

export const loadAllFailure = createAction(
  '[EvaluationInformation] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[EvaluationInformation] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[EvaluationInformation] Load By Id Success',
  props<{ entity: EvaluationInformation }>()
);
export const loadByIdFailure = createAction(
  '[EvaluationInformation] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[EvaluationInformation] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<EvaluationInformation, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[EvaluationInformation] Create Success',
  props<{ entity: EvaluationInformation }>()
);
export const createEntityFailure = createAction(
  '[EvaluationInformation] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[EvaluationInformation] Update',
  props<{ id: number; changes: Partial<EvaluationInformation> }>()
);
export const updateEntitySuccess = createAction(
  '[EvaluationInformation] Update Success',
  props<{ id: number; changes: Partial<EvaluationInformation> }>()
);
export const updateEntityFailure = createAction(
  '[EvaluationInformation] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[EvaluationInformation] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[EvaluationInformation] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[EvaluationInformation] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadEvaluationInformationHistory = createAction(
  '[EvaluationInformation/API] Load Address Type History'
);

export const loadEvaluationInformationHistorySuccess = createAction(
  '[EvaluationInformation/API] Load Address Type History Success',
  props<{ history: EvaluationInformation[] }>()
);
export const performWorkflowActionEntityFailure = createAction(
  '[EvaluationInformation] PerformWorkflowAction Failure',
  props<{ error: any }>()
);
export const clearSelectedClient = createAction(
  '[EvaluationInformation] Clear Selected'
);

export const loadEvaluationInformationHistoryFailure = createAction(
  '[EvaluationInformation/API] Load Address Type History Failure',
  props<{ error: any }>()
);
