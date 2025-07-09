import { ActionReducer, createReducer, on } from '@ngrx/store';
import * as MandateAdditionalTermActions from './client-mandate-additional-terms.actions';
import {
  adapter,
  initialState,
  State,
} from './client-mandate-additional-terms.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(MandateAdditionalTermActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    MandateAdditionalTermActions.loadByAdditionalIdSuccess,
    (state, { entity }) =>
      adapter.upsertOne(entity, {
        ...state,
        loadedId: entity.id,
        loading: false,
        error: null,
      })
  ),
  on(
    MandateAdditionalTermActions.loadByAdditionalIdFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),

  // when your effect dispatches loadAllSuccess({ result })
  on(MandateAdditionalTermActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(MandateAdditionalTermActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(MandateAdditionalTermActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateAdditionalTermActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(MandateAdditionalTermActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(MandateAdditionalTermActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    MandateAdditionalTermActions.updateEntitySuccess,
    (state, { id, changes }) =>
      adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(MandateAdditionalTermActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(MandateAdditionalTermActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MandateAdditionalTermActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(MandateAdditionalTermActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(MandateAdditionalTermActions.loadByIdSuccess, (state, { entities }) => {
    const firstId = entities.length > 0 ? entities[0].id : null;
    return adapter.setAll(entities, {
      ...state,
      loadedId: firstId, // ✅ Set the selected ID so selected$ can resolve it
    });
  }),

  on(
    MandateAdditionalTermActions.clearSelectedMandateAdditionalTerm,
    (state) => ({
      ...state,
      loadedId: null,
    })
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
export function debugState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('[Reducer] action:', action.type, action);
    const next = reducer(state, action);
    console.log('[Reducer] next state.loadedId =', next.loadedId);
    console.log('[Reducer] next state.entities =', next.entities);
    return next;
  };
}
