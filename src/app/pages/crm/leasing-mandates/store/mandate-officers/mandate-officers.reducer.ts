import { createReducer, on } from '@ngrx/store';
import * as MandateOfficerActions from './mandate-officers.actions';
import { adapter, initialState, State } from './mandate-officers.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(MandateOfficerActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(MandateOfficerActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(MandateOfficerActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(MandateOfficerActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateOfficerActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(MandateOfficerActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(MandateOfficerActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateOfficerActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(MandateOfficerActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(MandateOfficerActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateOfficerActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(MandateOfficerActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(MandateOfficerActions.loadByIdSuccess, (state, { entities }) => {
    const firstId = entities.length > 0 ? entities[0].id : null;
    return adapter.setAll(entities, {
      ...state,
      loadedId: firstId, // ✅ Set the selected ID so selected$ can resolve it
    });
  }),

  on(MandateOfficerActions.clearSelectedMandateOfficer, (state) => ({
    ...state,
    loadedId: null,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
