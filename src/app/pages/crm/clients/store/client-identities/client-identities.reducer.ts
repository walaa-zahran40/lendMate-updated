import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-identities.actions';
import { initialClientIdentitiesState } from './client-identities.state';

export const clientIdentityReducer = createReducer(
  initialClientIdentitiesState,
  on(Actions.loadClientIdentities, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadClientIdentitiesSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(Actions.loadClientIdentitiesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientIdentitiesHistory, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientIdentitiesHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false,
  })),
  on(Actions.loadClientIdentitiesHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.loadClientIdentity, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.loadClientIdentitySuccess, (state, { client }) => ({
    ...state,
    current: client,
    loading: false,
  })),
  on(Actions.loadClientIdentityFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.createClientIdentity, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.createClientIdentitySuccess, (state, { client }) => ({
    ...state,
    items: [...state.items, client],
    loading: false,
  })),
  on(Actions.createClientIdentityFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.updateClientIdentity, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.updateClientIdentitySuccess, (state, { client }) => ({
    ...state,
    items: state.items.map((ct) => (ct.id === client.id ? client : ct)),
    loading: false,
  })),
  on(Actions.updateClientIdentityFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(Actions.deleteClientIdentity, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.deleteClientIdentitySuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((ct) => ct.id !== id),
    loading: false,
  })),
  on(Actions.deleteClientIdentityFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(Actions.loadClientIdentitiesByClientId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    Actions.loadClientIdentitiesByClientIdSuccess,
    (state, { items }) => ({
      ...state,
      items, // replace with just these rates
      loading: false,
    })
  ),
  on(
    Actions.loadClientIdentitiesByClientIdFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);
