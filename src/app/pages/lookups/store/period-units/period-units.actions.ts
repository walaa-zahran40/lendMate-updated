import { createAction, props } from '@ngrx/store';
import { PeriodUnit } from './period-unit.model';

export const loadAll = createAction(
  '[GracePeriodUnits] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[GracePeriodUnits] Load All Success',
  props<{ result: PeriodUnit[] }>()
);

export const loadAllFailure = createAction(
  '[GracePeriodUnits] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[GracePeriodUnits] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[GracePeriodUnits] Load By Id Success',
  props<{ entity: PeriodUnit }>()
);
export const loadByIdFailure = createAction(
  '[GracePeriodUnits] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[GracePeriodUnits] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<PeriodUnit, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[GracePeriodUnits] Create Success',
  props<{ entity: PeriodUnit }>()
);
export const createEntityFailure = createAction(
  '[GracePeriodUnits] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[GracePeriodUnits] Update',
  props<{ id: number; changes: Partial<PeriodUnit> }>()
);
export const updateEntitySuccess = createAction(
  '[GracePeriodUnits] Update Success',
  props<{ id: number; changes: Partial<PeriodUnit> }>()
);
export const updateEntityFailure = createAction(
  '[GracePeriodUnits] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[GracePeriodUnits] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[GracePeriodUnits] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[GracePeriodUnits] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
