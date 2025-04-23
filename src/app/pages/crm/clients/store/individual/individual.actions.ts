import { createAction, props } from '@ngrx/store';
import { Individual } from './individual.state';

// ▶ Load all individuals (pagination if you like)
export const loadIndividuals = createAction(
  '[Individual/API] Load Individuals'
);
export const loadIndividualsSuccess = createAction(
  '[Individual/API] Load Individuals Success',
  props<{ items: Individual[]; totalCount: number }>()
);
export const loadIndividualsFailure = createAction(
  '[Individual/API] Load Individuals Failure',
  props<{ error: any }>()
);

// ▶ Load one individual
export const loadIndividual = createAction(
  '[Individual/API] Load Individual',
  props<{ id: number }>()
);
export const loadIndividualSuccess = createAction(
  '[Individual/API] Load Individual Success',
  props<{ individual: Individual }>()
);
export const loadIndividualFailure = createAction(
  '[Individual/API] Load Individual Failure',
  props<{ error: any }>()
);

// ▶ Create
export const createIndividual = createAction(
  '[Individual/API] Create Individual',
  props<{ payload: Individual }>()
);
export const createIndividualSuccess = createAction(
  '[Individual/API] Create Individual Success',
  props<{ individual: Individual }>()
);
export const createIndividualFailure = createAction(
  '[Individual/API] Create Individual Failure',
  props<{ error: any }>()
);

// ▶ Update
export const updateIndividual = createAction(
  '[Individual/API] Update Individual',
  props<{ id: number; changes: Partial<Individual> }>()
);
export const updateIndividualSuccess = createAction(
  '[Individual/API] Update Individual Success',
  props<{ individual: Individual }>()
);
export const updateIndividualFailure = createAction(
  '[Individual/API] Update Individual Failure',
  props<{ error: any }>()
);

// ▶ Delete
export const deleteIndividual = createAction(
  '[Individual/API] Delete Individual',
  props<{ id: number }>()
);
export const deleteIndividualSuccess = createAction(
  '[Individual/API] Delete Individual Success',
  props<{ id: number }>()
);
export const deleteIndividualFailure = createAction(
  '[Individual/API] Delete Individual Failure',
  props<{ error: any }>()
);
