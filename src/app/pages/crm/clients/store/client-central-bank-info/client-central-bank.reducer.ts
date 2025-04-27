import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-central-bank.actions';
import { adapter, initialState } from './client-central-bank.state';

export const reducer = createReducer(
  initialState,

  // Load all
  on(Actions.loadAll, (state) => ({ ...state, loading: true, error: null })),
  on(Actions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result.items, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(Actions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load one
  on(Actions.loadOne, (state, { id }) => ({
    ...state,
    loading: true,
    selectedId: id,
    error: null,
  })),
  on(Actions.loadOneSuccess, (state, { entity }) =>
    adapter.upsertOne(entity, { ...state, loading: false })
  ),
  on(Actions.loadOneFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(Actions.createEntity, (state) => ({ ...state, loading: true })),
  on(Actions.createSuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(Actions.createFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update
  on(Actions.updateEntity, (state) => ({ ...state, loading: true })),
  on(Actions.updateSuccess, (state, { entity }) =>
    adapter.upsertOne(entity, { ...state, loading: false })
  ),
  on(Actions.updateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete
  on(Actions.deleteEntity, (state) => ({ ...state, loading: true })),
  on(Actions.deleteSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(Actions.deleteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // History
  on(Actions.loadHistory, (state) => ({
    ...state,
    historyLoading: true,
    error: null,
  })),
  on(Actions.loadHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    historyLoading: false,
  })),
  on(Actions.loadHistoryFailure, (state, { error }) => ({
    ...state,
    historyLoading: false,
    error,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
