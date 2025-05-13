import { createAction, props } from '@ngrx/store';
import { Team } from './team.model';

export const loadAll = createAction(
  '[Teams] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Teams] Load All Success',
  props<{ result: Team[] }>()
);

export const loadAllFailure = createAction(
  '[Teams] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Teams] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Teams] Load By Id Success',
  props<{ entity: Team }>()
);
export const loadByIdFailure = createAction(
  '[Teams] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Teams] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Team, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Teams] Create Success',
  props<{ entity: Team }>()
);
export const createEntityFailure = createAction(
  '[Teams] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Teams] Update',
  props<{ id: number; changes: Partial<Team> }>()
);
export const updateEntitySuccess = createAction(
  '[Teams] Update Success',
  props<{ id: number; changes: Partial<Team> }>()
);
export const updateEntityFailure = createAction(
  '[Teams] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Teams] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Teams] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Teams] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
