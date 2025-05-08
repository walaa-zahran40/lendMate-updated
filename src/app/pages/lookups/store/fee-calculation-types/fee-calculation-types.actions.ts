import { createAction, props } from '@ngrx/store';
import { FeeCalculationType } from './fee-calculation-type.model';

export const loadAll = createAction(
  '[FeeCalculationTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[FeeCalculationTypes] Load All Success',
  props<{ result: FeeCalculationType[] }>()
);

export const loadAllFailure = createAction(
  '[FeeCalculationTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[FeeCalculationTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[FeeCalculationTypes] Load By Id Success',
  props<{ entity: FeeCalculationType }>()
);
export const loadByIdFailure = createAction(
  '[FeeCalculationTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[FeeCalculationTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<FeeCalculationType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[FeeCalculationTypes] Create Success',
  props<{ entity: FeeCalculationType }>()
);
export const createEntityFailure = createAction(
  '[FeeCalculationTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[FeeCalculationTypes] Update',
  props<{ id: number; changes: Partial<FeeCalculationType> }>()
);
export const updateEntitySuccess = createAction(
  '[FeeCalculationTypes] Update Success',
  props<{ id: number; changes: Partial<FeeCalculationType> }>()
);
export const updateEntityFailure = createAction(
  '[FeeCalculationTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[FeeCalculationTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[FeeCalculationTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[FeeCalculationTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
