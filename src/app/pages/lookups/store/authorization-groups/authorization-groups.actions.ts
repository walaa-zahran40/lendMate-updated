import { createAction, props } from '@ngrx/store';
import { AuthorizationGroup } from './authorization-group.model';

export const loadAll = createAction(
  '[AuthorizationGroups] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[AuthorizationGroups] Load All Success',
  props<{ result: AuthorizationGroup[] }>()
);

export const loadAllFailure = createAction(
  '[AuthorizationGroups] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[AuthorizationGroups] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[AuthorizationGroups] Load By Id Success',
  props<{ entity: AuthorizationGroup }>()
);
export const loadByIdFailure = createAction(
  '[AuthorizationGroups] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[AuthorizationGroups] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<AuthorizationGroup, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[AuthorizationGroups] Create Success',
  props<{ entity: AuthorizationGroup }>()
);
export const createEntityFailure = createAction(
  '[AuthorizationGroups] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[AuthorizationGroups] Update',
  props<{ id: number; changes: Partial<AuthorizationGroup> }>()
);
export const updateEntitySuccess = createAction(
  '[AuthorizationGroups] Update Success',
  props<{ id: number; changes: Partial<AuthorizationGroup> }>()
);
export const updateEntityFailure = createAction(
  '[AuthorizationGroups] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[AuthorizationGroups] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[AuthorizationGroups] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[AuthorizationGroups] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadAuthorizationGroupHistory = createAction(
  '[AuthorizationGroup/API] Load AuthorizationGroup History'
);

export const loadAuthorizationGroupHistorySuccess = createAction(
  '[AuthorizationGroup/API] Load AuthorizationGroup History Success',
  props<{ history: AuthorizationGroup[] }>()
);

export const loadAuthorizationGroupHistoryFailure = createAction(
  '[AuthorizationGroup/API] Load AuthorizationGroup History Failure',
  props<{ error: any }>()
);
