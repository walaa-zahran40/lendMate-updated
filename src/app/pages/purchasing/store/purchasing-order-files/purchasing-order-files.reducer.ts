import { createReducer, on } from '@ngrx/store';
import * as PurchasingOrderFileActions from './purchasing-order-files.actions';
import { adapter, initialState } from './purchasing-orders.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(PurchasingOrderFileActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(PurchasingOrderFileActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(PurchasingOrderFileActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(PurchasingOrderFileActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PurchasingOrderFileActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(PurchasingOrderFileActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(PurchasingOrderFileActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PurchasingOrderFileActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(PurchasingOrderFileActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(PurchasingOrderFileActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PurchasingOrderFileActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(PurchasingOrderFileActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // asset-calculation-types.reducer.ts
  on(PurchasingOrderFileActions.loadByIdSuccess, (state, { entity }) => {
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
  on(PurchasingOrderFileActions.loadPurchasingOrderFileHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(
    PurchasingOrderFileActions.loadPurchasingOrderFileHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),
  on(PurchasingOrderFileActions.clearSelectedClient, (state) => ({
    ...state,
    loadedId: null,
  })),

  on(
    PurchasingOrderFileActions.loadPurchasingOrderFileHistoryFailure,
    (state, { error }) => ({
      ...state,
      historyError: error,
      historyLoaded: false,
    })
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
