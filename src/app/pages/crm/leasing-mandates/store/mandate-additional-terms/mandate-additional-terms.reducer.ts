import { createReducer, on } from '@ngrx/store';
import * as MandateAdditionalTermActions from './mandate-additional-terms.actions';
import { adapter, initialState, State } from './mandate-additional-terms.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(MandateAdditionalTermActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(MandateAdditionalTermActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(MandateAdditionalTermActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(MandateAdditionalTermActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateAdditionalTermActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(MandateAdditionalTermActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(MandateAdditionalTermActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    MandateAdditionalTermActions.updateEntitySuccess,
    (state, { id, changes }) =>
      adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(MandateAdditionalTermActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(MandateAdditionalTermActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateAdditionalTermActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(MandateAdditionalTermActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(MandateAdditionalTermActions.loadByIdSuccess, (state, { entity }) => {
    console.log('🗄️ Reducer: loadByIdSuccess, before:', {
      loadedId: state.loadedId,
      entities: state.entities,
    });

    const newState = adapter.upsertOne(entity, {
      ...state,
      loading: false,
      loadedId: entity.id ?? null,
    });

    console.log('🗄️ Reducer: loadByIdSuccess, after:', {
      loadedId: newState.loadedId,
      entities: newState.entities,
    });

    return newState;
  }),
  on(
    MandateAdditionalTermActions.clearSelectedMandateAdditionalTerm,
    (state) => ({
      ...state,
      loadedId: null,
    })
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
