import { createReducer, on } from '@ngrx/store';
import * as FeeActions from './fee-calculation-types.actions';
import { adapter, initialState, State } from './fee-calculation-types.state';

export const reducer = createReducer(
  initialState,

  // when you start loading by id
  on(FeeActions.loadById, (state, { id }) => ({
    ...state,
    loading: true,
    loadedId: null, // clear out any previous
    error: null,
  })),

  // on success, add/update the entity and record its id
  on(FeeActions.loadByIdSuccess, (state, { entity }) =>
    adapter.upsertOne(entity, {
      ...state,
      loading: false,
      loadedId: entity.id, // ← record the loaded id
    })
  ),

  // handle failure
  on(FeeActions.loadByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(FeeActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FeeActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(FeeActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(FeeActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FeeActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(FeeActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(FeeActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FeeActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(FeeActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
