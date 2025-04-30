import { createAction, props } from '@ngrx/store';
import { AuthorityOffice } from './authority-offices.model';

export const loadAll = createAction(
  '[AuthorityOffices] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[AuthorityOffices] Load All Success',
  props<{ result: AuthorityOffice[] }>()
);

export const loadAllFailure = createAction(
  '[AuthorityOffices] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[AuthorityOffices] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[AuthorityOffices] Load By Id Success',
  props<{ entity: AuthorityOffice }>()
);
export const loadByIdFailure = createAction(
  '[AuthorityOffices] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[AuthorityOffices] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<AuthorityOffice, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[AuthorityOffices] Create Success',
  props<{ entity: AuthorityOffice }>()
);
export const createEntityFailure = createAction(
  '[AuthorityOffices] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[AuthorityOffices] Update',
  props<{ id: number; changes: Partial<AuthorityOffice> }>()
);
export const updateEntitySuccess = createAction(
  '[AuthorityOffices] Update Success',
  props<{ id: number; changes: Partial<AuthorityOffice> }>()
);
export const updateEntityFailure = createAction(
  '[AuthorityOffices] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[AuthorityOffices] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[AuthorityOffices] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[AuthorityOffices] Delete Failure',
  props<{ error: any }>()
);
