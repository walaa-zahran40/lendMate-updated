import { createReducer, on } from '@ngrx/store';
import * as VendorActions from './vendors.actions';
import { adapter, initialState } from './vendors.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(VendorActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(VendorActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(VendorActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(VendorActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(VendorActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(VendorActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(VendorActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(VendorActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(VendorActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(VendorActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(VendorActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(VendorActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identVendor-calculation-types.reducer.ts
  on(VendorActions.loadByIdSuccess, (state, { entity }) => {
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
  on(VendorActions.loadVendorHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(VendorActions.loadVendorHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    historyLoaded: true,
  })),

  on(VendorActions.loadVendorHistoryFailure, (state, { error }) => ({
    ...state,
    historyError: error,
    historyLoaded: false,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
