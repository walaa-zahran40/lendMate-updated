import { createReducer, on } from '@ngrx/store';
import * as IndividualOnboardingActions from './individuals-onboarding.actions';
import { adapter, initialState, State } from './individuals-onboarding.state';

export const reducer = createReducer(
  initialState,

  // when you dispatch loadAll()
  on(IndividualOnboardingActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // when your effect dispatches loadAllSuccess({ result })
  on(IndividualOnboardingActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  // on failure
  on(IndividualOnboardingActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // create
  on(IndividualOnboardingActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IndividualOnboardingActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(IndividualOnboardingActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // update
  on(IndividualOnboardingActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    IndividualOnboardingActions.updateEntitySuccess,
    (state, { id, changes }) =>
      adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(IndividualOnboardingActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // delete
  on(IndividualOnboardingActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IndividualOnboardingActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(IndividualOnboardingActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(IndividualOnboardingActions.loadByIdSuccess, (state, { entity }) => {
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
  }),
  on(
    IndividualOnboardingActions.clearSelectedIndividualOnboarding,
    (state) => ({
      ...state,
      loadedId: null,
    })
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
