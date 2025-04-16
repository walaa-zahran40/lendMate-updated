import { createAction, props } from '@ngrx/store';

export const loadSectors = createAction('[Sector] Load Sectors');
export const loadSectorsSuccess = createAction('[Sector] Load Sectors Success', props<{ sectors: any[] }>());
export const loadSectorsFailure = createAction('[Sector] Load Sectors Failure', props<{ error: any }>());