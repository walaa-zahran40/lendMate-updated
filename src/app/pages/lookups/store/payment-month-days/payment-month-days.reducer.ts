import { createReducer, on } from '@ngrx/store';
import * as PaymentMonthDayActions from './payment-month-days.actions';
import { adapter, initialState, State } from './payment-month-days.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(PaymentMonthDayActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(PaymentMonthDayActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(PaymentMonthDayActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(PaymentMonthDayActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PaymentMonthDayActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(PaymentMonthDayActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(PaymentMonthDayActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PaymentMonthDayActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(PaymentMonthDayActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(PaymentMonthDayActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PaymentMonthDayActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(PaymentMonthDayActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // paymentMonthDay-calculation-types.reducer.ts
  on(PaymentMonthDayActions.loadByIdSuccess, (state, { entity }) => {
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
  on(PaymentMonthDayActions.loadPaymentMonthDayHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(
    PaymentMonthDayActions.loadPaymentMonthDayHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),
  on(
    PaymentMonthDayActions.loadPaymentMonthDayHistorySuccess,
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
