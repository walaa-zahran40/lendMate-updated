import { createReducer, on } from '@ngrx/store';
import * as LicenseProviderActions from './license-providers.actions';
import { adapter, initialState } from './license-providers.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(LicenseProviderActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(LicenseProviderActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(LicenseProviderActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(LicenseProviderActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LicenseProviderActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(LicenseProviderActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(LicenseProviderActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LicenseProviderActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(LicenseProviderActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(LicenseProviderActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LicenseProviderActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(LicenseProviderActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identLicenseProvider-calculation-types.reducer.ts
  on(LicenseProviderActions.loadByIdSuccess, (state, { entity }) => {
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
  on(LicenseProviderActions.loadLicenseProviderHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(
    LicenseProviderActions.loadLicenseProviderHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),
  on(
    LicenseProviderActions.loadLicenseProviderHistorySuccess,
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
