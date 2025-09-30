import { createFeature, createReducer, on } from '@ngrx/store';
import {
  initialState,
  agreementContactPersonAdapter,
  agreementContactPersonsFeatureKey,
} from './agreement-contact-persons.state';
import { AgreementContactPersonsActions as A } from './agreement-contact-persons.actions';

export const agreementContactPersonsReducer = createReducer(
  initialState,

  // ---------- List ----------
  on(A.loadAllRequested, (state) => ({
    ...state,
    listLoading: true,
    listError: null,
  })),
  on(A.loadAllSucceeded, (state, { response, pageNumber }) => {
    const next = agreementContactPersonAdapter.upsertMany(
      response.items!,
      state
    );

    // Option 1: fallback to items.length (always a number)
    const total = response.totalCount ?? response.items!.length;

    // Option 2: fallback to null if server doesn't send a count
    // const total = response.totalCount ?? null;

    return {
      ...next,
      listLoading: false,
      listError: null,
      listTotalCount: total, // now guaranteed number | null
      listPageNumber: pageNumber ?? null,
    };
  }),

  on(A.loadAllFailed, (state, { error }) => ({
    ...state,
    listLoading: false,
    listError: error ?? 'Failed to load',
    // (optional) keep last known page number; don’t touch total here
  })),

  on(A.loadAllFailed, (state, { error }) => ({
    ...state,
    listLoading: false,
    listError: error,
  })),

  // ---------- By Agreement (now per-agreement loading/error maps) ----------
  on(A.loadByAgreementRequested, (state, { agreementId }) => ({
    ...state,
    byAgreementLoadingMap: {
      ...state.byAgreementLoadingMap,
      [agreementId]: true,
    },
    byAgreementErrorMap: {
      ...state.byAgreementErrorMap,
      [agreementId]: null,
    },
  })),
  on(A.loadByAgreementSucceeded, (state, { agreementId, contactPersons }) => {
    const next = agreementContactPersonAdapter.upsertMany(
      contactPersons,
      state
    );

    // Narrow (number | undefined)[] -> number[] with a TS type guard
    const ids = contactPersons
      .map((cp) => cp.id)
      .filter((id): id is number => id != null);

    return {
      ...next,
      byAgreementMap: {
        ...next.byAgreementMap,
        [agreementId]: Array.from(new Set(ids)), // optional: dedupe
      },
      byAgreementLoadingMap: {
        ...next.byAgreementLoadingMap,
        [agreementId]: false,
      },
      byAgreementErrorMap: {
        ...next.byAgreementErrorMap,
        [agreementId]: null,
      },
    };
  }),

  on(A.loadByAgreementFailed, (state, { agreementId, error }) => ({
    ...state,
    byAgreementLoadingMap: {
      ...state.byAgreementLoadingMap,
      [agreementId]: false,
    },
    byAgreementErrorMap: {
      ...state.byAgreementErrorMap,
      [agreementId]: error,
    },
  })),

  // ---------- Single ----------
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

  // ---------- Create ----------
  on(A.createRequested, (state) => ({
    ...state,
    createLoading: true,
    createError: null,
  })),
  on(A.createSucceeded, (state, { contactPerson }) => {
    const next = agreementContactPersonAdapter.addOne(contactPerson, state);

    const agId = contactPerson.agreementId;
    const id = contactPerson.id;

    // If we don't have a definite agreementId or id, just end the loading state
    if (agId == null || id == null) {
      return {
        ...next,
        createLoading: false,
        createError: null,
      };
    }

    const currIds = next.byAgreementMap[agId] ?? [];
    // ensure number[] and dedupe
    const byAgreementMap = {
      ...next.byAgreementMap,
      [agId]: Array.from(new Set<number>([...currIds, id])),
    };

    return {
      ...next,
      createLoading: false,
      createError: null,
      byAgreementMap,
    };
  }),

  on(A.createFailed, (state, { error }) => ({
    ...state,
    createLoading: false,
    createError: error,
  })),

  // ---------- Update ----------
  on(A.updateRequested, (state) => ({
    ...state,
    updateLoading: true,
    updateError: null,
  })),
  on(A.updateSucceeded, (state, { contactPerson }) => {
    const id = contactPerson.id;
    const next = agreementContactPersonAdapter.upsertOne(contactPerson, state);

    // if we don't have a definite id, just finish the loading state
    if (id == null) {
      return { ...next, updateLoading: false, updateError: null };
    }

    const prev = state.entities[id];

    // If we didn't have it before, nothing to move between maps
    if (!prev) {
      return { ...next, updateLoading: false, updateError: null };
    }

    let byAgreementMap = next.byAgreementMap;

    const prevAgId = prev.agreementId ?? null;
    const newAgId = contactPerson.agreementId ?? null;

    // Only adjust lists if agreementId actually changed and both ids are known
    if (prevAgId != null && newAgId != null && prevAgId !== newAgId) {
      const oldList = (byAgreementMap[prevAgId] ?? []).filter((x) => x !== id);
      const newList = Array.from(
        new Set<number>([...(byAgreementMap[newAgId] ?? []), id])
      );

      byAgreementMap = {
        ...byAgreementMap,
        [prevAgId]: oldList,
        [newAgId]: newList,
      };
    }

    return { ...next, updateLoading: false, updateError: null, byAgreementMap };
  }),

  on(A.updateFailed, (state, { error }) => ({
    ...state,
    updateLoading: false,
    updateError: error,
  })),

  // ---------- Delete ----------
  on(A.deleteRequested, (state) => ({
    ...state,
    deleteLoading: true,
    deleteError: null,
  })),
  on(A.deleteSucceeded, (state, { id }) => {
    const contactPerson = state.entities[id];
    const next = agreementContactPersonAdapter.removeOne(id, state);
    if (!contactPerson)
      return { ...next, deleteLoading: false, deleteError: null };

    const agId = contactPerson.agreementId!;
    const currIds = next.byAgreementMap[agId] ?? [];
    const filtered = currIds.filter((x) => x !== id);

    return {
      ...next,
      deleteLoading: false,
      deleteError: null,
      byAgreementMap: {
        ...next.byAgreementMap,
        [agId]: filtered,
      },
    };
  }),
  on(A.deleteFailed, (state, { error }) => ({
    ...state,
    deleteLoading: false,
    deleteError: error,
  })),

  // ---------- Utility ----------
  on(A.clearErrors, (state) => ({
    ...state,
    listError: null,
    singleError: null,
    createError: null,
    updateError: null,
    deleteError: null,
    // clear per-agreement errors
    byAgreementErrorMap: {},
  }))
);

export const agreementContactPersonsFeature = createFeature({
  name: agreementContactPersonsFeatureKey,
  reducer: agreementContactPersonsReducer,
});
