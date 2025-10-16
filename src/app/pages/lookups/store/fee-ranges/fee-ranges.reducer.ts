import { createReducer, on } from '@ngrx/store';
import * as FeeRangeActions from './fee-ranges.actions';
import { adapter, initialState, State } from './fee-ranges.state';

export const feeRangesReducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(FeeRangeActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(FeeRangeActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(FeeRangeActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(FeeRangeActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FeeRangeActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(FeeRangeActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(FeeRangeActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FeeRangeActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(FeeRangeActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(FeeRangeActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FeeRangeActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(FeeRangeActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // address-calculation-types.reducer.ts
  on(FeeRangeActions.loadByIdSuccess, (state, { entity }) => {
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
  on(FeeRangeActions.loadFeeRangeHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(FeeRangeActions.loadFeeRangeHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    historyLoaded: true,
  })),
  on(FeeRangeActions.loadFeeRangeHistorySuccess, (state, { history }) => {
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
