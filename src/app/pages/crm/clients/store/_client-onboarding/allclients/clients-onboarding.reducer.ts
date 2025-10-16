// clients-onboarding.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as ClientsOnboardingActions from './clients-onboarding.actions';
import { adapter, initialState, State } from './clients-onboarding.state';

export const reducer = createReducer(
  initialState,

  // 🗂️ Load All
  on(ClientsOnboardingActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClientsOnboardingActions.loadAllSuccess, (state, { result }) =>
    adapter.setAll(result, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(ClientsOnboardingActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ➕ Create
  on(ClientsOnboardingActions.createEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClientsOnboardingActions.createEntitySuccess, (state, { entity }) =>
    adapter.addOne(entity, { ...state, loading: false })
  ),
  on(ClientsOnboardingActions.createEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ✏️ Update
  on(ClientsOnboardingActions.updateEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClientsOnboardingActions.updateEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(ClientsOnboardingActions.updateEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // 🗑️ Delete
  on(ClientsOnboardingActions.deleteEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClientsOnboardingActions.deleteEntitySuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(ClientsOnboardingActions.deleteEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // 🔄 Load One
  on(ClientsOnboardingActions.loadByIdSuccess, (state, { entity }) =>
    adapter.upsertOne(entity, {
      ...state,
      loading: false,
      loadedId: entity.id,
    })
  ),

  // 🚫 Clear Selected
  on(ClientsOnboardingActions.clearSelectedClientOnboarding, (state) => ({
    ...state,
    loadedId: null,
  })),

  // ✏️ performWorkflowAction
  on(ClientsOnboardingActions.performWorkflowActionEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClientsOnboardingActions.performWorkflowActionEntitySuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, { ...state, loading: false })
  ),
  on(ClientsOnboardingActions.performWorkflowActionEntityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
