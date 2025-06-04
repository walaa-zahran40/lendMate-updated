import { createReducer, on } from '@ngrx/store';
import * as Actions from './action-notification-groups.actions';
import { initialActionNotificationGroupsState } from './action-notification-groups.state';

export const mandateActionNotificationGroupsReducer = createReducer(
  initialActionNotificationGroupsState,
  on(Actions.loadMandateActionNotificationGroups, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadMandateActionNotificationGroupsSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadMandateActionNotificationGroupsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadMandateActionNotificationGroupsHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadMandateActionNotificationGroupsHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadMandateActionNotificationGroupsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadMandateActionNotificationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadMandateActionNotificationGroupSuccess, (state, { mandate }) => ({
    ...state,
    current: mandate,
    loading: false,
  })),
  on(Actions.loadMandateActionNotificationGroupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createMandateActionNotificationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createMandateActionNotificationGroupSuccess, (state, { mandate }) => ({
    ...state,
    items: [...state.items, mandate],
    loading: false,
  })),
  on(Actions.createMandateActionNotificationGroupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateMandateActionNotificationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateMandateActionNotificationGroupSuccess, (state, { mandate }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === mandate.id ? mandate : ct)),
    loading: false,
  })),
  on(Actions.updateMandateActionNotificationGroupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteMandateActionNotificationGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteMandateActionNotificationGroupSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteMandateActionNotificationGroupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadMandateActionNotificationGroupsByMandateStatusActionId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadMandateActionNotificationGroupsByMandateStatusActionIdSuccess, (state, { items }) => ({
    ...state,
    items, // replace with just these rates
    loading: false,
  })),
  on(Actions.loadMandateActionNotificationGroupsByMandateStatusActionIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
