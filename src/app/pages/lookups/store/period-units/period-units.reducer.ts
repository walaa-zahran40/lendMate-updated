import { createReducer, on } from '@ngrx/store';
import * as GracePeriodUnitActions from './period-units.actions';
import { adapter, initialState } from './period-units.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(GracePeriodUnitActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(GracePeriodUnitActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(GracePeriodUnitActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(GracePeriodUnitActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(GracePeriodUnitActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(GracePeriodUnitActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(GracePeriodUnitActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(GracePeriodUnitActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(GracePeriodUnitActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(GracePeriodUnitActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(GracePeriodUnitActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(GracePeriodUnitActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // periodUnit-calculation-types.reducer.ts
  on(GracePeriodUnitActions.loadByIdSuccess, (state, { entity }) => {
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
