import { createAction, props } from '@ngrx/store';
import { ClientStatusAction } from './client-statuses-action.model';

export const loadAll = createAction(
  '[ClientStatusActions] Load All',
  props<{ pageNumber?: number }>()
);
export const loadClientStatusActions = createAction(
  '[ClientStatusActions] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[ClientStatusActions] Load All Success',
  props<{ result: ClientStatusAction[] }>()
);

export const loadAllFailure = createAction(
  '[ClientStatusActions] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[ClientStatusActions] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[ClientStatusActions] Load By Id Success',
  props<{ entity: ClientStatusAction }>()
);
export const loadByIdFailure = createAction(
  '[ClientStatusActions] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[ClientStatusActions] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<ClientStatusAction, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[ClientStatusActions] Create Success',
  props<{ entity: ClientStatusAction }>()
);
export const createEntityFailure = createAction(
  '[ClientStatusActions] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[ClientStatusActions] Update',
  props<{ id: number; changes: Partial<ClientStatusAction> }>()
);
export const updateEntitySuccess = createAction(
  '[ClientStatusActions] Update Success',
  props<{ id: number; changes: Partial<ClientStatusAction> }>()
);
export const updateEntityFailure = createAction(
  '[ClientStatusActions] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[ClientStatusActions] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[ClientStatusActions] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[ClientStatusActions] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
