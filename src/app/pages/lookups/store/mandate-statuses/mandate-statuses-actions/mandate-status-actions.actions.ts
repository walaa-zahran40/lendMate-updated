import { createAction, props } from '@ngrx/store';
import { MandateStatusAction } from './mandate-status-action.model';

export const loadAll = createAction(
  '[MandateStatusActions] Load All',
  props<{ pageNumber?: number }>()
);
export const loadMandateStatusActions = createAction(
  '[MandateStatusActions] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[MandateStatusActions] Load All Success',
  props<{ result: MandateStatusAction[] }>()
);

export const loadAllFailure = createAction(
  '[MandateStatusActions] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[MandateStatusActions] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[MandateStatusActions] Load By Id Success',
  props<{ entity: MandateStatusAction }>()
);
export const loadByIdFailure = createAction(
  '[MandateStatusActions] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[MandateStatusActions] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<MandateStatusAction, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[MandateStatusActions] Create Success',
  props<{ entity: MandateStatusAction }>()
);
export const createEntityFailure = createAction(
  '[MandateStatusActions] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[MandateStatusActions] Update',
  props<{ id: number; changes: Partial<MandateStatusAction> }>()
);
export const updateEntitySuccess = createAction(
  '[MandateStatusActions] Update Success',
  props<{ id: number; changes: Partial<MandateStatusAction> }>()
);
export const updateEntityFailure = createAction(
  '[MandateStatusActions] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[MandateStatusActions] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[MandateStatusActions] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[MandateStatusActions] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadMandateStatusActionHistory = createAction(
  '[MandateStatusAction/API] Load MandateStatusAction History'
);

export const loadMandateStatusActionHistorySuccess = createAction(
  '[MandateStatusAction/API] Load MandateStatusAction History Success',
  props<{ history: MandateStatusAction[] }>()
);

export const loadMandateStatusActionHistoryFailure = createAction(
  '[MandateStatusAction/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
