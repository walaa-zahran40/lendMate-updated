import { createAction, props } from '@ngrx/store';
import { VehicleModel } from './vehicle-model.model';

export const loadAll = createAction(
  '[VehicleModels] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[VehicleModels] Load All Success',
  props<{ result: VehicleModel[] }>()
);

export const loadAllFailure = createAction(
  '[VehicleModels] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[VehicleModels] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[VehicleModels] Load By Id Success',
  props<{ entity: VehicleModel }>()
);
export const loadByIdFailure = createAction(
  '[VehicleModels] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[VehicleModels] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<VehicleModel, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[VehicleModels] Create Success',
  props<{ entity: VehicleModel }>()
);
export const createEntityFailure = createAction(
  '[VehicleModels] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[VehicleModels] Update',
  props<{ id: number; changes: Partial<VehicleModel> }>()
);
export const updateEntitySuccess = createAction(
  '[VehicleModels] Update Success',
  props<{ id: number; changes: Partial<VehicleModel> }>()
);
export const updateEntityFailure = createAction(
  '[VehicleModels] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[VehicleModels] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[VehicleModels] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[VehicleModels] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadVehicleModelHistory = createAction(
  '[VehicleModel/API] Load Address Type History'
);

export const loadVehicleModelHistorySuccess = createAction(
  '[VehicleModel/API] Load Address Type History Success',
  props<{ history: VehicleModel[] }>()
);

export const loadVehicleModelHistoryFailure = createAction(
  '[VehicleModel/API] Load Address Type History Failure',
  props<{ error: any }>()
);
