import { createAction, props } from '@ngrx/store';
import { BusinessSource } from './business-source.model';

export const loadAll = createAction(
  '[BusinessSources] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[BusinessSources] Load All Success',
  props<{ result: BusinessSource[] }>()
);

export const loadAllFailure = createAction(
  '[BusinessSources] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[BusinessSources] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[BusinessSources] Load By Id Success',
  props<{ entity: BusinessSource }>()
);
export const loadByIdFailure = createAction(
  '[BusinessSources] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[BusinessSources] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<BusinessSource, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[BusinessSources] Create Success',
  props<{ entity: BusinessSource }>()
);
export const createEntityFailure = createAction(
  '[BusinessSources] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[BusinessSources] Update',
  props<{ id: number; changes: Partial<BusinessSource> }>()
);
export const updateEntitySuccess = createAction(
  '[BusinessSources] Update Success',
  props<{ id: number; changes: Partial<BusinessSource> }>()
);
export const updateEntityFailure = createAction(
  '[BusinessSources] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[BusinessSources] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[BusinessSources] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[BusinessSources] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadBusinessSourceHistory = createAction(
  '[BusinessSource/API] Load Address Type History'
);

export const loadBusinessSourceHistorySuccess = createAction(
  '[BusinessSource/API] Load Address Type History Success',
  props<{ history: BusinessSource[] }>()
);

export const loadBusinessSourceHistoryFailure = createAction(
  '[BusinessSource/API] Load Address Type History Failure',
  props<{ error: any }>()
);
