import { createAction, props } from '@ngrx/store';
import { FeeType } from './fee-type.model';

export const loadAll = createAction(
  '[FeeTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[FeeTypes] Load All Success',
  props<{ result: FeeType[] }>()
);

export const loadAllFailure = createAction(
  '[FeeTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[FeeTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[FeeTypes] Load By Id Success',
  props<{ entity: FeeType }>()
);
export const loadByIdFailure = createAction(
  '[FeeTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[FeeTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<FeeType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[FeeTypes] Create Success',
  props<{ entity: FeeType }>()
);
export const createEntityFailure = createAction(
  '[FeeTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[FeeTypes] Update',
  props<{ id: number; changes: Partial<FeeType> }>()
);
export const updateEntitySuccess = createAction(
  '[FeeTypes] Update Success',
  props<{ id: number; changes: Partial<FeeType> }>()
);
export const updateEntityFailure = createAction(
  '[FeeTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[FeeTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[FeeTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[FeeTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
