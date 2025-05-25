import { createAction, props } from '@ngrx/store';
import { FeeRange } from './fee-ranges.model';

export const loadAll = createAction(
  '[FeeRanges] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[FeeRanges] Load All Success',
  props<{ result: FeeRange[] }>()
);

export const loadAllFailure = createAction(
  '[FeeRanges] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[FeeRanges] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[FeeRanges] Load By Id Success',
  props<{ entity: FeeRange }>()
);
export const loadByIdFailure = createAction(
  '[FeeRanges] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[FeeRanges] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<FeeRange, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[FeeRanges] Create Success',
  props<{ entity: FeeRange }>()
);
export const createEntityFailure = createAction(
  '[FeeRanges] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[FeeRanges] Update',
  props<{ id: number; changes: Partial<FeeRange> }>()
);
export const updateEntitySuccess = createAction(
  '[FeeRanges] Update Success',
  props<{ id: number; changes: Partial<FeeRange> }>()
);
export const updateEntityFailure = createAction(
  '[FeeRanges] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[FeeRanges] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[FeeRanges] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[FeeRanges] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
