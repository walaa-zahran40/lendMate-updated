import { createAction, props } from '@ngrx/store';
import { Evaluator } from './evaluator.model';

export const loadAll = createAction(
  '[Evaluators] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Evaluators] Load All Success',
  props<{ result: Evaluator[] }>()
);

export const loadAllFailure = createAction(
  '[Evaluators] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Evaluators] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Evaluators] Load By Id Success',
  props<{ entity: Evaluator }>()
);
export const loadByIdFailure = createAction(
  '[Evaluators] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Evaluators] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Evaluator, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Evaluators] Create Success',
  props<{ entity: Evaluator }>()
);
export const createEntityFailure = createAction(
  '[Evaluators] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Evaluators] Update',
  props<{ id: number; changes: Partial<Evaluator> }>()
);
export const updateEntitySuccess = createAction(
  '[Evaluators] Update Success',
  props<{ id: number; changes: Partial<Evaluator> }>()
);
export const updateEntityFailure = createAction(
  '[Evaluators] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Evaluators] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Evaluators] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Evaluators] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadEvaluatorHistory = createAction(
  '[Evaluator/API] Load Evaluator History'
);

export const loadEvaluatorHistorySuccess = createAction(
  '[Evaluator/API] Load Evaluator History Success',
  props<{ history: Evaluator[] }>()
);

export const loadEvaluatorHistoryFailure = createAction(
  '[Evaluator/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
