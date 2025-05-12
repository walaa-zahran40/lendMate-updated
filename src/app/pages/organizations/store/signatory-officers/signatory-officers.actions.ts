import { createAction, props } from '@ngrx/store';
import { SignatoryOfficer } from './signatory-officer.model';

export const loadAll = createAction(
  '[SignatoryOfficers] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[SignatoryOfficers] Load All Success',
  props<{ result: SignatoryOfficer[] }>()
);

export const loadAllFailure = createAction(
  '[SignatoryOfficers] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[SignatoryOfficers] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[SignatoryOfficers] Load By Id Success',
  props<{ entity: SignatoryOfficer }>()
);
export const loadByIdFailure = createAction(
  '[SignatoryOfficers] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[SignatoryOfficers] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<SignatoryOfficer, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[SignatoryOfficers] Create Success',
  props<{ entity: SignatoryOfficer }>()
);
export const createEntityFailure = createAction(
  '[SignatoryOfficers] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[SignatoryOfficers] Update',
  props<{ id: number; changes: Partial<SignatoryOfficer> }>()
);
export const updateEntitySuccess = createAction(
  '[SignatoryOfficers] Update Success',
  props<{ id: number; changes: Partial<SignatoryOfficer> }>()
);
export const updateEntityFailure = createAction(
  '[SignatoryOfficers] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[SignatoryOfficers] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[SignatoryOfficers] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[SignatoryOfficers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
