import { createReducer, on } from '@ngrx/store';
import * as AuthorizationGroupOfficerActions from './authorization-group-officers.actions';
import { adapter, initialState } from './authorization-group-officers.state';

export const authorizationGroupOfficerReducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(AuthorizationGroupOfficerActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(AuthorizationGroupOfficerActions.loadAllSuccess, (state, { result }) =>
    adapter.upsertMany(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(AuthorizationGroupOfficerActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(AuthorizationGroupOfficerActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthorizationGroupOfficerActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(AuthorizationGroupOfficerActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(AuthorizationGroupOfficerActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthorizationGroupOfficerActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(AuthorizationGroupOfficerActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(AuthorizationGroupOfficerActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthorizationGroupOfficerActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(AuthorizationGroupOfficerActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identCompanyActionType-types.reducer.ts
  on(AuthorizationGroupOfficerActions.loadByIdSuccess, (state, { entity }) => {
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
