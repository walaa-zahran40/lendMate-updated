import { createReducer, on } from '@ngrx/store';
import * as FeeCalculationTypeActions from './fee-calculation-types.actions';
import { adapter, initialState } from './fee-calculation-types.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(FeeCalculationTypeActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(FeeCalculationTypeActions.loadAllSuccess, (state, { result }) =>
    adapter.upsertMany(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(FeeCalculationTypeActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(FeeCalculationTypeActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FeeCalculationTypeActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(FeeCalculationTypeActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(FeeCalculationTypeActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FeeCalculationTypeActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(FeeCalculationTypeActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(FeeCalculationTypeActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FeeCalculationTypeActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(FeeCalculationTypeActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identCompanyActionType-calculation-types.reducer.ts
  on(FeeCalculationTypeActions.loadByIdSuccess, (state, { entity }) => {
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
