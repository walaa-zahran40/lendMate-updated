import { createAction, props } from '@ngrx/store';
import { Mandate } from './leasing-mandate.model';

export const loadAll = createAction(
  '[Mandates] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Mandates] Load All Success',
  props<{ result: Mandate[] }>()
);

export const loadAllFailure = createAction(
  '[Mandates] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Mandates] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Mandates] Load By Id Success',
  props<{ entity: Mandate }>()
);
export const loadByIdFailure = createAction(
  '[Mandates] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Mandates] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Mandate, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Mandates] Create Success',
  props<{ entity: Mandate }>()
);
export const createEntityFailure = createAction(
  '[Mandates] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Mandates] Update',
  props<{ id: number; changes: Partial<Mandate> }>()
);
export const updateEntitySuccess = createAction(
  '[Mandates] Update Success',
  props<{ id: number; changes: Partial<Mandate> }>()
);
export const updateEntityFailure = createAction(
  '[Mandates] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Mandates] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Mandates] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Mandates] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
export const clearSelectedMandate = createAction('[Mandates] Clear Selected');
