import { createReducer, on } from '@ngrx/store';
import * as AssetTypeCategoryActions from './asset-type-categories.actions';
import { adapter, initialState } from './asset-type-categories.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(AssetTypeCategoryActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(AssetTypeCategoryActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(AssetTypeCategoryActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(AssetTypeCategoryActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AssetTypeCategoryActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(AssetTypeCategoryActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(AssetTypeCategoryActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AssetTypeCategoryActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(AssetTypeCategoryActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(AssetTypeCategoryActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AssetTypeCategoryActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(AssetTypeCategoryActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identAssetTypeCategory-calculation-types.reducer.ts
  on(AssetTypeCategoryActions.loadByIdSuccess, (state, { entity }) => {
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
