import { createReducer, on } from '@ngrx/store';
import * as BusinessLineActions from './business-lines.actions';
import { adapter, initialState } from './business-lines.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(BusinessLineActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(BusinessLineActions.loadAllSuccess, (state, { result }) =>
    adapter.upsertMany(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(BusinessLineActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(BusinessLineActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BusinessLineActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(BusinessLineActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(BusinessLineActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BusinessLineActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(BusinessLineActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(BusinessLineActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BusinessLineActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(BusinessLineActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // identBusinessLine-calculation-types.reducer.ts
  on(BusinessLineActions.loadByIdSuccess, (state, { entity }) => {
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
