import { createAction, props } from '@ngrx/store';
import { AuthorizationGroupOfficer } from './authorization-group-officer.model';

export const loadAll = createAction(
  '[AuthorizationGroupOfficers] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[AuthorizationGroupOfficers] Load All Success',
  props<{ result: AuthorizationGroupOfficer[] }>()
);

export const loadAllFailure = createAction(
  '[AuthorizationGroupOfficers] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[AuthorizationGroupOfficers] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[AuthorizationGroupOfficers] Load By Id Success',
  props<{ entity: AuthorizationGroupOfficer }>()
);
export const loadByIdFailure = createAction(
  '[AuthorizationGroupOfficers] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[AuthorizationGroupOfficers] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<AuthorizationGroupOfficer, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[AuthorizationGroupOfficers] Create Success',
  props<{ entity: AuthorizationGroupOfficer }>()
);
export const createEntityFailure = createAction(
  '[AuthorizationGroupOfficers] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[AuthorizationGroupOfficers] Update',
  props<{ id: number; changes: Partial<AuthorizationGroupOfficer> }>()
);
export const updateEntitySuccess = createAction(
  '[AuthorizationGroupOfficers] Update Success',
  props<{ id: number; changes: Partial<AuthorizationGroupOfficer> }>()
);
export const updateEntityFailure = createAction(
  '[AuthorizationGroupOfficers] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[AuthorizationGroupOfficers] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[AuthorizationGroupOfficers] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[AuthorizationGroupOfficers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
