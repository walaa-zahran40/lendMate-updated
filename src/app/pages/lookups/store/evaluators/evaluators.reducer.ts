import { createReducer, on } from '@ngrx/store';
import * as EvaluatorActions from './evaluators.actions';
import { adapter, initialState, State } from './evaluators.state';

export const evaluatorsReducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(EvaluatorActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(EvaluatorActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(EvaluatorActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(EvaluatorActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EvaluatorActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(EvaluatorActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(EvaluatorActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EvaluatorActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(EvaluatorActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(EvaluatorActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EvaluatorActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(EvaluatorActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // address-calculation-types.reducer.ts
  on(EvaluatorActions.loadByIdSuccess, (state, { entity }) => {
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
  on(EvaluatorActions.loadEvaluatorHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(EvaluatorActions.loadEvaluatorHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    historyLoaded: true,
  })),
  on(EvaluatorActions.loadEvaluatorHistorySuccess, (state, { history }) => {
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
