import { createAction, props } from '@ngrx/store';
import { VehicleManufacturer } from './vehicle-manufacturer.model';

export const loadAll = createAction(
  '[VehicleManufacturers] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[VehicleManufacturers] Load All Success',
  props<{ result: VehicleManufacturer[] }>()
);

export const loadAllFailure = createAction(
  '[VehicleManufacturers] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[VehicleManufacturers] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[VehicleManufacturers] Load By Id Success',
  props<{ entity: VehicleManufacturer }>()
);
export const loadByIdFailure = createAction(
  '[VehicleManufacturers] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[VehicleManufacturers] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<VehicleManufacturer, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[VehicleManufacturers] Create Success',
  props<{ entity: VehicleManufacturer }>()
);
export const createEntityFailure = createAction(
  '[VehicleManufacturers] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[VehicleManufacturers] Update',
  props<{ id: number; changes: Partial<VehicleManufacturer> }>()
);
export const updateEntitySuccess = createAction(
  '[VehicleManufacturers] Update Success',
  props<{ id: number; changes: Partial<VehicleManufacturer> }>()
);
export const updateEntityFailure = createAction(
  '[VehicleManufacturers] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[VehicleManufacturers] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[VehicleManufacturers] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[VehicleManufacturers] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadVehicleManufacturerHistory = createAction(
  '[VehicleManufacturer/API] Load Address Type History'
);

export const loadVehicleManufacturerHistorySuccess = createAction(
  '[VehicleManufacturer/API] Load Address Type History Success',
  props<{ history: VehicleManufacturer[] }>()
);

export const loadVehicleManufacturerHistoryFailure = createAction(
  '[VehicleManufacturer/API] Load Address Type History Failure',
  props<{ error: any }>()
);
