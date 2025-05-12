import { createReducer, on } from '@ngrx/store';
import * as SignatoryOfficerActions from './signatory-officers.actions';
import { adapter, initialState } from './signatory-officers.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(SignatoryOfficerActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(SignatoryOfficerActions.loadAllSuccess, (state, { result }) =>
    adapter.upsertMany(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(SignatoryOfficerActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(SignatoryOfficerActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SignatoryOfficerActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(SignatoryOfficerActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(SignatoryOfficerActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SignatoryOfficerActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(SignatoryOfficerActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(SignatoryOfficerActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SignatoryOfficerActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(SignatoryOfficerActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identSignatoryOfficer-calculation-types.reducer.ts
  on(SignatoryOfficerActions.loadByIdSuccess, (state, { entity }) => {
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
