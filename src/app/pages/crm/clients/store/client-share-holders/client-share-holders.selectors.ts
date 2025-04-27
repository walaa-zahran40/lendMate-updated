import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShareholdersState } from './client-share-holders.state';

export const selectShareholdersState =
  createFeatureSelector<ShareholdersState>('clientShareholders');
export const selectShareholders = createSelector(
  selectShareholdersState,
  (state) => state.shareholders
);
export const selectAllShareholders = createSelector(
  selectShareholdersState,
  (state) => state.allShareholders
);
export const selectShareholdersHistory = createSelector(
  selectShareholdersState,
  (state) => state.history
);
export const selectLoading = createSelector(
  selectShareholdersState,
  (state) => state.loading
);
export const selectError = createSelector(
  selectShareholdersState,
  (state) => state.error
);
