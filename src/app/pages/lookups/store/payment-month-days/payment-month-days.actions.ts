import { createAction, props } from '@ngrx/store';
import { PaymentMonthDay } from './payment-month-day.model';

export const loadAll = createAction(
  '[PaymentMonthDays] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[PaymentMonthDays] Load All Success',
  props<{ result: PaymentMonthDay[] }>()
);

export const loadAllFailure = createAction(
  '[PaymentMonthDays] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[PaymentMonthDays] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[PaymentMonthDays] Load By Id Success',
  props<{ entity: PaymentMonthDay }>()
);
export const loadByIdFailure = createAction(
  '[PaymentMonthDays] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[PaymentMonthDays] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<PaymentMonthDay, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[PaymentMonthDays] Create Success',
  props<{ entity: PaymentMonthDay }>()
);
export const createEntityFailure = createAction(
  '[PaymentMonthDays] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[PaymentMonthDays] Update',
  props<{ id: number; changes: Partial<PaymentMonthDay> }>()
);
export const updateEntitySuccess = createAction(
  '[PaymentMonthDays] Update Success',
  props<{ id: number; changes: Partial<PaymentMonthDay> }>()
);
export const updateEntityFailure = createAction(
  '[PaymentMonthDays] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[PaymentMonthDays] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[PaymentMonthDays] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[PaymentMonthDays] Delete Failure',
  props<{ error: any }>()
);
