import { createAction, props } from '@ngrx/store';
import { PurchaseOrderFile } from './purchasing-order-file.model';

export const loadAll = createAction(
  '[PurchasingOrderFiles] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[PurchasingOrderFiles] Load All Success',
  props<{ result: PurchaseOrderFile[] }>()
);
export const clearSelectedClient = createAction(
  '[PurchasingOrderFiles] Clear Selected'
);

export const loadAllFailure = createAction(
  '[PurchasingOrderFiles] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[PurchasingOrderFiles] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[PurchasingOrderFiles] Load By Id Success',
  props<{ entity: PurchaseOrderFile }>()
);
export const loadByIdFailure = createAction(
  '[PurchasingOrderFiles] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[PurchasingOrderFiles] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<PurchaseOrderFile, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[PurchasingOrderFiles] Create Success',
  props<{ entity: PurchaseOrderFile }>()
);
export const createEntityFailure = createAction(
  '[PurchasingOrderFiles] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[PurchasingOrderFiles] Update',
  props<{ id: number; changes: Partial<PurchaseOrderFile> }>()
);
export const updateEntitySuccess = createAction(
  '[PurchasingOrderFiles] Update Success',
  props<{ id: number; changes: Partial<PurchaseOrderFile> }>()
);
export const updateEntityFailure = createAction(
  '[PurchasingOrderFiles] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[PurchasingOrderFiles] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[PurchasingOrderFiles] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[PurchasingOrderFiles] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadPurchasingOrderFileHistory = createAction(
  '[PurchasingOrderFile/API] Load Address Type History'
);

export const loadPurchasingOrderFileHistorySuccess = createAction(
  '[PurchasingOrderFile/API] Load Address Type History Success',
  props<{ history: PurchaseOrderFile[] }>()
);
export const performWorkflowActionEntityFailure = createAction(
  '[PurchasingOrderFiles] PerformWorkflowAction Failure',
  props<{ error: any }>()
);

export const loadPurchasingOrderFileHistoryFailure = createAction(
  '[PurchasingOrderFile/API] Load Address Type History Failure',
  props<{ error: any }>()
);
