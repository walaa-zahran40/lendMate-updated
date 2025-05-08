import { createAction, props } from '@ngrx/store';
import { BusinessLine } from './business-line.model';

export const loadAll = createAction(
  '[BusinessLines] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[BusinessLines] Load All Success',
  props<{ result: BusinessLine[] }>()
);

export const loadAllFailure = createAction(
  '[BusinessLines] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[BusinessLines] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[BusinessLines] Load By Id Success',
  props<{ entity: BusinessLine }>()
);
export const loadByIdFailure = createAction(
  '[BusinessLines] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[BusinessLines] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<BusinessLine, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[BusinessLines] Create Success',
  props<{ entity: BusinessLine }>()
);
export const createEntityFailure = createAction(
  '[BusinessLines] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[BusinessLines] Update',
  props<{ id: number; changes: Partial<BusinessLine> }>()
);
export const updateEntitySuccess = createAction(
  '[BusinessLines] Update Success',
  props<{ id: number; changes: Partial<BusinessLine> }>()
);
export const updateEntityFailure = createAction(
  '[BusinessLines] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[BusinessLines] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[BusinessLines] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[BusinessLines] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
