import { createAction, props } from '@ngrx/store';
import { Officer } from './officer.model';

// Load all
export const loadOfficers = createAction('[Officers] Load All');
export const loadOfficersSuccess = createAction(
  '[Officers] Load All Success',
  props<{ items: Officer[]; totalCount: number }>()
);
export const loadOfficersFailure = createAction(
  '[Officers] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadOfficersHistory = createAction('[Officers] Load History');
export const loadOfficersHistorySuccess = createAction(
  '[Officers] Load History Success',
  props<{ history: Officer[] }>()
);
export const loadOfficersHistoryFailure = createAction(
  '[Officers] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadOfficer = createAction(
  '[Officers] Load One',
  props<{ id: number }>()
);
export const loadOfficerSuccess = createAction(
  '[Officers] Load One Success',
  props<{ Officer: Officer }>()
);
export const loadOfficerFailure = createAction(
  '[Officers] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createOfficer = createAction(
  '[Officers] Create',
  props<{ data: Partial<Officer> }>()
);
export const createOfficerSuccess = createAction(
  '[Officers] Create Success',
  props<{ Officer: Officer }>()
);
export const createOfficerFailure = createAction(
  '[Officers] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateOfficer = createAction(
  '[Officers] Update',
  props<{ id: number; data: Partial<Officer> }>()
);
export const updateOfficerSuccess = createAction(
  '[Officers] Update Success',
  props<{ Officer: Officer }>()
);
export const updateOfficerFailure = createAction(
  '[Officers] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteOfficer = createAction(
  '[Officers] Delete',
  props<{ id: number }>()
);
export const deleteOfficerSuccess = createAction(
  '[Officers] Delete Success',
  props<{ id: number }>()
);
export const deleteOfficerFailure = createAction(
  '[Officers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
