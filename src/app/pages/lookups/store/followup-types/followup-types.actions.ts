import { createAction, props } from '@ngrx/store';
import { FollowupType } from './folllowup-type.model';

export const loadAll = createAction(
  '[FollowupTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[FollowupTypes] Load All Success',
  props<{ result: FollowupType[] }>()
);

export const loadAllFailure = createAction(
  '[FollowupTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[FollowupTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[FollowupTypes] Load By Id Success',
  props<{ entity: FollowupType }>()
);
export const loadByIdFailure = createAction(
  '[FollowupTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[FollowupTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<FollowupType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[FollowupTypes] Create Success',
  props<{ entity: FollowupType }>()
);
export const createEntityFailure = createAction(
  '[FollowupTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[FollowupTypes] Update',
  props<{ id: number; changes: Partial<FollowupType> }>()
);
export const updateEntitySuccess = createAction(
  '[FollowupTypes] Update Success',
  props<{ id: number; changes: Partial<FollowupType> }>()
);
export const updateEntityFailure = createAction(
  '[FollowupTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[FollowupTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[FollowupTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[FollowupTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadFollowUpTypeHistory = createAction(
  '[FollowUpType/API] Load FollowUpType History'
);

export const loadFollowUpTypeHistorySuccess = createAction(
  '[FollowUpType/API] Load FollowUpType History Success',
  props<{ history: FollowupType[] }>()
);

export const loadFollowUpTypeHistoryFailure = createAction(
  '[FollowUpType/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
