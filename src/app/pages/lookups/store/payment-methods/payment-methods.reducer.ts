import { createReducer, on } from '@ngrx/store';
import * as PaymentMethodActions from './payment-methods.actions';
import { adapter, initialState } from './payment-methods.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(PaymentMethodActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(PaymentMethodActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(PaymentMethodActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(PaymentMethodActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PaymentMethodActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(PaymentMethodActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(PaymentMethodActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PaymentMethodActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(PaymentMethodActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(PaymentMethodActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PaymentMethodActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(PaymentMethodActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identPaymentMethod-calculation-types.reducer.ts
  on(PaymentMethodActions.loadByIdSuccess, (state, { entity }) => {
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
