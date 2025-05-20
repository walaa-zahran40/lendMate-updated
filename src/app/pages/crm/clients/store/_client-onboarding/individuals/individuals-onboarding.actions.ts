import { createAction, props } from '@ngrx/store';
import { IndividualOnboarding } from './individual-onboarding.model';

export const loadAll = createAction(
  '[IndividualOnboardings] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[IndividualOnboardings] Load All Success',
  props<{ result: IndividualOnboarding[] }>()
);

export const loadAllFailure = createAction(
  '[IndividualOnboardings] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[IndividualOnboardings] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[IndividualOnboardings] Load By Id Success',
  props<{ entity: IndividualOnboarding }>()
);
export const loadByIdFailure = createAction(
  '[IndividualOnboardings] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[IndividualOnboardings] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<IndividualOnboarding, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[IndividualOnboardings] Create Success',
  props<{ entity: IndividualOnboarding }>()
);
export const createEntityFailure = createAction(
  '[IndividualOnboardings] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[IndividualOnboardings] Update',
  props<{ id: number; changes: Partial<IndividualOnboarding> }>()
);
export const updateEntitySuccess = createAction(
  '[IndividualOnboardings] Update Success',
  props<{ id: number; changes: Partial<IndividualOnboarding> }>()
);
export const updateEntityFailure = createAction(
  '[IndividualOnboardings] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[IndividualOnboardings] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[IndividualOnboardings] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[IndividualOnboardings] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
export const clearSelectedIndividualOnboarding = createAction(
  '[IndividualOnboardings] Clear Selected'
);
