import { createReducer, on } from '@ngrx/store';
import * as PurchasingOrderActions from './purchasing-orders.actions';
import { adapter, initialState, State } from './purchasing-orders.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(PurchasingOrderActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(PurchasingOrderActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(PurchasingOrderActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(PurchasingOrderActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PurchasingOrderActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(PurchasingOrderActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(PurchasingOrderActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PurchasingOrderActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(PurchasingOrderActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(PurchasingOrderActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PurchasingOrderActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(PurchasingOrderActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // asset-calculation-types.reducer.ts
  on(PurchasingOrderActions.loadByIdSuccess, (state, { entity }) => {
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
  on(PurchasingOrderActions.loadPurchasingOrderHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(
    PurchasingOrderActions.loadPurchasingOrderHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),
  on(PurchasingOrderActions.clearSelectedClient, (state) => ({
    ...state,
    loadedId: null,
  })),

  on(
    PurchasingOrderActions.loadPurchasingOrderHistoryFailure,
    (state, { error }) => ({
      ...state,
      historyError: error,
      historyLoaded: false,
    })
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
