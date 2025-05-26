import { createReducer, on } from '@ngrx/store';
import * as PaymentTimingTermActions from './payment-timing-terms..actions';
import { adapter, initialState } from './payment-timing-terms..state';

export const paymentTimingTermsReducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(PaymentTimingTermActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(PaymentTimingTermActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(PaymentTimingTermActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(PaymentTimingTermActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PaymentTimingTermActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(PaymentTimingTermActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(PaymentTimingTermActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PaymentTimingTermActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(PaymentTimingTermActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(PaymentTimingTermActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PaymentTimingTermActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(PaymentTimingTermActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identPaymentTimingTerm-calculation-types.reducer.ts
  on(PaymentTimingTermActions.loadByIdSuccess, (state, { entity }) => {
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
