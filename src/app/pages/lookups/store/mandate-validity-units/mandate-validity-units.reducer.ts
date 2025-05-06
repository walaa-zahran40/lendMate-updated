import { createReducer, on } from '@ngrx/store';
import * as MandateValidityUnitActions from './mandate-validity-units.actions';
import { adapter, initialState, State } from './mandate-validity-units.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(MandateValidityUnitActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(MandateValidityUnitActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(MandateValidityUnitActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(MandateValidityUnitActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateValidityUnitActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(MandateValidityUnitActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(MandateValidityUnitActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateValidityUnitActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(MandateValidityUnitActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(MandateValidityUnitActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateValidityUnitActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(MandateValidityUnitActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // address-calculation-types.reducer.ts
  on(MandateValidityUnitActions.loadByIdSuccess, (state, { entity }) => {
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
