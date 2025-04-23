import { createReducer, on } from '@ngrx/store';
import * as IdentityActions from './identity.actions';

export interface IdentityState {
  items: IdentityActions.IdentityType[];
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

  on(IdentityActions.loadClientIdentitiesSuccess, (state, { items }) => ({
    ...state,
    loading: false,
    items,
  })),

  on(IdentityActions.loadClientIdentitiesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
