import { createFeature, createReducer, on } from '@ngrx/store';
import {
  initialState,
  mandateOfficerAdapter,
  mandateOfficersFeatureKey,
} from './mandate-officers.state';
import { MandateOfficersActions as A } from './mandate-officers.actions';

export const mandateOfficersReducer = createReducer(
  initialState,

  // List
  on(A.loadAllRequested, (state) => ({
    ...state,
    listLoading: true,
    listError: null,
  })),
  on(A.loadAllSucceeded, (state, { response, pageNumber }) => {
    const next = mandateOfficerAdapter.upsertMany(response.items, state);
    return {
      ...next,
      listLoading: false,
      listTotalCount: response.totalCount,
      listPageNumber: pageNumber ?? null,
    };
  }),
  on(A.loadAllFailed, (state, { error }) => ({
    ...state,
    listLoading: false,
    listError: error,
  })),

  // By mandate
  on(A.loadByMandateRequested, (state) => ({
    ...state,
    byMandateLoading: true,
    byMandateError: null,
  })),
  on(A.loadByMandateSucceeded, (state, { mandateId, officers }) => {
    const next = mandateOfficerAdapter.upsertMany(officers, state);
    return {
      ...next,
      byMandateLoading: false,
      byMandateMap: {
        ...next.byMandateMap,
        [mandateId]: officers.map((o) => o.id),
      },
    };
  }),
  on(A.loadByMandateFailed, (state, { error }) => ({
    ...state,
    byMandateLoading: false,
    byMandateError: error,
  })),

  // Single
  on(A.loadOneRequested, (state) => ({
    ...state,
    singleLoading: true,
    singleError: null,
  })),
  on(A.loadOneSucceeded, (state, { officer }) => ({
    ...mandateOfficerAdapter.upsertOne(officer, state),
    singleLoading: false,
  })),
  on(A.loadOneFailed, (state, { error }) => ({
    ...state,
    singleLoading: false,
    singleError: error,
  })),

  // Create
  on(A.createRequested, (state) => ({
    ...state,
    createLoading: true,
    createError: null,
  })),
  on(A.createSucceeded, (state, { officer }) => ({
    ...mandateOfficerAdapter.addOne(officer, state),
    createLoading: false,
  })),
  on(A.createFailed, (state, { error }) => ({
    ...state,
    createLoading: false,
    createError: error,
  })),

  // Update
  on(A.updateRequested, (state) => ({
    ...state,
    updateLoading: true,
    updateError: null,
  })),
  on(A.updateSucceeded, (state, { officer }) => ({
    ...mandateOfficerAdapter.upsertOne(officer, state),
    updateLoading: false,
  })),
  on(A.updateFailed, (state, { error }) => ({
    ...state,
    updateLoading: false,
    updateError: error,
  })),

  // Delete
  on(A.deleteRequested, (state) => ({
    ...state,
    deleteLoading: true,
    deleteError: null,
  })),
  on(A.deleteSucceeded, (state, { id }) => ({
    ...mandateOfficerAdapter.removeOne(id, state),
    deleteLoading: false,
  })),
  on(A.deleteFailed, (state, { error }) => ({
    ...state,
    deleteLoading: false,
    deleteError: error,
  })),

  // Utility
  on(A.clearErrors, (state) => ({
    ...state,
    listError: null,
    byMandateError: null,
    singleError: null,
    createError: null,
    updateError: null,
    deleteError: null,
  }))
);

export const mandateOfficersFeature = createFeature({
  name: mandateOfficersFeatureKey,
  reducer: mandateOfficersReducer,
});
