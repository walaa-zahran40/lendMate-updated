import { createAction, props } from '@ngrx/store';
import { DocType } from './doc-type.model';

export const loadAll = createAction(
  '[DocTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[DocTypes] Load All Success',
  props<{ result: DocType[] }>()
);

export const loadAllFailure = createAction(
  '[DocTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[DocTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[DocTypes] Load By Id Success',
  props<{ entity: DocType }>()
);
export const loadByIdFailure = createAction(
  '[DocTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[DocTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<DocType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[DocTypes] Create Success',
  props<{ entity: DocType }>()
);
export const createEntityFailure = createAction(
  '[DocTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[DocTypes] Update',
  props<{ id: number; changes: Partial<DocType> }>()
);
export const updateEntitySuccess = createAction(
  '[DocTypes] Update Success',
  props<{ id: number; changes: Partial<DocType> }>()
);
export const updateEntityFailure = createAction(
  '[DocTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[DocTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[DocTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[DocTypes] Delete Failure',
  props<{ error: any }>()
);
