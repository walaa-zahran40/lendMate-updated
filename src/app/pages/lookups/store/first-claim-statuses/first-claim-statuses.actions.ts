import { createAction, props } from '@ngrx/store';
import { FirstClaimStatus } from './first-claim-status.model';

export const loadAll = createAction(
  '[FirstClaimStatuses] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[FirstClaimStatuses] Load All Success',
  props<{ result: FirstClaimStatus[] }>()
);

export const loadAllFailure = createAction(
  '[FirstClaimStatuses] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[FirstClaimStatuses] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[FirstClaimStatuses] Load By Id Success',
  props<{ entity: FirstClaimStatus }>()
);
export const loadByIdFailure = createAction(
  '[FirstClaimStatuses] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[FirstClaimStatuses] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<FirstClaimStatus, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[FirstClaimStatuses] Create Success',
  props<{ entity: FirstClaimStatus }>()
);
export const createEntityFailure = createAction(
  '[FirstClaimStatuses] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[FirstClaimStatuses] Update',
  props<{ id: number; changes: Partial<FirstClaimStatus> }>()
);
export const updateEntitySuccess = createAction(
  '[FirstClaimStatuses] Update Success',
  props<{ id: number; changes: Partial<FirstClaimStatus> }>()
);
export const updateEntityFailure = createAction(
  '[FirstClaimStatuses] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[FirstClaimStatuses] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[FirstClaimStatuses] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[FirstClaimStatuses] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadFirstClaimStatusHistory = createAction(
  '[FirstClaimStatus/API] Load Address Type History'
);

export const loadFirstClaimStatusHistorySuccess = createAction(
  '[FirstClaimStatus/API] Load Address Type History Success',
  props<{ history: FirstClaimStatus[] }>()
);

export const loadFirstClaimStatusHistoryFailure = createAction(
  '[FirstClaimStatus/API] Load Address Type History Failure',
  props<{ error: any }>()
);
