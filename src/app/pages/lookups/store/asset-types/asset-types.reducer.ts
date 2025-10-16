import { createReducer, on } from '@ngrx/store';
import * as AssetTypeActions from './asset-types.actions';
import { adapter, initialState } from './asset-types.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(AssetTypeActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(AssetTypeActions.loadAllSuccess, (state, { result }) =>
    adapter.upsertMany(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(AssetTypeActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(AssetTypeActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AssetTypeActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(AssetTypeActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(AssetTypeActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AssetTypeActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(AssetTypeActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(AssetTypeActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AssetTypeActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(AssetTypeActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identAssetType-calculation-types.reducer.ts
  on(AssetTypeActions.loadByIdSuccess, (state, { entity }) => {
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
  on(AssetTypeActions.loadAssetTypeHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(AssetTypeActions.loadAssetTypeHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    historyLoaded: true,
  })),
  on(AssetTypeActions.loadAssetTypeHistorySuccess, (state, { history }) => {
    console.log('✅ Reducer: history loaded', history); // add this
    return {
      ...state,
      history: [...history],
      historyLoaded: true,
    };
  }),

  on(AssetTypeActions.loadAssetTypeHistoryFailure, (state, { error }) => ({
    ...state,
    historyError: error,
    historyLoaded: false,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
