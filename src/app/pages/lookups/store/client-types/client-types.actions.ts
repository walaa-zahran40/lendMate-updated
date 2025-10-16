import { createAction, props } from '@ngrx/store';
import { ClientType } from './client-type.model';

export const loadAll = createAction(
  '[ClientTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[ClientTypes] Load All Success',
  props<{ result: ClientType[] }>()
);

export const loadAllFailure = createAction(
  '[ClientTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[ClientTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[ClientTypes] Load By Id Success',
  props<{ entity: ClientType }>()
);
export const loadByIdFailure = createAction(
  '[ClientTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[ClientTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<ClientType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[ClientTypes] Create Success',
  props<{ entity: ClientType }>()
);
export const createEntityFailure = createAction(
  '[ClientTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[ClientTypes] Update',
  props<{ id: number; changes: Partial<ClientType> }>()
);
export const updateEntitySuccess = createAction(
  '[ClientTypes] Update Success',
  props<{ id: number; changes: Partial<ClientType> }>()
);
export const updateEntityFailure = createAction(
  '[ClientTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[ClientTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[ClientTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[ClientTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadClientTypeHistory = createAction(
  '[ClientType/API] Load ClientType History'
);

export const loadClientTypeHistorySuccess = createAction(
  '[ClientType/API] Load ClientType History Success',
  props<{ history: ClientType[] }>()
);

export const loadClientTypeHistoryFailure = createAction(
  '[ClientType/API] Load ClientType History Failure',
  props<{ error: any }>()
);
