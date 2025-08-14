import { createReducer, on } from '@ngrx/store';
import * as LicenseTypeActions from './license-types.actions';
import { adapter, initialState } from './license-types.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(LicenseTypeActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(LicenseTypeActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(LicenseTypeActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(LicenseTypeActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LicenseTypeActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(LicenseTypeActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(LicenseTypeActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LicenseTypeActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(LicenseTypeActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(LicenseTypeActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LicenseTypeActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(LicenseTypeActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identLicenseType-calculation-types.reducer.ts
  on(LicenseTypeActions.loadByIdSuccess, (state, { entity }) => {
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
  on(LicenseTypeActions.loadLicenseTypeHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(
    LicenseTypeActions.loadLicenseTypeHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),
  on(LicenseTypeActions.loadLicenseTypeHistorySuccess, (state, { history }) => {
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
