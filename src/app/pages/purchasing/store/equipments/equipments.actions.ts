import { createAction, props } from '@ngrx/store';
import { Equipment } from './equipment.model';

export const loadAll = createAction(
  '[Equipments] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Equipments] Load All Success',
  props<{ result: Equipment[] }>()
);

export const loadAllFailure = createAction(
  '[Equipments] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Equipments] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Equipments] Load By Id Success',
  props<{ entity: Equipment }>()
);
export const loadByIdFailure = createAction(
  '[Equipments] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Equipments] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Equipment, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Equipments] Create Success',
  props<{ entity: Equipment }>()
);
export const createEntityFailure = createAction(
  '[Equipments] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Equipments] Update',
  props<{ id: number; changes: Partial<Equipment> }>()
);
export const updateEntitySuccess = createAction(
  '[Equipments] Update Success',
  props<{ id: number; changes: Partial<Equipment> }>()
);
export const updateEntityFailure = createAction(
  '[Equipments] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Equipments] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Equipments] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Equipments] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadEquipmentHistory = createAction(
  '[Equipment/API] Load Address Type History'
);

export const loadEquipmentHistorySuccess = createAction(
  '[Equipment/API] Load Address Type History Success',
  props<{ history: Equipment[] }>()
);
export const clearSelectedClient = createAction('[Equipments] Clear Selected');

export const loadEquipmentHistoryFailure = createAction(
  '[Equipment/API] Load Address Type History Failure',
  props<{ error: any }>()
);
