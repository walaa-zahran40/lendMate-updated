import { createReducer, on } from '@ngrx/store';
import * as PropertyActions from './properties.actions';
import { adapter, initialState, State } from './properties.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(PropertyActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(PropertyActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(PropertyActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(PropertyActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PropertyActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(PropertyActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(PropertyActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PropertyActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(PropertyActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(PropertyActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PropertyActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(PropertyActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // property-calculation-types.reducer.ts
  on(PropertyActions.loadByIdSuccess, (state, { entity }) => {
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
  }),
  //History management
  on(PropertyActions.loadPropertyHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(PropertyActions.loadPropertyHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    historyLoaded: true,
  })),

  on(PropertyActions.loadPropertyHistoryFailure, (state, { error }) => ({
    ...state,
    historyError: error,
    historyLoaded: false,
  })),
  on(PropertyActions.loadByIdSuccess, (state, { entity }) => {
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
