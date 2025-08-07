import { createReducer, on } from '@ngrx/store';
import * as VehicleManufacturerActions from './vehicle-manufacturers.actions';
import { adapter, initialState, State } from './vehicle-manufacturers.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(VehicleManufacturerActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(VehicleManufacturerActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(VehicleManufacturerActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(VehicleManufacturerActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(VehicleManufacturerActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(VehicleManufacturerActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(VehicleManufacturerActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(VehicleManufacturerActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(VehicleManufacturerActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(VehicleManufacturerActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(VehicleManufacturerActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(VehicleManufacturerActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // vehicleManufacturer-calculation-types.reducer.ts
  on(VehicleManufacturerActions.loadByIdSuccess, (state, { entity }) => {
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
  on(VehicleManufacturerActions.loadVehicleManufacturerHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(
    VehicleManufacturerActions.loadVehicleManufacturerHistorySuccess,
    (state, { history }) => ({
      ...state,
      history,
      historyLoaded: true,
    })
  ),

  on(
    VehicleManufacturerActions.loadVehicleManufacturerHistoryFailure,
    (state, { error }) => ({
      ...state,
      historyError: error,
      historyLoaded: false,
    })
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
