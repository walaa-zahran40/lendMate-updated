import { createAction, props } from '@ngrx/store';

export const loadSubSectors = createAction('[Sector] Load Sectors');
export const loadSubSectorsSuccess = createAction(
  '[Sub Sector] Load Sub Sectors Success',
  props<{ subSectors: any[] }>()
);
export const loadSubSectorsFailure = createAction(
  '[Sub Sector] Load Sub Sectors Failure',
  props<{ error: any }>()
);
export const loadSubSectorById = createAction(
  '[Sub Sector] Load Sub Sector By Id',
  props<{ id: number }>()
);

export const loadSubSectorsByIdSuccess = createAction(
  '[Sub Sector] Load Sub Sector By Id Success',
  props<{ subSector: any }>()
);

export const loadSubSectorsByIdFailure = createAction(
  '[Sub Sector] Load Sub Sector By Id Failure',
  props<{ error: any }>()
);
