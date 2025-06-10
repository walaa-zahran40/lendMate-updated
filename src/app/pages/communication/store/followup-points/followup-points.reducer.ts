import { createReducer, on } from '@ngrx/store';
import * as Actions from './followup-points.actions';
import { initialFollowupPointsState } from './followup-points.state';

export const followupPointsReducer = createReducer(
  initialFollowupPointsState,
  on(Actions.loadFollowupPoints, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadFollowupPointsSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadFollowupPointsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadFollowupPointsHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadFollowupPointsHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadFollowupPointsHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadFollowupPoint, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadFollowupPointSuccess, (state, { communication }) => ({
    ...state,
    current: communication,
    loading: false,
  })),
  on(Actions.loadFollowupPointFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createFollowupPoint, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createFollowupPointSuccess, (state, { communication }) => ({
    ...state,
    items: [...state.items, communication],
    loading: false,
  })),
  on(Actions.createFollowupPointFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateFollowupPoint, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateFollowupPointSuccess, (state, { communication }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === communication.id ? communication : ct)),
    loading: false,
  })),
  on(Actions.updateFollowupPointFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteFollowupPoint, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteFollowupPointSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteFollowupPointFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadFollowupPointsByCommunicationId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadFollowupPointsByCommunicationIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadFollowupPointsByCommunicationIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
