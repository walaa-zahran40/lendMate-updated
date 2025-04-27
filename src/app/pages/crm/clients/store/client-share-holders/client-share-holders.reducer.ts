import { createReducer, on } from '@ngrx/store';
import * as ShareholderActions from './client-share-holders.actions';
import { initialShareholdersState } from './client-share-holders.state';

export const clientShareholdersReducer = createReducer(
  initialShareholdersState,
  on(ShareholderActions.loadShareholders, (state) => ({
    ...state,
    loading: true,
  })),
  on(ShareholderActions.loadShareholdersSuccess, (state, { shareholders }) => ({
    ...state,
    shareholders,
    loading: false,
  })),
  on(ShareholderActions.loadShareholdersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ShareholderActions.loadAllShareholders, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    ShareholderActions.loadAllShareholdersSuccess,
    (state, { shareholders }) => ({
      ...state,
      allShareholders: shareholders,
      loading: false,
    })
  ),
  on(ShareholderActions.loadAllShareholdersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ShareholderActions.createShareholder, (state) => ({
    ...state,
    loading: true,
  })),
  on(ShareholderActions.createShareholderSuccess, (state, { shareholder }) => ({
    ...state,
    shareholders: [...state.shareholders, shareholder],
    loading: false,
  })),
  on(ShareholderActions.createShareholderFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ShareholderActions.updateShareholder, (state) => ({
    ...state,
    loading: true,
  })),
  on(ShareholderActions.updateShareholderSuccess, (state, { shareholder }) => ({
    ...state,
    shareholders: state.shareholders.map((s) =>
      s.id === shareholder.id ? shareholder : s
    ),
    loading: false,
  })),
  on(ShareholderActions.updateShareholderFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ShareholderActions.deleteShareholder, (state) => ({
    ...state,
    loading: true,
  })),
  on(ShareholderActions.deleteShareholderSuccess, (state, { id }) => ({
    ...state,
    shareholders: state.shareholders.filter((s) => s.id !== id),
    loading: false,
  })),
  on(ShareholderActions.deleteShareholderFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ShareholderActions.loadShareholdersHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    ShareholderActions.loadShareholdersHistorySuccess,
    (state, { history }) => ({ ...state, history, loading: false })
  ),
  on(ShareholderActions.loadShareholdersHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
