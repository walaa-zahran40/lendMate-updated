import { createReducer, on } from '@ngrx/store';
import * as Actions from './role-claims.actions';
import { initialRoleClaimsState } from './role-claims.state';

export const roleClaimsReducer = createReducer(
  initialRoleClaimsState,
  on(Actions.loadRoleClaims, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadRoleClaimsSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadRoleClaimsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadRoleClaimsHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadRoleClaimsHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadRoleClaimsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadRoleClaim, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadRoleClaimSuccess, (state, { role }) => ({
    ...state,
    current: role,
    loading: false,
  })),
  on(Actions.loadRoleClaimFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createRoleClaim, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createRoleClaimSuccess, (state, { role }) => ({
    ...state,
    items: [...state.items, role],
    loading: false,
  })),
  on(Actions.createRoleClaimFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateRoleClaim, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateRoleClaimSuccess, (state, { role }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === role.id ? role : ct)),
    loading: false,
  })),
  on(Actions.updateRoleClaimFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteRoleClaim, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteRoleClaimSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteRoleClaimFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadRoleClaimsByRoleId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadRoleClaimsByRoleIdSuccess, (state, { items }) => ({
    ...state,
    items, // replace with just these rates
    loading: false,
  })),
  on(Actions.loadRoleClaimsByRoleIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
