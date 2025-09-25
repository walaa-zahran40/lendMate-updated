import { createReducer, on } from '@ngrx/store';
import * as PortfolioActions from './portfolios.actions';
import { adapter, initialState, State } from './portfolios.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(PortfolioActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(PortfolioActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(PortfolioActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(PortfolioActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PortfolioActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(PortfolioActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(PortfolioActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PortfolioActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(PortfolioActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(PortfolioActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PortfolioActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(PortfolioActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // portfolio-calculation-types.reducer.ts
  on(PortfolioActions.loadByIdSuccess, (state, { entity }) => {
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
  on(PortfolioActions.loadPortfolioHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(PortfolioActions.loadPortfolioHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    historyLoaded: true,
  })),

  on(PortfolioActions.loadPortfolioHistoryFailure, (state, { error }) => ({
    ...state,
    historyError: error,
    historyLoaded: false,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
