import { createAction, props } from '@ngrx/store';
import { InterestType } from './interest-type.model';

export const loadAll = createAction(
  '[InterestTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[InterestTypes] Load All Success',
  props<{ result: InterestType[] }>()
);

export const loadAllFailure = createAction(
  '[InterestTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[InterestTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[InterestTypes] Load By Id Success',
  props<{ entity: InterestType }>()
);
export const loadByIdFailure = createAction(
  '[InterestTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[InterestTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<InterestType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[InterestTypes] Create Success',
  props<{ entity: InterestType }>()
);
export const createEntityFailure = createAction(
  '[InterestTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[InterestTypes] Update',
  props<{ id: number; changes: Partial<InterestType> }>()
);
export const updateEntitySuccess = createAction(
  '[InterestTypes] Update Success',
  props<{ id: number; changes: Partial<InterestType> }>()
);
export const updateEntityFailure = createAction(
  '[InterestTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[InterestTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[InterestTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[InterestTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadInterestTypeHistory = createAction(
  '[InterestType/API] Load InterestType History'
);

export const loadInterestTypeHistorySuccess = createAction(
  '[InterestType/API] Load InterestType History Success',
  props<{ history: InterestType[] }>()
);

export const loadInterestTypeHistoryFailure = createAction(
  '[InterestType/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
