import { createReducer, on } from '@ngrx/store';
import * as ClientOfficerTypeActions from './client-officer-types.actions';
import { adapter, initialState } from './client-officer-types.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(ClientOfficerTypeActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(ClientOfficerTypeActions.loadAllSuccess, (state, { result }) =>
    adapter.upsertMany(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(ClientOfficerTypeActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(ClientOfficerTypeActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClientOfficerTypeActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(ClientOfficerTypeActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(ClientOfficerTypeActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClientOfficerTypeActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(ClientOfficerTypeActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(ClientOfficerTypeActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClientOfficerTypeActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(ClientOfficerTypeActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identClientOfficerType-calculation-types.reducer.ts
  on(ClientOfficerTypeActions.loadByIdSuccess, (state, { entity }) => {
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
