import { createReducer, on } from '@ngrx/store';
import * as Actions from './followups.actions';
import { initialFollowupsState } from './followups.state';

export const followupsReducer = createReducer(
  initialFollowupsState,
  on(Actions.loadFollowups, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadFollowupsSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadFollowupsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadFollowupsHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadFollowupsHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadFollowupsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadFollowup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadFollowupSuccess, (state, { communication }) => ({
    ...state,
    current: communication,
    loading: false,
  })),
  on(Actions.loadFollowupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createFollowup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createFollowupSuccess, (state, { communication }) => ({
    ...state,
    items: [...state.items, communication],
    loading: false,
  })),
  on(Actions.createFollowupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateFollowup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateFollowupSuccess, (state, { communication }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === communication.id ? communication : ct
    ),
    loading: false,
  })),
  on(Actions.updateFollowupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteFollowup, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteFollowupSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteFollowupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadFollowupsByCommunicationId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadFollowupsByCommunicationIdSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
  })),
  on(Actions.loadFollowupsByCommunicationIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
