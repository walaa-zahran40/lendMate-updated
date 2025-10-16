import { createAction, props } from '@ngrx/store';
import { ClientIdentityType } from './client-identity-type.model';

export const loadAll = createAction(
  '[ClientIdentityTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[ClientIdentityTypes] Load All Success',
  props<{ result: ClientIdentityType[] }>()
);

export const loadAllFailure = createAction(
  '[ClientIdentityTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[ClientIdentityTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[ClientIdentityTypes] Load By Id Success',
  props<{ entity: ClientIdentityType }>()
);
export const loadByIdFailure = createAction(
  '[ClientIdentityTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[ClientIdentityTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<ClientIdentityType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[ClientIdentityTypes] Create Success',
  props<{ entity: ClientIdentityType }>()
);
export const createEntityFailure = createAction(
  '[ClientIdentityTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[ClientIdentityTypes] Update',
  props<{ id: number; changes: Partial<ClientIdentityType> }>()
);
export const updateEntitySuccess = createAction(
  '[ClientIdentityTypes] Update Success',
  props<{ id: number; changes: Partial<ClientIdentityType> }>()
);
export const updateEntityFailure = createAction(
  '[ClientIdentityTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[ClientIdentityTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[ClientIdentityTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[ClientIdentityTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
