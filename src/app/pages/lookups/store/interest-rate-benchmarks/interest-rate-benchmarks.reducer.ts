import { createReducer, on } from '@ngrx/store';
import * as InterestRateBenchMarkActions from './interest-rate-benchmarks.actions';
import { adapter, initialState } from './interest-rate-benchmarks.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(InterestRateBenchMarkActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(InterestRateBenchMarkActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(InterestRateBenchMarkActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(InterestRateBenchMarkActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(InterestRateBenchMarkActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(InterestRateBenchMarkActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(InterestRateBenchMarkActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    InterestRateBenchMarkActions.updateEntitySuccess,
    (state, { id, changes }) =>
      adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(InterestRateBenchMarkActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(InterestRateBenchMarkActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(InterestRateBenchMarkActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(InterestRateBenchMarkActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identInterestRateBenchMark-calculation-types.reducer.ts
  on(InterestRateBenchMarkActions.loadByIdSuccess, (state, { entity }) => {
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
