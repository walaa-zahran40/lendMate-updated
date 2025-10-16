import { createReducer, on } from '@ngrx/store';
import * as ConditionExpressionActions from './condition-expressions.actions';
import { adapter, initialState, State } from './condition-expressions.state';

export const conditionExpressionsReducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(ConditionExpressionActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(ConditionExpressionActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(ConditionExpressionActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(ConditionExpressionActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ConditionExpressionActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(ConditionExpressionActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(ConditionExpressionActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ConditionExpressionActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(ConditionExpressionActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(ConditionExpressionActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ConditionExpressionActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(ConditionExpressionActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // address-calculation-types.reducer.ts
  on(ConditionExpressionActions.loadByIdSuccess, (state, { entity }) => {
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
  on(ConditionExpressionActions.loadConditionExpressionHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(
    ConditionExpressionActions.loadConditionExpressionHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),
  on(
    ConditionExpressionActions.loadConditionExpressionHistorySuccess,
    (state, { history }) => {
      console.log('✅ Reducer: history loaded', history); // add this
      return {
        ...state,
        history: [...history],
        historyLoaded: true,
      };
    }
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
