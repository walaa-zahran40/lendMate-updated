import { createFeature, createReducer, on } from '@ngrx/store';
import { LeasingAgreementsActions } from './agreements.actions';
import {
  initialLeasingAgreementsState,
  agreementsAdapter,
  LEASING_AGREEMENTS_FEATURE_KEY,
} from './agreements.state';

export const leasingAgreementsReducer = createReducer(
  initialLeasingAgreementsState,
  on(LeasingAgreementsActions.clearError, (state) => ({
    ...state,
    error: null,
  })),
  on(LeasingAgreementsActions.select, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),

  // Load all
  on(LeasingAgreementsActions.loadAll, (state) => ({
    ...state,
    loading: true,
  })),
  on(LeasingAgreementsActions.loadAllSuccess, (state, { agreements }) => {
    return agreementsAdapter.setAll(agreements, { ...state, loading: false });
  }),
  on(LeasingAgreementsActions.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load by id
  on(LeasingAgreementsActions.loadById, (state) => ({
    ...state,
    loading: true,
  })),
  on(LeasingAgreementsActions.loadByIdSuccess, (state, { agreement }) => {
    return agreementsAdapter.upsertOne(agreement, { ...state, loading: false });
  }),
  on(LeasingAgreementsActions.loadByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load by client
  on(LeasingAgreementsActions.loadByClient, (state) => ({
    ...state,
    loading: true,
  })),
  on(LeasingAgreementsActions.loadByClientSuccess, (state, { agreements }) => {
    return agreementsAdapter.setAll(agreements, { ...state, loading: false });
  }),
  on(LeasingAgreementsActions.loadByClientFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // History
  on(LeasingAgreementsActions.loadHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(LeasingAgreementsActions.loadHistorySuccess, (state, { history }) => ({
    ...state,
    loading: false,
    history,
  })),
  on(LeasingAgreementsActions.loadHistoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(LeasingAgreementsActions.create, (state) => ({ ...state, loading: true })),
  on(LeasingAgreementsActions.createSuccess, (state, { agreement }) => {
    return agreementsAdapter.addOne(agreement, { ...state, loading: false });
  }),
  on(LeasingAgreementsActions.createFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update
  on(LeasingAgreementsActions.update, (state) => ({ ...state, loading: true })),
  on(LeasingAgreementsActions.updateSuccess, (state, { agreement }) => {
    return agreementsAdapter.upsertOne(agreement, { ...state, loading: false });
  }),
  on(LeasingAgreementsActions.updateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete
  on(LeasingAgreementsActions.delete, (state) => ({ ...state, loading: true })),
  on(LeasingAgreementsActions.deleteSuccess, (state, { id }) => {
    return agreementsAdapter.removeOne(id, { ...state, loading: false });
  }),
  on(LeasingAgreementsActions.deleteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Workflow
  on(LeasingAgreementsActions.workflowAction, (state) => ({
    ...state,
    loading: true,
  })),
  on(LeasingAgreementsActions.workflowActionSuccess, (state, { agreement }) => {
    return agreementsAdapter.upsertOne(agreement, {
      ...state,
      loading: false,
    });
  }),
  on(LeasingAgreementsActions.workflowActionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const leasingAgreementsFeature = createFeature({
  name: LEASING_AGREEMENTS_FEATURE_KEY,
  reducer: leasingAgreementsReducer,
  extraSelectors: ({
    selectLoading,
    selectError,
    selectSelectedId,
    selectHistory,
  }) => ({
    selectLoading,
    selectError,
    selectSelectedId,
    selectHistory,
  }),
});
