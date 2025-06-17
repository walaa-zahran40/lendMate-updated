import { createAction, props } from '@ngrx/store';
import { PaymentMethod } from './payment-method.model';

export const loadAll = createAction(
  '[PaymentMethods] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[PaymentMethods] Load All Success',
  props<{ result: PaymentMethod[] }>()
);

export const loadAllFailure = createAction(
  '[PaymentMethods] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[PaymentMethods] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[PaymentMethods] Load By Id Success',
  props<{ entity: PaymentMethod }>()
);
export const loadByIdFailure = createAction(
  '[PaymentMethods] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[PaymentMethods] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<PaymentMethod, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[PaymentMethods] Create Success',
  props<{ entity: PaymentMethod }>()
);
export const createEntityFailure = createAction(
  '[PaymentMethods] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[PaymentMethods] Update',
  props<{ id: number; changes: Partial<PaymentMethod> }>()
);
export const updateEntitySuccess = createAction(
  '[PaymentMethods] Update Success',
  props<{ id: number; changes: Partial<PaymentMethod> }>()
);
export const updateEntityFailure = createAction(
  '[PaymentMethods] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[PaymentMethods] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[PaymentMethods] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[PaymentMethods] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadPaymentMethodHistory = createAction(
  '[PaymentMethod/API] Load PaymentMethod History'
);

export const loadPaymentMethodHistorySuccess = createAction(
  '[PaymentMethod/API] Load PaymentMethod History Success',
  props<{ history: PaymentMethod[] }>()
);

export const loadPaymentMethodHistoryFailure = createAction(
  '[PaymentMethod/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
