// agreement-files.reducer.ts
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on, createSelector } from '@ngrx/store';
import { AgreementFilesActions } from './agreement-files.actions';
import { AgreementFile } from './agreement-file.model';

export const AGREEMENT_FILES_FEATURE_KEY = 'agreementFiles';

export interface AgreementFilesState extends EntityState<AgreementFile> {
  // 🔧 remove all "?" optionals
  loaded: boolean;
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  currentAgreementId: number | null;
  creating: boolean;
  updating: boolean;
  deletingIds: number[];
}

export const agreementFilesAdapter = createEntityAdapter<AgreementFile>({
  selectId: (e) => e.id,
  sortComparer: (a, b) => b.id - a.id,
});

const initialState: AgreementFilesState = agreementFilesAdapter.getInitialState(
  {
    loaded: false,
    loading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    currentAgreementId: null,
    creating: false,
    updating: false,
    deletingIds: [],
  }
);

const reducer = createReducer(
  initialState,
  on(AgreementFilesActions.clearError, (state) => ({ ...state, error: null })),
  on(AgreementFilesActions.loadPage, (state, { pageNumber }) => ({
    ...state,
    loading: true,
    error: null,
    currentPage: pageNumber ?? 1,
    currentAgreementId: null,
  })),
  on(AgreementFilesActions.loadPageSuccess, (state, { response }) => {
    const next = agreementFilesAdapter.setAll(response.items, state);
    return {
      ...next,
      loaded: true,
      loading: false,
      totalCount: response.totalCount,
    };
  }),
  on(AgreementFilesActions.loadPageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AgreementFilesActions.loadByAgreement, (state, { agreementId }) => ({
    ...state,
    loading: true,
    error: null,
    currentAgreementId: agreementId,
  })),
  on(
    AgreementFilesActions.loadByAgreementSuccess,
    (state, { response, agreementId }) => {
      const next = agreementFilesAdapter.setAll(response.items, state);
      return {
        ...next,
        loaded: true,
        loading: false,
        totalCount: response.totalCount,
        currentAgreementId: agreementId,
      };
    }
  ),
  on(AgreementFilesActions.loadByAgreementFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AgreementFilesActions.loadOne, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AgreementFilesActions.loadOneSuccess, (state, { entity }) => {
    const next = agreementFilesAdapter.upsertOne(entity, state);
    return { ...next, loading: false, loaded: true };
  }),
  on(AgreementFilesActions.loadOneFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AgreementFilesActions.create, (state) => ({
    ...state,
    creating: true,
    error: null,
  })),
  on(AgreementFilesActions.createSuccess, (state, { entity }) => {
    const next = agreementFilesAdapter.addOne(entity, state);
    return { ...next, creating: false, totalCount: state.totalCount + 1 };
  }),
  on(AgreementFilesActions.createFailure, (state, { error }) => ({
    ...state,
    creating: false,
    error,
  })),

  on(AgreementFilesActions.update, (state) => ({
    ...state,
    updating: true,
    error: null,
  })),
  on(AgreementFilesActions.updateSuccess, (state, { entity }) => {
    const next = agreementFilesAdapter.upsertOne(entity, state);
    return { ...next, updating: false };
  }),
  on(AgreementFilesActions.updateFailure, (state, { error }) => ({
    ...state,
    updating: false,
    error,
  })),

  on(AgreementFilesActions.delete, (state, { id }) => ({
    ...state,
    deletingIds: [...state.deletingIds, id],
    error: null,
  })),
  on(AgreementFilesActions.deleteSuccess, (state, { id }) => {
    const next = agreementFilesAdapter.removeOne(id, state);
    return {
      ...next,
      deletingIds: next.deletingIds.filter((x) => x !== id),
      totalCount: Math.max(0, state.totalCount - 1),
    };
  }),
  on(AgreementFilesActions.deleteFailure, (state, { error }) => ({
    ...state,
    error,
    deletingIds: state.deletingIds.filter((x) => !!x),
  }))
);

// ✅ extraSelectors must return memoized selectors
export const agreementFilesFeature = createFeature({
  name: AGREEMENT_FILES_FEATURE_KEY,
  reducer,
  extraSelectors: ({ selectAgreementFilesState }) => {
    const { selectAll, selectEntities, selectIds, selectTotal } =
      agreementFilesAdapter.getSelectors(selectAgreementFilesState);

    const selectLoaded = createSelector(
      selectAgreementFilesState,
      (s) => s.loaded
    );
    const selectLoading = createSelector(
      selectAgreementFilesState,
      (s) => s.loading
    );
    const selectError = createSelector(
      selectAgreementFilesState,
      (s) => s.error
    );
    const selectTotalCount = createSelector(
      selectAgreementFilesState,
      (s) => s.totalCount
    );
    const selectCurrentAgreementId = createSelector(
      selectAgreementFilesState,
      (s) => s.currentAgreementId
    );
    const selectCurrentPage = createSelector(
      selectAgreementFilesState,
      (s) => s.currentPage
    );
    const selectCreating = createSelector(
      selectAgreementFilesState,
      (s) => s.creating
    );
    const selectUpdating = createSelector(
      selectAgreementFilesState,
      (s) => s.updating
    );
    const selectDeletingIds = createSelector(
      selectAgreementFilesState,
      (s) => s.deletingIds
    );

    return {
      selectAll,
      selectEntities,
      selectIds,
      selectTotal,
      selectLoaded,
      selectLoading,
      selectError,
      selectTotalCount,
      selectCurrentAgreementId,
      selectCurrentPage,
      selectCreating,
      selectUpdating,
      selectDeletingIds,
    };
  },
});

export const {
  name: agreementFilesFeatureKey,
  reducer: agreementFilesReducer,
  selectAgreementFilesState,
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
  selectLoaded,
  selectLoading,
  selectError,
  selectTotalCount,
  selectCurrentAgreementId,
  selectCurrentPage,
  selectCreating,
  selectUpdating,
  selectDeletingIds,
} = agreementFilesFeature;
