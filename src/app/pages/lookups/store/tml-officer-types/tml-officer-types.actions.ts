import { createAction, props } from '@ngrx/store';
import { TmlOfficerType } from './tml-officer-type.model';

export const loadAll = createAction(
  '[TmlOfficerTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[TmlOfficerTypes] Load All Success',
  props<{ result: TmlOfficerType[] }>()
);

export const loadAllFailure = createAction(
  '[TmlOfficerTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[TmlOfficerTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[TmlOfficerTypes] Load By Id Success',
  props<{ entity: TmlOfficerType }>()
);
export const loadByIdFailure = createAction(
  '[TmlOfficerTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[TmlOfficerTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<TmlOfficerType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[TmlOfficerTypes] Create Success',
  props<{ entity: TmlOfficerType }>()
);
export const createEntityFailure = createAction(
  '[TmlOfficerTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[TmlOfficerTypes] Update',
  props<{ id: number; changes: Partial<TmlOfficerType> }>()
);
export const updateEntitySuccess = createAction(
  '[TmlOfficerTypes] Update Success',
  props<{ id: number; changes: Partial<TmlOfficerType> }>()
);
export const updateEntityFailure = createAction(
  '[TmlOfficerTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[TmlOfficerTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[TmlOfficerTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[TmlOfficerTypes] Delete Failure',
  props<{ error: any }>()
);
