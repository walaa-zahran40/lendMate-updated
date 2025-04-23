import { createAction, props } from '@ngrx/store';

export interface IdentityType {
  id: number;
  code: string;
  name: string;
  nameAR: string;
  isActive: boolean;
}

// kicked off by your component
export const loadClientIdentities = createAction(
  '[Form] Load Client Identities'
);

export const loadClientIdentitiesSuccess = createAction(
  '[Form/API] Load Client Identities Success',
  props<{ items: IdentityType[] }>()
);

export const loadClientIdentitiesFailure = createAction(
  '[Form/API] Load Client Identities Failure',
  props<{ error: any }>()
);
