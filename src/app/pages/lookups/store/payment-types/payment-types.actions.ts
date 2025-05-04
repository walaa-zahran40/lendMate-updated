import { createAction, props } from '@ngrx/store';
import { PaymentType } from './payment-type.model';

export const loadAll = createAction(
  '[PaymentTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[PaymentTypes] Load All Success',
  props<{ result: PaymentType[] }>()
);

export const loadAllFailure = createAction(
  '[PaymentTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[PaymentTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[PaymentTypes] Load By Id Success',
  props<{ entity: PaymentType }>()
);
export const loadByIdFailure = createAction(
  '[PaymentTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[PaymentTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<PaymentType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[PaymentTypes] Create Success',
  props<{ entity: PaymentType }>()
);
export const createEntityFailure = createAction(
  '[PaymentTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[PaymentTypes] Update',
  props<{ id: number; changes: Partial<PaymentType> }>()
);
export const updateEntitySuccess = createAction(
  '[PaymentTypes] Update Success',
  props<{ id: number; changes: Partial<PaymentType> }>()
);
export const updateEntityFailure = createAction(
  '[PaymentTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[PaymentTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[PaymentTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[PaymentTypes] Delete Failure',
  props<{ error: any }>()
);
