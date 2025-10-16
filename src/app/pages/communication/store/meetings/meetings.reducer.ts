import { createReducer, on } from '@ngrx/store';
import * as MeetingActions from './meetings.actions';
import { adapter, initialState } from './meetings.state';

export const meetingsReducer = createReducer(
  initialState,

  on(MeetingActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MeetingActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(MeetingActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(MeetingActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MeetingActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(MeetingActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(MeetingActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MeetingActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(MeetingActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(MeetingActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MeetingActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(MeetingActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(MeetingActions.loadByIdSuccess, (state, { entity }) => {
    const newState = adapter.upsertOne(entity, {
      ...state,
      loading: false,
      loadedId: entity.id,
    });

    return newState;
  })
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
