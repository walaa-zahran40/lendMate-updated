import { createAction, props } from '@ngrx/store';
import { LeasingMandate } from './leasing-mandate.model';

export const loadAll = createAction(
  '[LeasingMandates] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[LeasingMandates] Load All Success',
  props<{ result: LeasingMandate[] }>()
);

export const loadAllFailure = createAction(
  '[LeasingMandates] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[LeasingMandates] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[LeasingMandates] Load By Id Success',
  props<{ entity: LeasingMandate }>()
);
export const loadByIdFailure = createAction(
  '[LeasingMandates] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[LeasingMandates] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<LeasingMandate, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[LeasingMandates] Create Success',
  props<{ entity: LeasingMandate }>()
);
export const createEntityFailure = createAction(
  '[LeasingMandates] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[LeasingMandates] Update',
  props<{ id: number; changes: Partial<LeasingMandate> }>()
);
export const updateEntitySuccess = createAction(
  '[LeasingMandates] Update Success',
  props<{ id: number; changes: Partial<LeasingMandate> }>()
);
export const updateEntityFailure = createAction(
  '[LeasingMandates] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[LeasingMandates] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[LeasingMandates] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[LeasingMandates] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
