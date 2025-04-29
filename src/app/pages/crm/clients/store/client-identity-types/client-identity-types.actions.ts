// client-identity-types.actions.ts
import { createAction, props } from '@ngrx/store';
import { ClientIdentityType } from './client-identity-type.model';

export const loadAllClientIdentityTypes = createAction(
  '[ClientIdentityTypes/API] Load All',
  props<{ pageNumber?: number }>()
);
export const loadAllClientIdentityTypesSuccess = createAction(
  '[ClientIdentityTypes/API] Load All Success',
  props<{ items: ClientIdentityType[]; totalCount: number }>()
);
export const loadAllClientIdentityTypesFailure = createAction(
  '[ClientIdentityTypes/API] Load All Failure',
  props<{ error: any }>()
);
