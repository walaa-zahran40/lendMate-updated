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
  on(A.createSucceeded, (state, { officer }) => {
    const next = mandateOfficerAdapter.addOne(officer, state);

    const currIds = next.byMandateMap[officer.mandateId] ?? [];
    const byMandateMap = currIds.includes(officer.id)
      ? next.byMandateMap
      : { ...next.byMandateMap, [officer.mandateId]: [...currIds, officer.id] };

    return {
      ...next,
      createLoading: false,
      byMandateMap,
    };
  }),

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
  on(A.updateSucceeded, (state, { officer }) => {
    const prev = state.entities[officer.id];
    const next = mandateOfficerAdapter.upsertOne(officer, state);
    if (!prev) return { ...next, updateLoading: false };

    let byMandateMap = next.byMandateMap;

    // remove from old
    if (prev.mandateId !== officer.mandateId) {
      const oldList = (byMandateMap[prev.mandateId] ?? []).filter(
        (x) => x !== officer.id
      );
      // add to new
      const newList = [...(byMandateMap[officer.mandateId] ?? []), officer.id];

      byMandateMap = {
        ...byMandateMap,
        [prev.mandateId]: oldList,
        [officer.mandateId]: Array.from(new Set(newList)),
      };
    }

    return { ...next, updateLoading: false, byMandateMap };
  }),

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
  on(A.deleteSucceeded, (state, { id }) => {
    // Find officer to remove from the map
    const officer = state.entities[id];
    const next = mandateOfficerAdapter.removeOne(id, state);
    if (!officer) return { ...next, deleteLoading: false };

    const currIds = next.byMandateMap[officer.mandateId] ?? [];
    const filtered = currIds.filter((x) => x !== id);
    const byMandateMap = {
      ...next.byMandateMap,
      [officer.mandateId]: filtered,
    };

    return { ...next, deleteLoading: false, byMandateMap };
  }),

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
