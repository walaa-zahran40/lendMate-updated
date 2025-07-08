import { createReducer, on } from '@ngrx/store';
import * as MandateActions from './client-leasing-mandates.actions';
import { adapter, initialState, State } from './client-leasing-mandates.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(MandateActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(MandateActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(MandateActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(MandateActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(MandateActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(MandateActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(MandateActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(MandateActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(MandateActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(MandateActions.loadByIdSuccess, (state, { entity }) => {
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
  on(MandateActions.clearSelectedMandate, (state) => ({
    ...state,
    loadedId: null,
  })),
  // ➕ reset loading state
  on(MandateActions.loadByLeasingId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // ➕ upsert the single mandate into the entity cache
  on(MandateActions.loadByLeasingIdSuccess, (state, { entity }) =>
    adapter.upsertOne(entity, {
      ...state,
      loadedId: entity.id,
      loading: false,
    })
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
