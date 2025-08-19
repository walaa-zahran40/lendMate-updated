import { createReducer, on } from '@ngrx/store';
import * as FirstClaimStatusActions from './first-claim-statuses.actions';
import { adapter, initialState, State } from './first-claim-statuses.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(FirstClaimStatusActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(FirstClaimStatusActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(FirstClaimStatusActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(FirstClaimStatusActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FirstClaimStatusActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(FirstClaimStatusActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(FirstClaimStatusActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FirstClaimStatusActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(FirstClaimStatusActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(FirstClaimStatusActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FirstClaimStatusActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(FirstClaimStatusActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // firstClaimStatus-calculation-types.reducer.ts
  on(FirstClaimStatusActions.loadByIdSuccess, (state, { entity }) => {
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
  on(FirstClaimStatusActions.loadFirstClaimStatusHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(
    FirstClaimStatusActions.loadFirstClaimStatusHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),

  on(
    FirstClaimStatusActions.loadFirstClaimStatusHistoryFailure,
    (state, { error }) => ({
      ...state,
      historyError: error,
      historyLoaded: false,
    })
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
