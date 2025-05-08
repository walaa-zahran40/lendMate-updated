import { createAction, props } from '@ngrx/store';
import { LeasingType } from './leasing-type.model';

export const loadAll = createAction(
  '[LeasingTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[LeasingTypes] Load All Success',
  props<{ result: LeasingType[] }>()
);

export const loadAllFailure = createAction(
  '[LeasingTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[LeasingTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[LeasingTypes] Load By Id Success',
  props<{ entity: LeasingType }>()
);
export const loadByIdFailure = createAction(
  '[LeasingTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[LeasingTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<LeasingType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[LeasingTypes] Create Success',
  props<{ entity: LeasingType }>()
);
export const createEntityFailure = createAction(
  '[LeasingTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[LeasingTypes] Update',
  props<{ id: number; changes: Partial<LeasingType> }>()
);
export const updateEntitySuccess = createAction(
  '[LeasingTypes] Update Success',
  props<{ id: number; changes: Partial<LeasingType> }>()
);
export const updateEntityFailure = createAction(
  '[LeasingTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[LeasingTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[LeasingTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[LeasingTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
