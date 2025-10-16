import { createReducer, on } from '@ngrx/store';
import * as VehicleActions from './vehicles.actions';
import { adapter, initialState, State } from './vehicles.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(VehicleActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(VehicleActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(VehicleActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(VehicleActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(VehicleActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(VehicleActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(VehicleActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(VehicleActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(VehicleActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(VehicleActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(VehicleActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(VehicleActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // vehicle-calculation-types.reducer.ts
  on(VehicleActions.loadByIdSuccess, (state, { entity }) => {
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
  on(VehicleActions.loadVehicleHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(VehicleActions.loadVehicleHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    historyLoaded: true,
  })),

  on(VehicleActions.loadVehicleHistoryFailure, (state, { error }) => ({
    ...state,
    historyError: error,
    historyLoaded: false,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
