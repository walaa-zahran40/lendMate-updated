import { createReducer, on } from '@ngrx/store';
import * as RentStructureTypeActions from './rent-structure-types.actions';
import { adapter, initialState } from './rent-structure-types.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(RentStructureTypeActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(RentStructureTypeActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(RentStructureTypeActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(RentStructureTypeActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RentStructureTypeActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(RentStructureTypeActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(RentStructureTypeActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RentStructureTypeActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(RentStructureTypeActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(RentStructureTypeActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RentStructureTypeActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(RentStructureTypeActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identRentStructureType-calculation-types.reducer.ts
  on(RentStructureTypeActions.loadByIdSuccess, (state, { entity }) => {
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
