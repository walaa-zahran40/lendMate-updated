import { createAction, props } from '@ngrx/store';

export const loadTMLOfficers = createAction(
  '[Client TML Officers] Load TML Officers',
  props<{ clientId: number }>()
);
export const loadTMLOfficersSuccess = createAction(
  '[Client TML Officers] Load TML Officers Success',
  props<{ items: any[] }>()
);
export const loadTMLOfficersFailure = createAction(
  '[Client TML Officers] Load TML Officers Failure',
  props<{ error: any }>()
);

export const createTMLOfficer = createAction(
  '[Client TML Officers] Create TML Officer',
  props<{ officer: any }>()
);
export const createTMLOfficerSuccess = createAction(
  '[Client TML Officers] Create TML Officer Success',
  props<{ officer: any }>()
);
export const createTMLOfficerFailure = createAction(
  '[Client TML Officers] Create TML Officer Failure',
  props<{ error: any }>()
);

export const updateTMLOfficer = createAction(
  '[Client TML Officers] Update TML Officer',
  props<{ id: number; officer: any }>()
);
export const updateTMLOfficerSuccess = createAction(
  '[Client TML Officers] Update TML Officer Success',
  props<{ officer: any }>()
);
export const updateTMLOfficerFailure = createAction(
  '[Client TML Officers] Update TML Officer Failure',
  props<{ error: any }>()
);

export const deleteTMLOfficer = createAction(
  '[Client TML Officers] Delete TML Officer',
  props<{ id: number }>()
);
export const deleteTMLOfficerSuccess = createAction(
  '[Client TML Officers] Delete TML Officer Success',
  props<{ id: number }>()
);
export const deleteTMLOfficerFailure = createAction(
  '[Client TML Officers] Delete TML Officer Failure',
  props<{ error: any }>()
);

export const loadTMLOfficersHistory = createAction(
  '[Client TML Officers] Load TML Officers History'
);
export const loadTMLOfficersHistorySuccess = createAction(
  '[Client TML Officers] Load TML Officers History Success',
  props<{ history: any[] }>()
);
export const loadTMLOfficersHistoryFailure = createAction(
  '[Client TML Officers] Load TML Officers History Failure',
  props<{ error: any }>()
);
