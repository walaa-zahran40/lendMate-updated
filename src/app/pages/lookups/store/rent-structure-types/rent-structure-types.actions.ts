import { createAction, props } from '@ngrx/store';
import { RentStructureType } from './rent-structure-type.model';

export const loadAll = createAction(
  '[RentStructureTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[RentStructureTypes] Load All Success',
  props<{ result: RentStructureType[] }>()
);

export const loadAllFailure = createAction(
  '[RentStructureTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[RentStructureTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[RentStructureTypes] Load By Id Success',
  props<{ entity: RentStructureType }>()
);
export const loadByIdFailure = createAction(
  '[RentStructureTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[RentStructureTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<RentStructureType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[RentStructureTypes] Create Success',
  props<{ entity: RentStructureType }>()
);
export const createEntityFailure = createAction(
  '[RentStructureTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[RentStructureTypes] Update',
  props<{ id: number; changes: Partial<RentStructureType> }>()
);
export const updateEntitySuccess = createAction(
  '[RentStructureTypes] Update Success',
  props<{ id: number; changes: Partial<RentStructureType> }>()
);
export const updateEntityFailure = createAction(
  '[RentStructureTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[RentStructureTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[RentStructureTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[RentStructureTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadRentStructureTypeHistory = createAction(
  '[RentStructureType/API] Load RentStructureType History'
);

export const loadRentStructureTypeHistorySuccess = createAction(
  '[RentStructureType/API] Load RentStructureType History Success',
  props<{ history: RentStructureType[] }>()
);

export const loadRentStructureTypeHistoryFailure = createAction(
  '[RentStructureType/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
