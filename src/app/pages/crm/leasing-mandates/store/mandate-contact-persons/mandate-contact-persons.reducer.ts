import { createFeature, createReducer, on } from '@ngrx/store';
import {
  initialState,
  mandateContactPersonAdapter,
  mandateContactPersonsFeatureKey,
} from './mandate-contact-persons.state';
import { MandateContactPersonsActions as A } from './mandate-contact-persons.actions';

export const mandateContactPersonsReducer = createReducer(
  initialState,

  // List
  on(A.loadAllRequested, (state) => ({
    ...state,
    listLoading: true,
    listError: null,
  })),
  on(A.loadAllSucceeded, (state, { response, pageNumber }) => {
    const next = mandateContactPersonAdapter.upsertMany(response.items, state);
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
  on(A.loadByMandateSucceeded, (state, { mandateId, contactPersons }) => {
    const next = mandateContactPersonAdapter.upsertMany(contactPersons, state);
    return {
      ...next,
      byMandateLoading: false,
      byMandateMap: {
        ...next.byMandateMap,
        [mandateId]: contactPersons.map((o) => o.id),
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
  on(A.loadOneSucceeded, (state, { contactPerson }) => ({
    ...mandateContactPersonAdapter.upsertOne(contactPerson, state),
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
  on(A.createSucceeded, (state, { contactPerson }) => {
    const next = mandateContactPersonAdapter.addOne(contactPerson, state);

    const currIds = next.byMandateMap[contactPerson.mandateId] ?? [];
    const byMandateMap = currIds.includes(contactPerson.id)
      ? next.byMandateMap
      : {
          ...next.byMandateMap,
          [contactPerson.mandateId]: [...currIds, contactPerson.id],
        };

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
  on(A.updateSucceeded, (state, { contactPerson }) => {
    const prev = state.entities[contactPerson.id];
    const next = mandateContactPersonAdapter.upsertOne(contactPerson, state);
    if (!prev) return { ...next, updateLoading: false };

    let byMandateMap = next.byMandateMap;

    // remove from old
    if (prev.mandateId !== contactPerson.mandateId) {
      const oldList = (byMandateMap[prev.mandateId] ?? []).filter(
        (x) => x !== contactPerson.id
      );
      // add to new
      const newList = [
        ...(byMandateMap[contactPerson.mandateId] ?? []),
        contactPerson.id,
      ];

      byMandateMap = {
        ...byMandateMap,
        [prev.mandateId]: oldList,
        [contactPerson.mandateId]: Array.from(new Set(newList)),
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
    // Find contactPerson to remove from the map
    const contactPerson = state.entities[id];
    const next = mandateContactPersonAdapter.removeOne(id, state);
    if (!contactPerson) return { ...next, deleteLoading: false };

    const currIds = next.byMandateMap[contactPerson.mandateId] ?? [];
    const filtered = currIds.filter((x) => x !== id);
    const byMandateMap = {
      ...next.byMandateMap,
      [contactPerson.mandateId]: filtered,
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

export const mandateContactPersonsFeature = createFeature({
  name: mandateContactPersonsFeatureKey,
  reducer: mandateContactPersonsReducer,
});
