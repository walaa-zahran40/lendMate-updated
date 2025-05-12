import { createAction, props } from '@ngrx/store';
import { Country } from './country.model';

export const loadAll = createAction(
  '[Countries] Load All',
  props<{ pageNumber?: number }>()
);
export const loadCountries = createAction(
  '[Countries] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Countries] Load All Success',
  props<{ result: Country[] }>()
);

export const loadAllFailure = createAction(
  '[Countries] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Countries] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Countries] Load By Id Success',
  props<{ entity: Country }>()
);
export const loadByIdFailure = createAction(
  '[Countries] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Countries] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Country, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Countries] Create Success',
  props<{ entity: Country }>()
);
export const createEntityFailure = createAction(
  '[Countries] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Countries] Update',
  props<{ id: number; changes: Partial<Country> }>()
);
export const updateEntitySuccess = createAction(
  '[Countries] Update Success',
  props<{ id: number; changes: Partial<Country> }>()
);
export const updateEntityFailure = createAction(
  '[Countries] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Countries] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Countries] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Countries] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
