import { createAction, props } from '@ngrx/store';
import { InsuredBy } from './insured-by.model';

export const loadAll = createAction(
  '[InsuredBys] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[InsuredBys] Load All Success',
  props<{ result: InsuredBy[] }>()
);

export const loadAllFailure = createAction(
  '[InsuredBys] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[InsuredBys] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[InsuredBys] Load By Id Success',
  props<{ entity: InsuredBy }>()
);
export const loadByIdFailure = createAction(
  '[InsuredBys] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[InsuredBys] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<InsuredBy, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[InsuredBys] Create Success',
  props<{ entity: InsuredBy }>()
);
export const createEntityFailure = createAction(
  '[InsuredBys] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[InsuredBys] Update',
  props<{ id: number; changes: Partial<InsuredBy> }>()
);
export const updateEntitySuccess = createAction(
  '[InsuredBys] Update Success',
  props<{ id: number; changes: Partial<InsuredBy> }>()
);
export const updateEntityFailure = createAction(
  '[InsuredBys] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[InsuredBys] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[InsuredBys] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[InsuredBys] Delete Failure',
  props<{ error: any }>()
);
