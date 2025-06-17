import { createAction, props } from '@ngrx/store';
import { PhoneType } from './phone-type.model';

export const loadAll = createAction(
  '[PhoneTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[PhoneTypes] Load All Success',
  props<{ result: PhoneType[] }>()
);

export const loadAllFailure = createAction(
  '[PhoneTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[PhoneTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[PhoneTypes] Load By Id Success',
  props<{ entity: PhoneType }>()
);
export const loadByIdFailure = createAction(
  '[PhoneTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[PhoneTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<PhoneType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[PhoneTypes] Create Success',
  props<{ entity: PhoneType }>()
);
export const createEntityFailure = createAction(
  '[PhoneTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[PhoneTypes] Update',
  props<{ id: number; changes: Partial<PhoneType> }>()
);
export const updateEntitySuccess = createAction(
  '[PhoneTypes] Update Success',
  props<{ id: number; changes: Partial<PhoneType> }>()
);
export const updateEntityFailure = createAction(
  '[PhoneTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[PhoneTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[PhoneTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[PhoneTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadPhoneTypeHistory = createAction(
  '[PhoneType/API] Load PhoneType History'
);

export const loadPhoneTypeHistorySuccess = createAction(
  '[PhoneType/API] Load PhoneType History Success',
  props<{ history: PhoneType[] }>()
);

export const loadPhoneTypeHistoryFailure = createAction(
  '[PhoneType/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
