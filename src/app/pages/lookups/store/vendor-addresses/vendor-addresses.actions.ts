import { createAction, props } from '@ngrx/store';
import { VendorAddress } from './vendor-address.model';

export const loadAll = createAction(
  '[VendorAddresses] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[VendorAddresses] Load All Success',
  props<{ result: VendorAddress[] }>()
);

export const loadAllFailure = createAction(
  '[VendorAddresses] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[VendorAddresses] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[VendorAddresses] Load By Id Success',
  props<{ entity: VendorAddress }>()
);
export const loadByIdFailure = createAction(
  '[VendorAddresses] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[VendorAddresses] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<VendorAddress, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[VendorAddresses] Create Success',
  props<{ entity: VendorAddress }>()
);
export const createEntityFailure = createAction(
  '[VendorAddresses] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[VendorAddresses] Update',
  props<{ id: number; changes: Partial<VendorAddress> }>()
);
export const updateEntitySuccess = createAction(
  '[VendorAddresses] Update Success',
  props<{ id: number; changes: Partial<VendorAddress> }>()
);
export const updateEntityFailure = createAction(
  '[VendorAddresses] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[VendorAddresses] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[VendorAddresses] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[VendorAddresses] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadVendorAddressHistory = createAction(
  '[VendorAddress/API] Load VendorAddress History'
);

export const loadVendorAddressHistorySuccess = createAction(
  '[VendorAddress/API] Load VendorAddress History Success',
  props<{ history: VendorAddress[] }>()
);

export const loadVendorAddressHistoryFailure = createAction(
  '[VendorAddress/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
