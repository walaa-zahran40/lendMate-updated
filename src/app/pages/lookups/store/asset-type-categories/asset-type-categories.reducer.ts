import { createReducer, on } from '@ngrx/store';
import * as Actions from './asset-type-categories.actions';
import { initialAssetTypeCategoriesState } from './asset-type-categories.state';

export const assetTypeCategoriesReducer = createReducer(
  initialAssetTypeCategoriesState,
  on(Actions.loadAssetTypeCategories, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadAssetTypeCategoriesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadAssetTypeCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadAssetTypeCategoriesHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadAssetTypeCategoriesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadAssetTypeCategoriesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadAssetTypeCategory, (state) => ({ ...state, loading: true })),
  on(Actions.loadAssetTypeCategorySuccess, (state, { currency }) => ({
    ...state,
    current: currency,
    loading: false,
  })),
  on(Actions.loadAssetTypeCategoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createAssetTypeCategory, (state) => ({ ...state, loading: true })),
  on(Actions.createAssetTypeCategorySuccess, (state, { currency }) => ({
    ...state,
    items: [...state.items, currency],
    loading: false,
  })),
  on(Actions.createAssetTypeCategoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateAssetTypeCategory, (state) => ({ ...state, loading: true })),
  on(Actions.updateAssetTypeCategorySuccess, (state, { currency }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === currency.id ? currency : ct
    ),
    loading: false,
  })),
  on(Actions.updateAssetTypeCategoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteAssetTypeCategory, (state) => ({ ...state, loading: true })),
  on(Actions.deleteAssetTypeCategorySuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteAssetTypeCategoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
