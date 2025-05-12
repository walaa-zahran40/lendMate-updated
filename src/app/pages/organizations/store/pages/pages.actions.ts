import { createAction, props } from '@ngrx/store';
import { Page } from './page.model';

export const loadAll = createAction(
  '[Pages] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Pages] Load All Success',
  props<{ result: Page[] }>()
);

export const loadAllFailure = createAction(
  '[Pages] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Pages] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Pages] Load By Id Success',
  props<{ entity: Page }>()
);
export const loadByIdFailure = createAction(
  '[Pages] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Pages] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Page, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Pages] Create Success',
  props<{ entity: Page }>()
);
export const createEntityFailure = createAction(
  '[Pages] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Pages] Update',
  props<{ id: number; changes: Partial<Page> }>()
);
export const updateEntitySuccess = createAction(
  '[Pages] Update Success',
  props<{ id: number; changes: Partial<Page> }>()
);
export const updateEntityFailure = createAction(
  '[Pages] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Pages] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Pages] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Pages] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
