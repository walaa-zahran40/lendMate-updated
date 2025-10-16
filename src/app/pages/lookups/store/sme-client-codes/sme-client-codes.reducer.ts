import { createReducer, on } from '@ngrx/store';
import * as SMEClientCodeActions from './sme-client-codes.actions';
import { adapter, initialState, State } from './sme-client-codes.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(SMEClientCodeActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(SMEClientCodeActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(SMEClientCodeActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(SMEClientCodeActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SMEClientCodeActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(SMEClientCodeActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(SMEClientCodeActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SMEClientCodeActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(SMEClientCodeActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(SMEClientCodeActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SMEClientCodeActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(SMEClientCodeActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // address-calculation-types.reducer.ts
  on(SMEClientCodeActions.loadByIdSuccess, (state, { entity }) => {
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
  on(SMEClientCodeActions.loadSMEClientCodeHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(
    SMEClientCodeActions.loadSMEClientCodeHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),
  on(
    SMEClientCodeActions.loadSMEClientCodeHistorySuccess,
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
