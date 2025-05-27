import { createReducer, on } from '@ngrx/store';
import * as Actions from './action-authorization-groups.actions';
import { initialActionAuthorizationGroupsState } from './action-authorization-groups.state';

export const actionAuthorizationGroupsReducer = createReducer(
  initialActionAuthorizationGroupsState,
  on(Actions.loadActionAuthorizationGroups, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadActionAuthorizationGroupsSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadActionAuthorizationGroupsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadActionAuthorizationGroupsHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadActionAuthorizationGroupsHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadActionAuthorizationGroupsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadActionAuthorizationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadActionAuthorizationGroupSuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadActionAuthorizationGroupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createActionAuthorizationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createActionAuthorizationGroupSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createActionAuthorizationGroupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateActionAuthorizationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateActionAuthorizationGroupSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateActionAuthorizationGroupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteActionAuthorizationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteActionAuthorizationGroupSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteActionAuthorizationGroupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadActionAuthorizationGroupsByClientStatusActionId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadActionAuthorizationGroupsByClientStatusActionIdSuccess, (state, { items }) => ({
    ...state,
    items, // replace with just these rates
    loading: false,
  })),
  on(Actions.loadActionAuthorizationGroupsByClientStatusActionIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
