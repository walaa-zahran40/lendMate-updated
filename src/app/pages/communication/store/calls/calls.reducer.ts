import { createReducer, on } from '@ngrx/store';
import * as AddressActions from './calls.actions';
import { adapter, initialState } from './calls.state';

export const callsReducer = createReducer(
  initialState,

  on(AddressActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AddressActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(AddressActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AddressActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AddressActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(AddressActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AddressActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AddressActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(AddressActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AddressActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AddressActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(AddressActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AddressActions.loadByIdSuccess, (state, { entity }) => {
    const newState = adapter.upsertOne(entity, {
      ...state,
      loading: false,
      loadedId: entity.id,
    });

    return newState;
  })
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
