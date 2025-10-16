import { createAction, props } from '@ngrx/store';
import { Sector } from './sector.model';

export const loadAll = createAction(
  '[Sectors] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllSuccess = createAction(
  '[Sectors] Load All Success',
  props<{ result: Sector[] }>()
);

export const loadAllFailure = createAction(
  '[Sectors] Load All Failure',
  props<{ error: any }>()
);

export const loadById = createAction(
  '[Sectors] Load By Id',
  props<{ id: number }>()
);
export const loadByIdSuccess = createAction(
  '[Sectors] Load By Id Success',
  props<{ entity: Sector }>()
);
export const loadByIdFailure = createAction(
  '[Sectors] Load By Id Failure',
  props<{ error: any }>()
);

export const createEntity = createAction(
  '[Sectors] Create',
  // allow all fields except id, but all optional
  props<{ payload: Partial<Omit<Sector, 'id'>> }>()
);
export const createEntitySuccess = createAction(
  '[Sectors] Create Success',
  props<{ entity: Sector }>()
);
export const createEntityFailure = createAction(
  '[Sectors] Create Failure',
  props<{ error: any }>()
);

export const updateEntity = createAction(
  '[Sectors] Update',
  props<{ id: number; changes: Partial<Sector> }>()
);
export const updateEntitySuccess = createAction(
  '[Sectors] Update Success',
  props<{ id: number; changes: Partial<Sector> }>()
);
export const updateEntityFailure = createAction(
  '[Sectors] Update Failure',
  props<{ error: any }>()
);

export const deleteEntity = createAction(
  '[Sectors] Delete',
  props<{ id: number }>()
);
export const deleteEntitySuccess = createAction(
  '[Sectors] Delete Success',
  props<{ id: number }>()
);
export const deleteEntityFailure = createAction(
  '[Sectors] Delete Failure',
  props<{ error: any }>()
);
export const entityOperationSuccess = createAction(
  '[Entity] Operation Success',
  props<{ entity: string; operation: 'create' | 'update' | 'delete' }>()
);
//History actions
export const loadSectorHistory = createAction(
  '[Sector/API] Load Sector History'
);

export const loadSectorHistorySuccess = createAction(
  '[Sector/API] Load Sector History Success',
  props<{ history: Sector[] }>()
);

export const loadSectorHistoryFailure = createAction(
  '[Sector/API] Load CompanyFlowType History Failure',
  props<{ error: any }>()
);
