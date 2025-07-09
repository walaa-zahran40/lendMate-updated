import { createReducer, on } from '@ngrx/store';
import * as CloneActions from './client-clones.actions';
import { adapter, initialState, State } from './client-clones.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(CloneActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(CloneActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(CloneActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(CloneActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CloneActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(CloneActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(CloneActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CloneActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(CloneActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(CloneActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CloneActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(CloneActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CloneActions.loadByIdSuccess, (state, { entity }) => {
    console.log('🗄️ Reducer: loadByIdSuccess, before:', {
      loadedId: state.loadedId,
      entities: state.entities,
    });

    const newState = adapter.upsertOne(entity, {
      ...state,
      loading: false,
      loadedId: entity.id ?? null,
    });

    console.log('🗄️ Reducer: loadByIdSuccess, after:', {
      loadedId: newState.loadedId,
      entities: newState.entities,
    });

    return newState;
  }),
  // ⬇️ kick off load-by-client
  on(CloneActions.loadByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  // After loadByClientIdSuccess, replace all in the store
  on(CloneActions.loadByClientIdSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // ⬇️ error path
  on(CloneActions.loadByClientIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CloneActions.clearSelectedClone, (state) => ({
    ...state,
    loadedId: null,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
