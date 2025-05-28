import { createAction, props } from '@ngrx/store';
import { MandatePaymentSetting } from './mandate-payment-setting.model';

export const loadAll = createAction(
  '[MandatePaymentSettings] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[MandatePaymentSettings] Load All Success',
  props<{ result: MandatePaymentSetting[] }>()
);

export const loadAllFailure = createAction(
  '[MandatePaymentSettings] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[MandatePaymentSettings] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[MandatePaymentSettings] Load By Id Success',
  props<{ entity: MandatePaymentSetting }>()
);
export const loadByIdFailure = createAction(
  '[MandatePaymentSettings] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[MandatePaymentSettings] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<MandatePaymentSetting, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[MandatePaymentSettings] Create Success',
  props<{ entity: MandatePaymentSetting }>()
);
export const createEntityFailure = createAction(
  '[MandatePaymentSettings] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[MandatePaymentSettings] Update',
  props<{ id: number; changes: Partial<MandatePaymentSetting> }>()
);
export const updateEntitySuccess = createAction(
  '[MandatePaymentSettings] Update Success',
  props<{ id: number; changes: Partial<MandatePaymentSetting> }>()
);
export const updateEntityFailure = createAction(
  '[MandatePaymentSettings] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[MandatePaymentSettings] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[MandatePaymentSettings] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[MandatePaymentSettings] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
