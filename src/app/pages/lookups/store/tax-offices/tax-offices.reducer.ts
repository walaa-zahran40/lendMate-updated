import { createReducer, on } from '@ngrx/store';
import * as TaxOfficeActions from './tax-offices.actions';
import { adapter, initialState, State } from './tax-offices.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(TaxOfficeActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(TaxOfficeActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(TaxOfficeActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(TaxOfficeActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TaxOfficeActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(TaxOfficeActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(TaxOfficeActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TaxOfficeActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(TaxOfficeActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(TaxOfficeActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TaxOfficeActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(TaxOfficeActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // address-calculation-types.reducer.ts
  on(TaxOfficeActions.loadByIdSuccess, (state, { entity }) => {
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
  on(TaxOfficeActions.loadTaxOfficeHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(TaxOfficeActions.loadTaxOfficeHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    historyLoaded: true,
  })),
  on(TaxOfficeActions.loadTaxOfficeHistorySuccess, (state, { history }) => {
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
