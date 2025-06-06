import { createReducer, on } from '@ngrx/store';
import * as FinancialFormActions from './financial-forms.actions';
import { adapter, initialState, State } from './financial-forms.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(FinancialFormActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(FinancialFormActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(FinancialFormActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(FinancialFormActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FinancialFormActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(FinancialFormActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(FinancialFormActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FinancialFormActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(FinancialFormActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(FinancialFormActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FinancialFormActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(FinancialFormActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(FinancialFormActions.loadByIdSuccess, (state, { entity }) => {
    console.log('🗄️ Reducer: loadByIdSuccess, before:', {
      loadedId: state.loadedId,
      entities: state.entities,
    });

    const newState = adapter.upsertOne(entity, {
      ...state,
      loading: false,
      loadedId: entity.id ?? null,
    });

    console.log('🗄️ Reducer: loadByIdSuccess, after:', {
      loadedId: newState.loadedId,
      entities: newState.entities,
    });

    return newState;
  }),
  on(FinancialFormActions.clearSelectedFinancialForm, (state) => ({
    ...state,
    loadedId: null,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
