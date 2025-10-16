import { createAction, props } from '@ngrx/store';
import { MandateValidityUnit } from './mandate-validity-unit.model';

export const loadAll = createAction(
  '[MandateValidityUnits] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[MandateValidityUnits] Load All Success',
  props<{ result: MandateValidityUnit[] }>()
);

export const loadAllFailure = createAction(
  '[MandateValidityUnits] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[MandateValidityUnits] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[MandateValidityUnits] Load By Id Success',
  props<{ entity: MandateValidityUnit }>()
);
export const loadByIdFailure = createAction(
  '[MandateValidityUnits] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[MandateValidityUnits] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<MandateValidityUnit, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[MandateValidityUnits] Create Success',
  props<{ entity: MandateValidityUnit }>()
);
export const createEntityFailure = createAction(
  '[MandateValidityUnits] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[MandateValidityUnits] Update',
  props<{ id: number; changes: Partial<MandateValidityUnit> }>()
);
export const updateEntitySuccess = createAction(
  '[MandateValidityUnits] Update Success',
  props<{ id: number; changes: Partial<MandateValidityUnit> }>()
);
export const updateEntityFailure = createAction(
  '[MandateValidityUnits] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[MandateValidityUnits] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[MandateValidityUnits] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[MandateValidityUnits] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadMandateValidityUnitHistory = createAction(
  '[MandateValidityUnit/API] Load MandateValidityUnit History'
);

export const loadMandateValidityUnitHistorySuccess = createAction(
  '[MandateValidityUnit/API] Load MandateValidityUnit History Success',
  props<{ history: MandateValidityUnit[] }>()
);

export const loadMandateValidityUnitHistoryFailure = createAction(
  '[MandateValidityUnit/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
