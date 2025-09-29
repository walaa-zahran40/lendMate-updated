import { createReducer, on } from '@ngrx/store';
import * as AgreementFileActions from './agreement-files.actions';
import { adapter, initialState } from './agreement-files.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(AgreementFileActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(AgreementFileActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(AgreementFileActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(AgreementFileActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AgreementFileActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(AgreementFileActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(AgreementFileActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AgreementFileActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(AgreementFileActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(AgreementFileActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AgreementFileActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(AgreementFileActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AgreementFileActions.loadByIdSuccess, (state, { entity }) => {
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
  on(AgreementFileActions.loadAgreementFileHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(
    AgreementFileActions.loadAgreementFileHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),
  on(AgreementFileActions.clearSelectedClient, (state) => ({
    ...state,
    loadedId: null,
  })),

  on(
    AgreementFileActions.loadAgreementFileHistoryFailure,
    (state, { error }) => ({
      ...state,
      historyError: error,
      historyLoaded: false,
    })
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
