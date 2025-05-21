import { createAction, props } from '@ngrx/store';
import { ClientOnboarding } from './client-onboarding.model';

export const loadAll = createAction(
  '[ClientsOnboarding] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[ClientsOnboarding] Load All Success',
  props<{ result: ClientOnboarding[] }>()
);

export const loadAllFailure = createAction(
  '[ClientsOnboarding] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[ClientsOnboarding] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[ClientsOnboarding] Load By Id Success',
  props<{ entity: ClientOnboarding }>()
);
export const loadByIdFailure = createAction(
  '[ClientsOnboarding] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[ClientsOnboarding] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<ClientOnboarding, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[ClientsOnboarding] Create Success',
  props<{ entity: ClientOnboarding }>()
);
export const createEntityFailure = createAction(
  '[ClientsOnboarding] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[ClientsOnboarding] Update',
  props<{ id: number; changes: Partial<ClientOnboarding> }>()
);
export const updateEntitySuccess = createAction(
  '[ClientsOnboarding] Update Success',
  props<{ id: number; changes: Partial<ClientOnboarding> }>()
);
export const updateEntityFailure = createAction(
  '[ClientsOnboarding] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[ClientsOnboarding] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[ClientsOnboarding] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[ClientsOnboarding] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
export const clearSelectedClientOnboarding = createAction(
  '[ClientsOnboarding] Clear Selected'
);
