import { createAction, props } from '@ngrx/store';
import { ClientOfficerType } from './client-officer-type.model';

export const loadAll = createAction(
  '[ClientOfficerTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[ClientOfficerTypes] Load All Success',
  props<{ result: ClientOfficerType[] }>()
);

export const loadAllFailure = createAction(
  '[ClientOfficerTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[ClientOfficerTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[ClientOfficerTypes] Load By Id Success',
  props<{ entity: ClientOfficerType }>()
);
export const loadByIdFailure = createAction(
  '[ClientOfficerTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[ClientOfficerTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<ClientOfficerType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[ClientOfficerTypes] Create Success',
  props<{ entity: ClientOfficerType }>()
);
export const createEntityFailure = createAction(
  '[ClientOfficerTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[ClientOfficerTypes] Update',
  props<{ id: number; changes: Partial<ClientOfficerType> }>()
);
export const updateEntitySuccess = createAction(
  '[ClientOfficerTypes] Update Success',
  props<{ id: number; changes: Partial<ClientOfficerType> }>()
);
export const updateEntityFailure = createAction(
  '[ClientOfficerTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[ClientOfficerTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[ClientOfficerTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[ClientOfficerTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
