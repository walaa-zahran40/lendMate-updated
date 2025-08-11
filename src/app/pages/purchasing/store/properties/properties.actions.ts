import { createAction, props } from '@ngrx/store';
import { Property } from './property.model';

export const loadAll = createAction(
  '[properties] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[properties] Load All Success',
  props<{ result: Property[] }>()
);

export const loadAllFailure = createAction(
  '[properties] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[properties] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[properties] Load By Id Success',
  props<{ entity: Property }>()
);
export const loadByIdFailure = createAction(
  '[properties] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[properties] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Property, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[properties] Create Success',
  props<{ entity: Property }>()
);
export const createEntityFailure = createAction(
  '[properties] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[properties] Update',
  props<{ id: number; changes: Partial<Property> }>()
);
export const updateEntitySuccess = createAction(
  '[properties] Update Success',
  props<{ id: number; changes: Partial<Property> }>()
);
export const updateEntityFailure = createAction(
  '[properties] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[properties] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[properties] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[properties] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadPropertyHistory = createAction(
  '[Property/API] Load Address Type History'
);

export const loadPropertyHistorySuccess = createAction(
  '[Property/API] Load Address Type History Success',
  props<{ history: Property[] }>()
);
export const clearSelectedClient = createAction('[properties] Clear Selected');

export const loadPropertyHistoryFailure = createAction(
  '[Property/API] Load Address Type History Failure',
  props<{ error: any }>()
);
export const loadByAssetId = createAction(
  '[properties] Load By Asset Id',
  props<{ assetId: number }>()
);

export const loadByAssetIdSuccess = createAction(
  '[properties] Load By Asset Id Success',
  props<{ entity: Property }>()
);

export const loadByAssetIdFailure = createAction(
  '[properties] Load By Asset Id Failure',
  props<{ error: any }>()
);
