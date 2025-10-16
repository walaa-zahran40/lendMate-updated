import { createAction, props } from '@ngrx/store';
import { PurchaseOrder } from './purchasing-order.model';

export const loadAll = createAction(
  '[PurchasingOrders] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[PurchasingOrders] Load All Success',
  props<{ result: PurchaseOrder[] }>()
);
export const clearSelectedClient = createAction(
  '[PurchasingOrders] Clear Selected'
);

export const loadAllFailure = createAction(
  '[PurchasingOrders] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[PurchasingOrders] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[PurchasingOrders] Load By Id Success',
  props<{ entity: PurchaseOrder }>()
);
export const loadByIdFailure = createAction(
  '[PurchasingOrders] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[PurchasingOrders] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<PurchaseOrder, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[PurchasingOrders] Create Success',
  props<{ entity: PurchaseOrder }>()
);
export const createEntityFailure = createAction(
  '[PurchasingOrders] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[PurchasingOrders] Update',
  props<{ id: number; changes: Partial<PurchaseOrder> }>()
);
export const updateEntitySuccess = createAction(
  '[PurchasingOrders] Update Success',
  props<{ id: number; changes: Partial<PurchaseOrder> }>()
);
export const updateEntityFailure = createAction(
  '[PurchasingOrders] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[PurchasingOrders] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[PurchasingOrders] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[PurchasingOrders] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadPurchasingOrderHistory = createAction(
  '[PurchasingOrder/API] Load Address Type History'
);

export const loadPurchasingOrderHistorySuccess = createAction(
  '[PurchasingOrder/API] Load Address Type History Success',
  props<{ history: PurchaseOrder[] }>()
);
export const performWorkflowActionEntityFailure = createAction(
  '[PurchasingOrders] PerformWorkflowAction Failure',
  props<{ error: any }>()
);

export const loadPurchasingOrderHistoryFailure = createAction(
  '[PurchasingOrder/API] Load Address Type History Failure',
  props<{ error: any }>()
);
