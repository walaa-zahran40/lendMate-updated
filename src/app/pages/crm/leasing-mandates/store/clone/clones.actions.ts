import { createAction, props } from '@ngrx/store';
import { Clone } from './clone.model';

export const loadAll = createAction(
  '[Clones] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Clones] Load All Success',
  props<{ result: Clone[] }>()
);

export const loadAllFailure = createAction(
  '[Clones] Load All Failure',
  props<{ error: any }>()
);
export const createClone = createAction(
  '[Clone] Create',
  props<{ payload: Partial<Clone> }>()
);

export const createCloneSuccess = createAction(
  '[Clone] Create Success',
  props<{ clone: Clone }>()
);

export const createCloneFailure = createAction(
  '[Clone] Create Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Clones] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Clones] Load By Id Success',
  props<{ entity: Clone }>()
);
export const loadByIdFailure = createAction(
  '[Clones] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Clones] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Clone, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Clones] Create Success',
  props<{ entity: Clone }>()
);
export const createEntityFailure = createAction(
  '[Clones] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Clones] Update',
  props<{ id: number; changes: Partial<Clone> }>()
);
export const updateEntitySuccess = createAction(
  '[Clones] Update Success',
  props<{ id: number; changes: Partial<Clone> }>()
);
export const updateEntityFailure = createAction(
  '[Clones] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Clones] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Clones] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Clones] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
export const clearSelectedClone = createAction('[Clones] Clear Selected');
