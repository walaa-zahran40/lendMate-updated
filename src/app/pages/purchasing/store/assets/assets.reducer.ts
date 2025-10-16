import { createReducer, on } from '@ngrx/store';
import * as AssetActions from './assets.actions';
import { adapter, initialState, State } from './assets.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(AssetActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(AssetActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(AssetActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(AssetActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AssetActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(AssetActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(AssetActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AssetActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(AssetActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(AssetActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AssetActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(AssetActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // asset-calculation-types.reducer.ts
  on(AssetActions.loadByIdSuccess, (state, { entity }) => {
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
  on(AssetActions.loadAssetHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(AssetActions.loadAssetHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    historyLoaded: true,
  })),

  on(AssetActions.loadAssetHistoryFailure, (state, { error }) => ({
    ...state,
    historyError: error,
    historyLoaded: false,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
