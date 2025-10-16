// first-claim-statuses.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, State } from './first-claim-statuses.state';

// 1) Single source of truth for the feature key
export const selectFeature = createFeatureSelector<State>('firstClaimStatuses');

// 2) Entity selectors wired to the feature slice
const {
  selectAll: _selectAll,
  selectEntities: _selectEntities,
  selectIds: _selectIds,
  selectTotal: _selectTotal,
} = adapter.getSelectors();

// 3) Exposed selectors

// Entities
export const selectAllFirstClaimStatus = createSelector(
  selectFeature,
  _selectAll
);
export const selectFirstClaimStatusEntities = createSelector(
  selectFeature,
  _selectEntities
);
export const selectFirstClaimStatusIds = createSelector(
  selectFeature,
  _selectIds
);
export const selectFirstClaimStatusTotalCount = createSelector(
  selectFeature,
  _selectTotal
);

// UI state
export const selectFirstClaimStatusLoading = createSelector(
  selectFeature,
  (state) => state.loading
);
export const selectFirstClaimStatusError = createSelector(
  selectFeature,
  (state) => state.error
);
export const selectLoadedId = createSelector(
  selectFeature,
  (state) => state.loadedId
);

// Current entity by loadedId
export const selectCurrent = createSelector(
  selectFirstClaimStatusEntities,
  selectLoadedId,
  (entities, id) => (id != null ? entities[id] : null)
);

// 4) History (✅ fixed feature key and added null-safety)
export const selectHistory = createSelector(
  selectFeature,
  (state) => state.history ?? []
);
export const selectHistoryLoaded = createSelector(
  selectFeature,
  (state) => !!state.historyLoaded
);
export const selectHistoryError = createSelector(
  selectFeature,
  (state) => state.historyError ?? null
);
