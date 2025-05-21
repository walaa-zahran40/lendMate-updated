import { createReducer, on } from '@ngrx/store';
import * as IndividualActions from './individuals.actions';
import { adapter, initialState, State } from './individuals.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(IndividualActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(IndividualActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(IndividualActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(IndividualActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IndividualActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(IndividualActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(IndividualActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IndividualActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(IndividualActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(IndividualActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IndividualActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(IndividualActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(IndividualActions.loadByIdSuccess, (state, { entity }) => {
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
  on(IndividualActions.clearSelectedIndividual, (state) => ({
    ...state,
    loadedId: null,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
