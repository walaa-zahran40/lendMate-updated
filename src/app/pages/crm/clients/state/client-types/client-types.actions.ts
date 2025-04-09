import { createAction, props } from '@ngrx/store';

export const loadClientTypes = createAction('[ClientTypes] Load Client Types');

export const loadClientTypesSuccess = createAction(
  '[ClientTypes] Load Client Types Success',
  props<{ types: any[] }>()
);

export const loadClientTypesFailure = createAction(
  '[ClientTypes] Load Client Types Failure',
  props<{ error: any }>()
);
export const updateSubSectorList = createAction(
  '[Client Form] Update SubSector List',
  props<{ subSectorIds: number[] }>()
);
