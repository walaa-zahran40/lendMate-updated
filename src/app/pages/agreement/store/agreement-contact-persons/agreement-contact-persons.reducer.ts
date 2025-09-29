import { createFeature, createReducer, on } from '@ngrx/store';
import {
  initialState,
  agreementContactPersonAdapter,
  agreementContactPersonsFeatureKey,
} from './agreement-contact-persons.state';
import { AgreementContactPersonsActions as A } from './agreement-contact-persons.actions';

export const agreementContactPersonsReducer = createReducer(
  initialState,

  // List
  on(A.loadAllRequested, (state) => ({
    ...state,
    listLoading: true,
    listError: null,
  })),
  on(A.loadAllSucceeded, (state, { response, pageNumber }) => {
    const next = agreementContactPersonAdapter.upsertMany(
      response.items,
      state
    );
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

  // By agreement
  on(A.loadByAgreementRequested, (state) => ({
    ...state,
    byAgreementLoading: true,
    byAgreementError: null,
  })),
  on(A.loadByAgreementSucceeded, (state, { agreementId, contactPersons }) => {
    const next = agreementContactPersonAdapter.upsertMany(
      contactPersons,
      state
    );
    return {
      ...next,
      byAgreementLoading: false,
      byAgreementMap: {
        ...next.byAgreementMap,
        [agreementId]: contactPersons.map((o) => o.id),
      },
    };
  }),
  on(A.loadByAgreementFailed, (state, { error }) => ({
    ...state,
    byAgreementLoading: false,
    byAgreementError: error,
  })),

  // Single
  on(A.loadOneRequested, (state) => ({
    ...state,
    singleLoading: true,
    singleError: null,
  })),
  on(A.loadOneSucceeded, (state, { contactPerson }) => ({
    ...agreementContactPersonAdapter.upsertOne(contactPerson, state),
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
    const next = agreementContactPersonAdapter.addOne(contactPerson, state);

    const currIds = next.byAgreementMap[contactPerson.agreementId] ?? [];
    const byAgreementMap = currIds.includes(contactPerson.id)
      ? next.byAgreementMap
      : {
          ...next.byAgreementMap,
          [contactPerson.agreementId]: [...currIds, contactPerson.id],
        };

    return {
      ...next,
      createLoading: false,
      byAgreementMap,
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
    const next = agreementContactPersonAdapter.upsertOne(contactPerson, state);
    if (!prev) return { ...next, updateLoading: false };

    let byAgreementMap = next.byAgreementMap;

    // remove from old
    if (prev.agreementId !== contactPerson.agreementId) {
      const oldList = (byAgreementMap[prev.agreementId] ?? []).filter(
        (x) => x !== contactPerson.id
      );
      // add to new
      const newList = [
        ...(byAgreementMap[contactPerson.agreementId] ?? []),
        contactPerson.id,
      ];

      byAgreementMap = {
        ...byAgreementMap,
        [prev.agreementId]: oldList,
        [contactPerson.agreementId]: Array.from(new Set(newList)),
      };
    }

    return { ...next, updateLoading: false, byAgreementMap };
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
    const next = agreementContactPersonAdapter.removeOne(id, state);
    if (!contactPerson) return { ...next, deleteLoading: false };

    const currIds = next.byAgreementMap[contactPerson.agreementId] ?? [];
    const filtered = currIds.filter((x) => x !== id);
    const byAgreementMap = {
      ...next.byAgreementMap,
      [contactPerson.agreementId]: filtered,
    };

    return { ...next, deleteLoading: false, byAgreementMap };
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
    byAgreementError: null,
    singleError: null,
    createError: null,
    updateError: null,
    deleteError: null,
  }))
);

export const agreementContactPersonsFeature = createFeature({
  name: agreementContactPersonsFeatureKey,
  reducer: agreementContactPersonsReducer,
});
