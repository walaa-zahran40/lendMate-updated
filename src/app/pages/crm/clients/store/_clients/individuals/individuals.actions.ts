import { createAction, props } from '@ngrx/store';
import { Individual } from './individual.model';

export const loadAll = createAction(
  '[Individuals] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Individuals] Load All Success',
  props<{ result: Individual[] }>()
);

export const loadAllFailure = createAction(
  '[Individuals] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Individuals] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Individuals] Load By Id Success',
  props<{ entity: Individual }>()
);
export const loadByIdFailure = createAction(
  '[Individuals] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Individuals] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Individual, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Individuals] Create Success',
  props<{ entity: Individual }>()
);
export const createEntityFailure = createAction(
  '[Individuals] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Individuals] Update',
  props<{ id: number; changes: Partial<Individual> }>()
);
export const updateEntitySuccess = createAction(
  '[Individuals] Update Success',
  props<{ id: number; changes: Partial<Individual> }>()
);
export const updateEntityFailure = createAction(
  '[Individuals] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Individuals] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Individuals] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Individuals] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
export const clearSelectedIndividual = createAction(
  '[Individuals] Clear Selected'
);
