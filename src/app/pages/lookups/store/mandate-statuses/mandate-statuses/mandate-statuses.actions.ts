import { createAction, props } from '@ngrx/store';
import { MandateStatus } from './mandate-status.model';

// Load all
export const loadMandateStatuses = createAction('[MandateStatuses] Load All');
export const loadMandateStatusesSuccess = createAction(
  '[MandateStatuses] Load All Success',
  props<{ items: MandateStatus[]; totalCount: number }>()
);
export const loadMandateStatusesFailure = createAction(
  '[MandateStatuses] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadMandateStatusesHistory = createAction(
  '[MandateStatuses] Load History'
);
export const loadMandateStatusesHistorySuccess = createAction(
  '[MandateStatuses] Load History Success',
  props<{ history: MandateStatus[] }>()
);
export const loadMandateStatusesHistoryFailure = createAction(
  '[MandateStatuses] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadMandateStatus = createAction(
  '[MandateStatuses] Load One',
  props<{ id: number }>()
);
export const loadMandateStatusSuccess = createAction(
  '[MandateStatuses] Load One Success',
  props<{ MandateStatus: MandateStatus }>()
);
export const loadMandateStatusFailure = createAction(
  '[MandateStatuses] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createMandateStatus = createAction(
  '[MandateStatuses] Create',
  props<{ data: Partial<MandateStatus> }>()
);
export const createMandateStatusSuccess = createAction(
  '[MandateStatuses] Create Success',
  props<{ MandateStatus: MandateStatus }>()
);
export const createMandateStatusFailure = createAction(
  '[MandateStatuses] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateMandateStatus = createAction(
  '[MandateStatuses] Update',
  props<{ id: number; data: Partial<MandateStatus> }>()
);
export const updateMandateStatusSuccess = createAction(
  '[MandateStatuses] Update Success',
  props<{ MandateStatus: MandateStatus }>()
);
export const updateMandateStatusFailure = createAction(
  '[MandateStatuses] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteMandateStatus = createAction(
  '[MandateStatuses] Delete',
  props<{ id: number }>()
);
export const deleteMandateStatusSuccess = createAction(
  '[MandateStatuses] Delete Success',
  props<{ id: number }>()
);
export const deleteMandateStatusFailure = createAction(
  '[MandateStatuses] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadMandateStatusHistory = createAction(
  '[MandateStatus/API] Load MandateStatus History'
);

export const loadMandateStatusHistorySuccess = createAction(
  '[MandateStatus/API] Load MandateStatus History Success',
  props<{ history: MandateStatus[] }>()
);

export const loadMandateStatusHistoryFailure = createAction(
  '[MandateStatus/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
