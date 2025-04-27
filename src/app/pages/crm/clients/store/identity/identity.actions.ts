import { createAction, props } from '@ngrx/store';
import { ClientIdentity } from '../../../../../shared/interfaces/client-identity.interface';

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
export const loadClientIdentity = createAction(
  '[Form/API] Load Client Identity',
  props<{ clientId: number }>()
);
export const loadClientIdentitySuccess = createAction(
  '[Form/API] Load Client Identity Success',
  props<{ identity: ClientIdentity }>()
);
export const loadClientIdentityFailure = createAction(
  '[Form/API] Load Client Identity Failure',
  props<{ error: any }>()
);
export const loadClientIdentitiesSuccess = createAction(
  '[Form/API] Load Client Identities Success',
  props<{ items: IdentityType[] }>()
);

export const loadClientIdentitiesFailure = createAction(
  '[Form/API] Load Client Identities Failure',
  props<{ error: any }>()
);
