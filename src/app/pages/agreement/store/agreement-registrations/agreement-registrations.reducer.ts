// src/app/features/leasing-agreement-registrations/state/leasing-agreement-registrations.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AgreementRegistration } from './agreement-registration.model';
import { LeasingAgreementRegistrationsActions as A } from './agreement-registrations.actions';

export const FEATURE_KEY = 'leasingAgreementRegistrations';

export interface State extends EntityState<AgreementRegistration> {
  loading: boolean;
  error?: unknown;
  // Optional: keep last loaded details & filters
  selectedId?: number | null;
  // If you want to retain history separately (not required)
  historyLoaded: boolean;
}

export const adapter: EntityAdapter<AgreementRegistration> =
  createEntityAdapter<AgreementRegistration>({
    selectId: (r) => r.id,
    sortComparer: (a, b) => (a.id ?? 0) - (b.id ?? 0),
  });

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: undefined,
  selectedId: null,
  historyLoaded: false,
});

export const reducer = createReducer(
  initialState,

  // Load All
  on(A.loadAll, (state) => ({ ...state, loading: true, error: undefined })),
  on(A.loadAllSuccess, (state, { items }) =>
    adapter.setAll(items, { ...state, loading: false })
  ),
  on(A.loadAllFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // History (we’ll just merge them in; you can also keep separate slice if needed)
  on(A.loadHistory, (state) => ({ ...state, loading: true, error: undefined })),
  on(A.loadHistorySuccess, (state, { items }) =>
    adapter.upsertMany(items, { ...state, loading: false, historyLoaded: true })
  ),
  on(A.loadHistoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load by Id
  on(A.loadById, (state, { id }) => ({
    ...state,
    loading: true,
    error: undefined,
    selectedId: id,
  })),
  on(A.loadByIdSuccess, (state, { item }) =>
    adapter.upsertOne(item, { ...state, loading: false })
  ),
  on(A.loadByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load by LeasingAgreementId (replace or upsert based on preference)
  on(A.loadByLeasingAgreementId, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),
  on(A.loadByLeasingAgreementIdSuccess, (state, { items }) =>
    adapter.upsertMany(items, { ...state, loading: false })
  ),
  on(A.loadByLeasingAgreementIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(A.create, (state) => ({ ...state, loading: true, error: undefined })),
  on(A.createSuccess, (state, { item }) =>
    adapter.addOne(item, { ...state, loading: false })
  ),
  on(A.createFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update
  on(A.update, (state) => ({ ...state, loading: true, error: undefined })),
  on(A.updateSuccess, (state, { item }) =>
    adapter.upsertOne(item, { ...state, loading: false })
  ),
  on(A.updateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete
  on(A.delete, (state) => ({ ...state, loading: true, error: undefined })),
  on(A.deleteSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(A.deleteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

// Adapter selectors base (used in selectors.ts)
export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
