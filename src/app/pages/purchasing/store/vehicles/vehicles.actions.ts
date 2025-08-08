import { createAction, props } from '@ngrx/store';
import { Vehicle } from './vehicle.model';

export const loadAll = createAction(
  '[Vehicles] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Vehicles] Load All Success',
  props<{ result: Vehicle[] }>()
);

export const loadAllFailure = createAction(
  '[Vehicles] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Vehicles] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Vehicles] Load By Id Success',
  props<{ entity: Vehicle }>()
);
export const loadByIdFailure = createAction(
  '[Vehicles] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Vehicles] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Vehicle, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Vehicles] Create Success',
  props<{ entity: Vehicle }>()
);
export const createEntityFailure = createAction(
  '[Vehicles] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Vehicles] Update',
  props<{ id: number; changes: Partial<Vehicle> }>()
);
export const updateEntitySuccess = createAction(
  '[Vehicles] Update Success',
  props<{ id: number; changes: Partial<Vehicle> }>()
);
export const updateEntityFailure = createAction(
  '[Vehicles] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Vehicles] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Vehicles] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Vehicles] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadVehicleHistory = createAction(
  '[Vehicle/API] Load Address Type History'
);

export const loadVehicleHistorySuccess = createAction(
  '[Vehicle/API] Load Address Type History Success',
  props<{ history: Vehicle[] }>()
);
export const clearSelectedClient = createAction('[Vehicles] Clear Selected');

export const loadVehicleHistoryFailure = createAction(
  '[Vehicle/API] Load Address Type History Failure',
  props<{ error: any }>()
);
