import { createAction, props } from '@ngrx/store';
import { AddressType } from './address-types.model';

export const loadAll = createAction(
  '[AddressTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[AddressTypes] Load All Success',
  props<{ result: AddressType[] }>()
);

export const loadAllFailure = createAction(
  '[AddressTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[AddressTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[AddressTypes] Load By Id Success',
  props<{ entity: AddressType }>()
);
export const loadByIdFailure = createAction(
  '[AddressTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[AddressTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<AddressType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[AddressTypes] Create Success',
  props<{ entity: AddressType }>()
);
export const createEntityFailure = createAction(
  '[AddressTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[AddressTypes] Update',
  props<{ id: number; changes: Partial<AddressType> }>()
);
export const updateEntitySuccess = createAction(
  '[AddressTypes] Update Success',
  props<{ id: number; changes: Partial<AddressType> }>()
);
export const updateEntityFailure = createAction(
  '[AddressTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[AddressTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[AddressTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[AddressTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
