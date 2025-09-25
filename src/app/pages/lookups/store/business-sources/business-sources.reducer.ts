import { createReducer, on } from '@ngrx/store';
import * as BusinessSourceActions from './business-sources.actions';
import { adapter, initialState, State } from './business-sources.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(BusinessSourceActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(BusinessSourceActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(BusinessSourceActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(BusinessSourceActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BusinessSourceActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(BusinessSourceActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(BusinessSourceActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BusinessSourceActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(BusinessSourceActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(BusinessSourceActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BusinessSourceActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(BusinessSourceActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // businessSource-calculation-types.reducer.ts
  on(BusinessSourceActions.loadByIdSuccess, (state, { entity }) => {
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
  on(BusinessSourceActions.loadBusinessSourceHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(
    BusinessSourceActions.loadBusinessSourceHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),

  on(
    BusinessSourceActions.loadBusinessSourceHistoryFailure,
    (state, { error }) => ({
      ...state,
      historyError: error,
      historyLoaded: false,
    })
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
