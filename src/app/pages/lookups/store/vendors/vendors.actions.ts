import { createAction, props } from '@ngrx/store';
import { Vendor } from './vendor.model';

export const loadAll = createAction(
  '[Vendors] Load All',
  props<{ pageNumber?: number }>()
);
export const loadVendors = createAction(
  '[Vendors] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Vendors] Load All Success',
  props<{ result: Vendor[] }>()
);

export const loadAllFailure = createAction(
  '[Vendors] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Vendors] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Vendors] Load By Id Success',
  props<{ entity: Vendor }>()
);
export const loadByIdFailure = createAction(
  '[Vendors] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Vendors] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Vendor, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Vendors] Create Success',
  props<{ entity: Vendor }>()
);
export const createEntityFailure = createAction(
  '[Vendors] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Vendors] Update',
  props<{ id: number; changes: Partial<Vendor> }>()
);
export const updateEntitySuccess = createAction(
  '[Vendors] Update Success',
  props<{ id: number; changes: Partial<Vendor> }>()
);
export const updateEntityFailure = createAction(
  '[Vendors] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Vendors] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Vendors] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Vendors] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadVendorHistory = createAction(
  '[Vendor/API] Load Address Type History'
);

export const loadVendorHistorySuccess = createAction(
  '[Vendor/API] Load Vendor History Success',
  props<{ history: Vendor[] }>()
);

export const loadVendorHistoryFailure = createAction(
  '[Vendor/API] Load Vendor History Failure',
  props<{ error: any }>()
);
