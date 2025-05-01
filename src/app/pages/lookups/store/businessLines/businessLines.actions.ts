import { createAction, props } from '@ngrx/store';
import { BusinessLine } from './businessLine.model';

// Load all
export const loadBusinessLines = createAction('[BusinessLines] Load All');
export const loadBusinessLinesSuccess = createAction(
  '[BusinessLines] Load All Success',
  props<{ items: BusinessLine[]; totalCount: number }>()
);
export const loadBusinessLinesFailure = createAction(
  '[BusinessLines] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadBusinessLinesHistory = createAction(
  '[BusinessLines] Load History'
);
export const loadBusinessLinesHistorySuccess = createAction(
  '[BusinessLines] Load History Success',
  props<{ history: BusinessLine[] }>()
);
export const loadBusinessLinesHistoryFailure = createAction(
  '[BusinessLines] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadBusinessLine = createAction(
  '[BusinessLines] Load One',
  props<{ id: number }>()
);
export const loadBusinessLineSuccess = createAction(
  '[BusinessLines] Load One Success',
  props<{ businessLine: BusinessLine }>()
);
export const loadBusinessLineFailure = createAction(
  '[BusinessLines] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createBusinessLine = createAction(
  '[BusinessLines] Create',
  props<{ data: Partial<BusinessLine> }>()
);
export const createBusinessLineSuccess = createAction(
  '[BusinessLines] Create Success',
  props<{ businessLine : BusinessLine }>()
);
export const createBusinessLineFailure = createAction(
  '[BusinessLines] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateBusinessLine = createAction(
  '[BusinessLines] Update',
  props<{ id: number; data: Partial<BusinessLine> }>()
);
export const updateBusinessLineSuccess = createAction(
  '[BusinessLines] Update Success',
  props<{ businessLine : BusinessLine }>()
);
export const updateBusinessLineFailure = createAction(
  '[BusinessLines] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteBusinessLine = createAction(
  '[BusinessLines] Delete',
  props<{ id: number }>()
);
export const deleteBusinessLineSuccess = createAction(
  '[BusinessLines] Delete Success',
  props<{ id: number }>()
);
export const deleteBusinessLineFailure = createAction(
  '[BusinessLines] Delete Failure',
  props<{ error: any }>()
);
