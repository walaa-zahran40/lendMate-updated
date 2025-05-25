import { createReducer, on } from '@ngrx/store';
import * as AuthorizationGroupActions from './authorization-groups.actions';
import { adapter, initialState, State } from './authorization-groups.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(AuthorizationGroupActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(AuthorizationGroupActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(AuthorizationGroupActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(AuthorizationGroupActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthorizationGroupActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(AuthorizationGroupActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(AuthorizationGroupActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthorizationGroupActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(AuthorizationGroupActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(AuthorizationGroupActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthorizationGroupActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(AuthorizationGroupActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // address-calculation-types.reducer.ts
  on(AuthorizationGroupActions.loadByIdSuccess, (state, { entity }) => {
    console.log('🗄️ Reducer: loadByIdSuccess, before:', {
      loadedId: state.loadedId,
      entities: state.entities,
    });

    const newState = adapter.upsertOne(entity, {
      ...state,
      loading: false,
      loadedId: entity.id,
    });

    console.log('🗄️ Reducer: loadByIdSuccess, after:', {
      loadedId: newState.loadedId,
      entities: newState.entities,
    });

    return newState;
  })
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
