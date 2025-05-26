import { createAction, props } from '@ngrx/store';
import { PaymentPeriod } from './payment-period.model';

export const loadAll = createAction(
  '[PaymentPeriods] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[PaymentPeriods] Load All Success',
  props<{ result: PaymentPeriod[] }>()
);

export const loadAllFailure = createAction(
  '[PaymentPeriods] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[PaymentPeriods] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[PaymentPeriods] Load By Id Success',
  props<{ entity: PaymentPeriod }>()
);
export const loadByIdFailure = createAction(
  '[PaymentPeriods] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[PaymentPeriods] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<PaymentPeriod, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[PaymentPeriods] Create Success',
  props<{ entity: PaymentPeriod }>()
);
export const createEntityFailure = createAction(
  '[PaymentPeriods] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[PaymentPeriods] Update',
  props<{ id: number; changes: Partial<PaymentPeriod> }>()
);
export const updateEntitySuccess = createAction(
  '[PaymentPeriods] Update Success',
  props<{ id: number; changes: Partial<PaymentPeriod> }>()
);
export const updateEntityFailure = createAction(
  '[PaymentPeriods] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[PaymentPeriods] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[PaymentPeriods] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[PaymentPeriods] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
