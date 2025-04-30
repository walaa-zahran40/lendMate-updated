import { createReducer, on } from '@ngrx/store';
import * as CallActionTypeActions from './call-action-types.actions';
import { adapter, initialState, State } from './call-action-types.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(CallActionTypeActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(CallActionTypeActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(CallActionTypeActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(CallActionTypeActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CallActionTypeActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(CallActionTypeActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(CallActionTypeActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CallActionTypeActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(CallActionTypeActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(CallActionTypeActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CallActionTypeActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(CallActionTypeActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // fee-calculation-types.reducer.ts
  on(CallActionTypeActions.loadByIdSuccess, (state, { entity }) => {
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
