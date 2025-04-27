import { createReducer, on } from '@ngrx/store';
import * as IdentityActions from './identity.actions';
import { ClientIdentity } from '../../../../../shared/interfaces/client-identity.interface';

export interface IdentityState {
  items: IdentityActions.IdentityType[];
  current?: ClientIdentity;
  loading: boolean;
  error: any;
}

export const initialState: IdentityState = {
  items: [],
  loading: false,
  error: null,
};

export const identityReducer = createReducer(
  initialState,

  on(IdentityActions.loadClientIdentities, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(IdentityActions.loadClientIdentitySuccess, (state, { identity }) => ({
    ...state,
    loading: false,
    current: identity,
  })),

  on(IdentityActions.loadClientIdentitiesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
