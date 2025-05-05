import { createAction, props } from '@ngrx/store';
import { Area } from './area.model';

export const loadAll = createAction(
  '[Areas] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Areas] Load All Success',
  props<{ result: Area[] }>()
);

export const loadAllFailure = createAction(
  '[Areas] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Areas] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Areas] Load By Id Success',
  props<{ entity: Area }>()
);
export const loadByIdFailure = createAction(
  '[Areas] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Areas] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Area, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Areas] Create Success',
  props<{ entity: Area }>()
);
export const createEntityFailure = createAction(
  '[Areas] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Areas] Update',
  props<{ id: number; changes: Partial<Area> }>()
);
export const updateEntitySuccess = createAction(
  '[Areas] Update Success',
  props<{ id: number; changes: Partial<Area> }>()
);
export const updateEntityFailure = createAction(
  '[Areas] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Areas] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Areas] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Areas] Delete Failure',
  props<{ error: any }>()
);
