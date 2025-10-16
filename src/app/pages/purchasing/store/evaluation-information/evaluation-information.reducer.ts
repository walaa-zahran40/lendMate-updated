import { createReducer, on } from '@ngrx/store';
import * as EvaluationInformationActions from './evaluation-information.actions';
import { adapter, initialState, State } from './evaluation-information.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(EvaluationInformationActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(EvaluationInformationActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(EvaluationInformationActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(EvaluationInformationActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EvaluationInformationActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(EvaluationInformationActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(EvaluationInformationActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    EvaluationInformationActions.updateEntitySuccess,
    (state, { id, changes }) =>
      adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(EvaluationInformationActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(EvaluationInformationActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EvaluationInformationActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(EvaluationInformationActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // evaluationInformation-calculation-types.reducer.ts
  on(EvaluationInformationActions.loadByIdSuccess, (state, { entity }) => {
    const safeId = entity?.id;
    if (safeId == null) {
      console.warn(
        '🟡 loadByIdSuccess with missing entity.id. Skipping loadedId update.',
        entity
      );
      return adapter.upsertOne(entity as any, { ...state, loading: false });
    }
    return adapter.upsertOne(entity, {
      ...state,
      loading: false,
      loadedId: safeId,
    });
  }),

  //History management
  on(
    EvaluationInformationActions.loadEvaluationInformationHistory,
    (state) => ({
      ...state,
      historyLoaded: false,
      historyError: null,
    })
  ),

  on(
    EvaluationInformationActions.loadEvaluationInformationHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),

  on(
    EvaluationInformationActions.loadEvaluationInformationHistoryFailure,
    (state, { error }) => ({
      ...state,
      historyError: error,
      historyLoaded: false,
    })
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
