import { createAction, props } from '@ngrx/store';
import { Individual } from '../../../../../shared/app.state';

// 🟡 Load individual for editing
export const loadIndividual = createAction(
  '[Individual] Load Individual',
  props<{ id: number }>()
);

export const loadIndividualSuccess = createAction(
  '[Individual] Load Individual Success',
  props<{ individual: Individual }>()
);

export const loadIndividualFailure = createAction(
  '[Individual] Load Individual Failure',
  props<{ error: any }>()
);

// 🟢 Save or update individual
export const saveIndividual = createAction(
  '[Individual] Save Individual',
  props<{ individual: Partial<Individual> }>()
);

export const saveIndividualSuccess = createAction(
  '[Individual] Save Individual Success',
  props<{ individual: Individual }>()
);

export const saveIndividualFailure = createAction(
  '[Individual] Save Individual Failure',
  props<{ error: any }>()
);
