import { createReducer, on } from '@ngrx/store';
import * as VendorAddressActions from './vendor-addresses.actions';
import { adapter, initialState } from './vendor-addresses.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(VendorAddressActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(VendorAddressActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(VendorAddressActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(VendorAddressActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(VendorAddressActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(VendorAddressActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(VendorAddressActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(VendorAddressActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(VendorAddressActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(VendorAddressActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(VendorAddressActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(VendorAddressActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identVendorAddress-calculation-types.reducer.ts
  on(VendorAddressActions.loadByIdSuccess, (state, { entity }) => {
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
  on(VendorAddressActions.loadVendorAddressHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(
    VendorAddressActions.loadVendorAddressHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),
  on(
    VendorAddressActions.loadVendorAddressHistorySuccess,
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
