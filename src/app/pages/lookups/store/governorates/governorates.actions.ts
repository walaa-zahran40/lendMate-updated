import { createAction, props } from '@ngrx/store';
import { Governorate } from './governorate.model';

export const loadAll = createAction(
  '[Governorates] Load All',
  props<{ pageNumber?: number }>()
);
export const loadGovernorates = createAction(
  '[Governorates] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Governorates] Load All Success',
  props<{ result: Governorate[] }>()
);

export const loadAllFailure = createAction(
  '[Governorates] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Governorates] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Governorates] Load By Id Success',
  props<{ entity: Governorate }>()
);
export const loadByIdFailure = createAction(
  '[Governorates] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Governorates] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Governorate, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Governorates] Create Success',
  props<{ entity: Governorate }>()
);
export const createEntityFailure = createAction(
  '[Governorates] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Governorates] Update',
  props<{ id: number; changes: Partial<Governorate> }>()
);
export const updateEntitySuccess = createAction(
  '[Governorates] Update Success',
  props<{ id: number; changes: Partial<Governorate> }>()
);
export const updateEntityFailure = createAction(
  '[Governorates] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Governorates] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Governorates] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Governorates] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
