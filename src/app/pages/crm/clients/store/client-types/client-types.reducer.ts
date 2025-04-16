import { createReducer, on } from '@ngrx/store';
import * as ClientTypeActions from './client-types.actions';
import { initialClientTypesState } from './client-types.state';

export const clientTypesReducer = createReducer(
  initialClientTypesState,
  on(ClientTypeActions.loadClientTypes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ClientTypeActions.loadClientTypesSuccess, (state, { types }) => ({
    ...state,
    types,
    loading: false,
  })),
  on(ClientTypeActions.loadClientTypesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
