import { createReducer, on } from '@ngrx/store';
import * as Actions from './company-types.actions';
import { initialCompanyTypesState } from './company-types.state';

export const companyTypesReducer = createReducer(
  initialCompanyTypesState,
  on(Actions.loadCompanyTypes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadCompanyTypesSuccess, (state, { items, totalCount }) => ({
    ...state,
    items,
    totalCount,
    loading: false,
  })),
  on(Actions.loadCompanyTypesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadCompanyTypesHistory, (state) => ({ ...state, loading: true })),
  on(Actions.loadCompanyTypesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadCompanyTypesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadCompanyType, (state) => ({ ...state, loading: true })),
  on(Actions.loadCompanyTypeSuccess, (state, { companyType }) => ({
    ...state,
    current: companyType,
    loading: false,
  })),
  on(Actions.loadCompanyTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createCompanyType, (state) => ({ ...state, loading: true })),
  on(Actions.createCompanyTypeSuccess, (state, { companyType }) => ({
    ...state,
    items: [...state.items, companyType],
    loading: false,
  })),
  on(Actions.createCompanyTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateCompanyType, (state) => ({ ...state, loading: true })),
  on(Actions.updateCompanyTypeSuccess, (state, { companyType }) => ({
    ...state,
    items: state.items.map((ct) =>
      ct.id === companyType.id ? companyType : ct
    ),
    loading: false,
  })),
  on(Actions.updateCompanyTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteCompanyType, (state) => ({ ...state, loading: true })),
  on(Actions.deleteCompanyTypeSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteCompanyTypeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
