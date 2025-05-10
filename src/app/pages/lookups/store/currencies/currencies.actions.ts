import { createAction, props } from '@ngrx/store';
import { Currency } from './currency.model';

export const loadAll = createAction(
  '[Currencies] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Currencies] Load All Success',
  props<{ result: Currency[] }>()
);

export const loadAllFailure = createAction(
  '[Currencies] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Currencies] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Currencies] Load By Id Success',
  props<{ entity: Currency }>()
);
export const loadByIdFailure = createAction(
  '[Currencies] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Currencies] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Currency, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Currencies] Create Success',
  props<{ entity: Currency }>()
);
export const createEntityFailure = createAction(
  '[Currencies] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Currencies] Update',
  props<{ id: number; changes: Partial<Currency> }>()
);
export const updateEntitySuccess = createAction(
  '[Currencies] Update Success',
  props<{ id: number; changes: Partial<Currency> }>()
);
export const updateEntityFailure = createAction(
  '[Currencies] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Currencies] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Currencies] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Currencies] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
