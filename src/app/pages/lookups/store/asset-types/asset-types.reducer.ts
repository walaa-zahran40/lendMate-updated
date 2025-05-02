import { createReducer, on } from '@ngrx/store';
import * as Actions from './asset-types.actions';
import { initialAssetTypesState } from './asset-types.state';

export const assetTypeCategoriesReducer = createReducer(
  initialAssetTypesState,
  on(Actions.loadAssetTypes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadAssetTypesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadAssetTypesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadAssetTypesHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadAssetTypesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadAssetTypesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadAssetType, (state) => ({ ...state, loading: true })),
  on(Actions.loadAssetTypeSuccess, (state, { currency }) => ({
    ...state,
    current: currency,
    loading: false,
  })),
  on(Actions.loadAssetTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createAssetType, (state) => ({ ...state, loading: true })),
  on(Actions.createAssetTypeSuccess, (state, { currency }) => ({
    ...state,
    items: [...state.items, currency],
    loading: false,
  })),
  on(Actions.createAssetTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateAssetType, (state) => ({ ...state, loading: true })),
  on(Actions.updateAssetTypeSuccess, (state, { currency }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === currency.id ? currency : ct
    ),
    loading: false,
  })),
  on(Actions.updateAssetTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteAssetType, (state) => ({ ...state, loading: true })),
  on(Actions.deleteAssetTypeSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteAssetTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
