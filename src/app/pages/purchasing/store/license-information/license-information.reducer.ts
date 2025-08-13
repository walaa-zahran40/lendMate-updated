import { createReducer, on } from '@ngrx/store';
import * as LicenseInformationActions from './license-information.actions';
import { adapter, initialState, State } from './license-information.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(LicenseInformationActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(LicenseInformationActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(LicenseInformationActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(LicenseInformationActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LicenseInformationActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(LicenseInformationActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(LicenseInformationActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LicenseInformationActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(LicenseInformationActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(LicenseInformationActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LicenseInformationActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(LicenseInformationActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // licenseInformation-calculation-types.reducer.ts
  on(LicenseInformationActions.loadByIdSuccess, (state, { entity }) => {
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
  on(LicenseInformationActions.loadLicenseInformationHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(
    LicenseInformationActions.loadLicenseInformationHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),

  on(
    LicenseInformationActions.loadLicenseInformationHistoryFailure,
    (state, { error }) => ({
      ...state,
      historyError: error,
      historyLoaded: false,
    })
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
