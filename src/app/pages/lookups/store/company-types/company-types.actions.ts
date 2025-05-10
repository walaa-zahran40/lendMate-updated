import { createAction, props } from '@ngrx/store';
import { CompanyType } from './company-type.model';

export const loadAll = createAction(
  '[CompanyTypes] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[CompanyTypes] Load All Success',
  props<{ result: CompanyType[] }>()
);

export const loadAllFailure = createAction(
  '[CompanyTypes] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[CompanyTypes] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[CompanyTypes] Load By Id Success',
  props<{ entity: CompanyType }>()
);
export const loadByIdFailure = createAction(
  '[CompanyTypes] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[CompanyTypes] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<CompanyType, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[CompanyTypes] Create Success',
  props<{ entity: CompanyType }>()
);
export const createEntityFailure = createAction(
  '[CompanyTypes] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[CompanyTypes] Update',
  props<{ id: number; changes: Partial<CompanyType> }>()
);
export const updateEntitySuccess = createAction(
  '[CompanyTypes] Update Success',
  props<{ id: number; changes: Partial<CompanyType> }>()
);
export const updateEntityFailure = createAction(
  '[CompanyTypes] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[CompanyTypes] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[CompanyTypes] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[CompanyTypes] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
