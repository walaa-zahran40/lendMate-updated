import { createAction, props } from '@ngrx/store';
import { ConditionExpression } from './condition-expressions.model';

export const loadAll = createAction(
  '[ConditionExpressions] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[ConditionExpressions] Load All Success',
  props<{ result: ConditionExpression[] }>()
);

export const loadAllFailure = createAction(
  '[ConditionExpressions] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[ConditionExpressions] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[ConditionExpressions] Load By Id Success',
  props<{ entity: ConditionExpression }>()
);
export const loadByIdFailure = createAction(
  '[ConditionExpressions] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[ConditionExpressions] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<ConditionExpression, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[ConditionExpressions] Create Success',
  props<{ entity: ConditionExpression }>()
);
export const createEntityFailure = createAction(
  '[ConditionExpressions] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[ConditionExpressions] Update',
  props<{ id: number; changes: Partial<ConditionExpression> }>()
);
export const updateEntitySuccess = createAction(
  '[ConditionExpressions] Update Success',
  props<{ id: number; changes: Partial<ConditionExpression> }>()
);
export const updateEntityFailure = createAction(
  '[ConditionExpressions] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[ConditionExpressions] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[ConditionExpressions] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[ConditionExpressions] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
