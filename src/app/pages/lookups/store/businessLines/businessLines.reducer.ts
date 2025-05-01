import { createReducer, on } from '@ngrx/store';
import * as Actions from './businessLines.actions';
import { initialBusinessLinesState } from './businessLines.state';

export const businessLinesReducer = createReducer(
  initialBusinessLinesState,
  on(Actions.loadBusinessLines, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadBusinessLinesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadBusinessLinesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadBusinessLinesHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadBusinessLinesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadBusinessLinesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadBusinessLine, (state) => ({ ...state, loading: true })),
  on(Actions.loadBusinessLineSuccess, (state, { businessLine }) => ({
    ...state,
    current: businessLine,
    loading: false,
  })),
  on(Actions.loadBusinessLineFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createBusinessLine, (state) => ({ ...state, loading: true })),
  on(Actions.createBusinessLineSuccess, (state, { businessLine }) => ({
    ...state,
    items: [...state.items, businessLine],
    loading: false,
  })),
  on(Actions.createBusinessLineFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateBusinessLine, (state) => ({ ...state, loading: true })),
  on(Actions.updateBusinessLineSuccess, (state, { businessLine }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === businessLine.id ? businessLine : ct
    ),
    loading: false,
  })),
  on(Actions.updateBusinessLineFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteBusinessLine, (state) => ({ ...state, loading: true })),
  on(Actions.deleteBusinessLineSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteBusinessLineFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
