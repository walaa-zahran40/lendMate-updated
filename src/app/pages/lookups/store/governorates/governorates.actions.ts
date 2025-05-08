import { createAction, props } from '@ngrx/store';
import { Governorate } from './governorate.model';

// Load all
export const loadGovernorates = createAction('[Governorates] Load All');
export const loadGovernoratesSuccess = createAction(
  '[Governorates] Load All Success',
  props<{ items: Governorate[]; totalCount: number }>()
);
export const loadGovernoratesFailure = createAction(
  '[Governorates] Load All Failure',
  props<{ error: any }>()
);

// Load history
export const loadGovernoratesHistory = createAction(
  '[Governorates] Load History'
);
export const loadGovernoratesHistorySuccess = createAction(
  '[Governorates] Load History Success',
  props<{ history: Governorate[] }>()
);
export const loadGovernoratesHistoryFailure = createAction(
  '[Governorates] Load History Failure',
  props<{ error: any }>()
);

// Load by ID
export const loadGovernorate = createAction(
  '[Governorates] Load One',
  props<{ id: number }>()
);
export const loadGovernorateSuccess = createAction(
  '[Governorates] Load One Success',
  props<{ governorate: Governorate }>()
);
export const loadGovernorateFailure = createAction(
  '[Governorates] Load One Failure',
  props<{ error: any }>()
);

// Create
export const createGovernorate = createAction(
  '[Governorates] Create',
  props<{ data: Partial<Governorate> }>()
);
export const createGovernorateSuccess = createAction(
  '[Governorates] Create Success',
  props<{ governorate: Governorate }>()
);
export const createGovernorateFailure = createAction(
  '[Governorates] Create Failure',
  props<{ error: any }>()
);

// Update
export const updateGovernorate = createAction(
  '[Governorates] Update',
  props<{ id: number; data: Partial<Governorate> }>()
);
export const updateGovernorateSuccess = createAction(
  '[Governorates] Update Success',
  props<{ governorate: Governorate }>()
);
export const updateGovernorateFailure = createAction(
  '[Governorates] Update Failure',
  props<{ error: any }>()
);

// Delete
export const deleteGovernorate = createAction(
  '[Governorates] Delete',
  props<{ id: number }>()
);
export const deleteGovernorateSuccess = createAction(
  '[Governorates] Delete Success',
  props<{ id: number }>()
);
export const deleteGovernorateFailure = createAction(
  '[Governorates] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
