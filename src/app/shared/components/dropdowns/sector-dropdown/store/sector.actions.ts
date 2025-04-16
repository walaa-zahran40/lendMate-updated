import { createAction, props } from '@ngrx/store';

export const loadSectors = createAction('[Sector] Load Sectors');
export const loadSectorsSuccess = createAction(
  '[Sector] Load Sectors Success',
  props<{ sectors: any[] }>()
);
export const loadSectorsFailure = createAction(
  '[Sector] Load Sectors Failure',
  props<{ error: any }>()
);
export const loadSectorById = createAction(
  '[Sector] Load Sector By Id',
  props<{ id: number }>()
);

export const loadSectorByIdSuccess = createAction(
  '[Sector] Load Sector By Id Success',
  props<{ sector: any }>()
);

export const loadSectorByIdFailure = createAction(
  '[Sector] Load Sector By Id Failure',
  props<{ error: any }>()
);
