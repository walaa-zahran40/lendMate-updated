import { createReducer, on } from '@ngrx/store';
import * as MandateFeeActions from './mandate-fees.actions';
import { adapter, initialState, State } from './mandate-fees.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(MandateFeeActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(MandateFeeActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(MandateFeeActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(MandateFeeActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateFeeActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(MandateFeeActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(MandateFeeActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateFeeActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(MandateFeeActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(MandateFeeActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateFeeActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(MandateFeeActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(MandateFeeActions.loadByIdSuccess, (state, { entities }) => {
    const firstId = entities.length > 0 ? entities[0].id : null;
    return adapter.setAll(entities, {
      ...state,
      loadedId: firstId, // ✅ Set the selected ID so selected$ can resolve it
    });
  }),

  on(MandateFeeActions.clearSelectedMandateFee, (state) => ({
    ...state,
    loadedId: null,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
