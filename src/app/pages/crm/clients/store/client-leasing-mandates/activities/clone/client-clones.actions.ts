import { createAction, props } from '@ngrx/store';
import { Clone } from './client-clone.model';

export const loadAll = createAction(
  '[ClientsClones] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[ClientsClones] Load All Success',
  props<{ result: Clone[] }>()
);

export const loadAllFailure = createAction(
  '[ClientsClones] Load All Failure',
  props<{ error: any }>()
);
export const createClone = createAction(
  '[ClientsClone] Create',
  props<{ payload: Partial<Clone> }>()
);

export const createCloneSuccess = createAction(
  '[ClientsClone] Create Success',
  props<{ clone: Clone }>()
);

export const createCloneFailure = createAction(
  '[ClientsClone] Create Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[ClientsClones] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[ClientsClones] Load By Id Success',
  props<{ entity: Clone }>()
);
export const loadByIdFailure = createAction(
  '[ClientsClones] Load By Id Failure',
  props<{ error: any }>()
);
// client-clones.actions.ts
export const loadByClientId = createAction(
  '[ClientsClones] Load By Client Id',
  props<{ id: number }>()
);
export const loadByClientIdSuccess = createAction(
  '[ClientsClones] Load By Client Id Success',
  props<{ entity: Clone }>()
);
export const loadByClientIdFailure = createAction(
  '[ClientsClones] Load By Client Id Failure',
  props<{ error: any }>()
);
export const createEntity = createAction(
  '[ClientsClones] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Clone, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[ClientsClones] Create Success',
  props<{ entity: Clone }>()
);
export const createEntityFailure = createAction(
  '[ClientsClones] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[ClientsClones] Update',
  props<{ id: number; changes: Partial<Clone> }>()
);
export const updateEntitySuccess = createAction(
  '[ClientsClones] Update Success',
  props<{ id: number; changes: Partial<Clone> }>()
);
export const updateEntityFailure = createAction(
  '[ClientsClones] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[ClientsClones] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[ClientsClones] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[ClientsClones] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
export const clearSelectedClone = createAction(
  '[ClientsClones] Clear Selected'
);
