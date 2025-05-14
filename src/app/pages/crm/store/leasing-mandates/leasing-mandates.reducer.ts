import { createReducer, on } from '@ngrx/store';
import * as LeasingMandateActions from './leasing-mandates.actions';
import { adapter, initialState } from './leasing-mandates.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(LeasingMandateActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(LeasingMandateActions.loadAllSuccess, (state, { result }) =>
    adapter.upsertMany(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(LeasingMandateActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(LeasingMandateActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LeasingMandateActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(LeasingMandateActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(LeasingMandateActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LeasingMandateActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(LeasingMandateActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(LeasingMandateActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LeasingMandateActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(LeasingMandateActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identCompanyActionType-types.reducer.ts
  on(LeasingMandateActions.loadByIdSuccess, (state, { entity }) => {
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
