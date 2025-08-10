import { createReducer, on } from '@ngrx/store';
import * as EquipmentActions from './equipments.actions';
import { adapter, initialState, State } from './equipments.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(EquipmentActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(EquipmentActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(EquipmentActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(EquipmentActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EquipmentActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(EquipmentActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(EquipmentActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EquipmentActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(EquipmentActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(EquipmentActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EquipmentActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(EquipmentActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // equipment-calculation-types.reducer.ts
  on(EquipmentActions.loadByIdSuccess, (state, { entity }) => {
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
  on(EquipmentActions.loadEquipmentHistory, (state) => ({
    ...state,
    historyLoaded: false,
    historyError: null,
  })),

  on(EquipmentActions.loadEquipmentHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    historyLoaded: true,
  })),

  on(EquipmentActions.loadEquipmentHistoryFailure, (state, { error }) => ({
    ...state,
    historyError: error,
    historyLoaded: false,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
