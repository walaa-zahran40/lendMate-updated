import { createAction, props } from '@ngrx/store';
import { SubSector } from './sub-sector.model';

export const loadAll = createAction(
  '[SubSectors] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[SubSectors] Load All Success',
  props<{ result: SubSector[] }>()
);

export const loadAllFailure = createAction(
  '[SubSectors] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[SubSectors] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[SubSectors] Load By Id Success',
  props<{ entity: SubSector }>()
);
export const loadByIdFailure = createAction(
  '[SubSectors] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[SubSectors] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<SubSector, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[SubSectors] Create Success',
  props<{ entity: SubSector }>()
);
export const createEntityFailure = createAction(
  '[SubSectors] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[SubSectors] Update',
  props<{ id: number; changes: Partial<SubSector> }>()
);
export const updateEntitySuccess = createAction(
  '[SubSectors] Update Success',
  props<{ id: number; changes: Partial<SubSector> }>()
);
export const updateEntityFailure = createAction(
  '[SubSectors] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[SubSectors] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[SubSectors] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[SubSectors] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
