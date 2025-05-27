import { createReducer, on } from '@ngrx/store';
import * as Actions from './action-notification-groups.actions';
import { initialActionNotificationGroupsState } from './action-notification-groups.state';

export const actionNotificationGroupsReducer = createReducer(
  initialActionNotificationGroupsState,
  on(Actions.loadActionNotificationGroups, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadActionNotificationGroupsSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadActionNotificationGroupsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadActionNotificationGroupsHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadActionNotificationGroupsHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadActionNotificationGroupsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadActionNotificationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadActionNotificationGroupSuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadActionNotificationGroupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createActionNotificationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createActionNotificationGroupSuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createActionNotificationGroupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateActionNotificationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateActionNotificationGroupSuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateActionNotificationGroupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteActionNotificationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteActionNotificationGroupSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteActionNotificationGroupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadActionNotificationGroupsByClientStatusActionId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadActionNotificationGroupsByClientStatusActionIdSuccess, (state, { items }) => ({
    ...state,
    items, // replace with just these rates
    loading: false,
  })),
  on(Actions.loadActionNotificationGroupsByClientStatusActionIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
