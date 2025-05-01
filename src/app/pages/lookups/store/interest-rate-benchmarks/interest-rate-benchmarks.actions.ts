import { createAction, props } from '@ngrx/store';
import { InterestRateBenchMark } from './interest-rate-benchmark.model';

export const loadAll = createAction(
  '[InterestRateBenchMarks] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[InterestRateBenchMarks] Load All Success',
  props<{ result: InterestRateBenchMark[] }>()
);

export const loadAllFailure = createAction(
  '[InterestRateBenchMarks] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[InterestRateBenchMarks] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[InterestRateBenchMarks] Load By Id Success',
  props<{ entity: InterestRateBenchMark }>()
);
export const loadByIdFailure = createAction(
  '[InterestRateBenchMarks] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[InterestRateBenchMarks] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<InterestRateBenchMark, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[InterestRateBenchMarks] Create Success',
  props<{ entity: InterestRateBenchMark }>()
);
export const createEntityFailure = createAction(
  '[InterestRateBenchMarks] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[InterestRateBenchMarks] Update',
  props<{ id: number; changes: Partial<InterestRateBenchMark> }>()
);
export const updateEntitySuccess = createAction(
  '[InterestRateBenchMarks] Update Success',
  props<{ id: number; changes: Partial<InterestRateBenchMark> }>()
);
export const updateEntityFailure = createAction(
  '[InterestRateBenchMarks] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[InterestRateBenchMarks] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[InterestRateBenchMarks] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[InterestRateBenchMarks] Delete Failure',
  props<{ error: any }>()
);
