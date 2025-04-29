import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as A from './client-identity-types.actions';
import { ClientIdentityType } from './client-identity-type.model';

export const CLIENT_IDENTITY_TYPES_FEATURE_KEY = 'clientIdentityTypes';

export interface State extends EntityState<ClientIdentityType> {
  totalCount: number;
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<ClientIdentityType> = createEntityAdapter();
export const initialState: State = adapter.getInitialState({
  totalCount: 0,
  loading: false,
  error: null,
});

const _reducer = createReducer(
  initialState,
  on(A.loadAllClientIdentityTypes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(A.loadAllClientIdentityTypesSuccess, (state, { items, totalCount }) =>
    adapter.setAll(items, { ...state, loading: false, totalCount })
  ),
  on(A.loadAllClientIdentityTypesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function clientIdentityTypesReducer(
  state: State | undefined,
  action: Action
) {
  return _reducer(state, action);
}
