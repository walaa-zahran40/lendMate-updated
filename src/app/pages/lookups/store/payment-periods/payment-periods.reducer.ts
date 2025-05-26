import { createReducer, on } from '@ngrx/store';
import * as PaymentPeriodActions from './payment-periods.actions';
import { adapter, initialState } from './payment-periods.state';

export const paymentPeriodReducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(PaymentPeriodActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(PaymentPeriodActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(PaymentPeriodActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(PaymentPeriodActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PaymentPeriodActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(PaymentPeriodActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(PaymentPeriodActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PaymentPeriodActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(PaymentPeriodActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(PaymentPeriodActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PaymentPeriodActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(PaymentPeriodActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identPaymentPeriod-calculation-types.reducer.ts
  on(PaymentPeriodActions.loadByIdSuccess, (state, { entity }) => {
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
