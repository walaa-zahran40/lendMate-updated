import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, ClientFilesState } from './client-files.state';

// Feature selector
export const selectClientFilesState =
  createFeatureSelector<ClientFilesState>('clientFiles');

// Entity adapter selectors
const { selectAll, selectTotal } = adapter.getSelectors(selectClientFilesState);

// Exposed selectors
export const selectClientFiles = selectAll;
export const selectClientFilesTotal = selectTotal;
export const selectClientFilesHistory = createSelector(
  selectClientFilesState,
  (state) => state.history
);
export const selectCurrentClientFile = createSelector(
  selectClientFilesState,
  (state) => state.current
);
export const selectClientFilesLoading = createSelector(
  selectClientFilesState,
  (state) => state.loading
);
export const selectClientFilesError = createSelector(
  selectClientFilesState,
  (state) => state.error
);
