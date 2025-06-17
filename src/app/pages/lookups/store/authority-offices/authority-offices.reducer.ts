import { createReducer, on } from '@ngrx/store';
import * as AuthorityOfficeActions from './authority-offices.actions';
import { adapter, initialState } from './authority-offices.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(AuthorityOfficeActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(AuthorityOfficeActions.loadAllSuccess, (state, { result }) =>
    adapter.upsertMany(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(AuthorityOfficeActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(AuthorityOfficeActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthorityOfficeActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(AuthorityOfficeActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(AuthorityOfficeActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthorityOfficeActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(AuthorityOfficeActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(AuthorityOfficeActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthorityOfficeActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(AuthorityOfficeActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identAuthorityOffice-calculation-types.reducer.ts
  on(AuthorityOfficeActions.loadByIdSuccess, (state, { entity }) => {
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
  on(AuthorityOfficeActions.loadAuthorityOfficeHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(
    AuthorityOfficeActions.loadAuthorityOfficeHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),
  on(
    AuthorityOfficeActions.loadAuthorityOfficeHistorySuccess,
    (state, { history }) => {
      console.log('✅ Reducer: history loaded', history); // add this
      return {
        ...state,
        history: [...history],
        historyLoaded: true,
      };
    }
  ),

  on(
    AuthorityOfficeActions.loadAuthorityOfficeHistoryFailure,
    (state, { error }) => ({
      ...state,
      historyError: error,
      historyLoaded: false,
    })
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
