import { createReducer, on } from '@ngrx/store';
import * as InsuredByActions from './insured-by.actions';
import { adapter, initialState } from './insured-by.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(InsuredByActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(InsuredByActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(InsuredByActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(InsuredByActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(InsuredByActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(InsuredByActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(InsuredByActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(InsuredByActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(InsuredByActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(InsuredByActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(InsuredByActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(InsuredByActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identInsuredBy-calculation-types.reducer.ts
  on(InsuredByActions.loadByIdSuccess, (state, { entity }) => {
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
  on(InsuredByActions.loadInsuredByHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(InsuredByActions.loadInsuredByHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    historyLoaded: true,
  })),
  on(InsuredByActions.loadInsuredByHistorySuccess, (state, { history }) => {
    console.log('✅ Reducer: history loaded', history); // add this
    return {
      ...state,
      history: [...history],
      historyLoaded: true,
    };
  })
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
