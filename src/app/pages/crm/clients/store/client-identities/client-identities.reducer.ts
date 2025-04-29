import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as ClientIdentitiesActions from './client-identities.actions';
import { ClientIdentity } from './client-identities.service';

export interface State extends EntityState<ClientIdentity> {
  loading: boolean;
  error: any;
  totalCount: number;
}

export const adapter: EntityAdapter<ClientIdentity> =
  createEntityAdapter<ClientIdentity>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
  totalCount: 0,
});

export const clientIdentitiesReducer = createReducer(
  initialState,
  on(ClientIdentitiesActions.loadAllClientIdentities, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    ClientIdentitiesActions.loadAllClientIdentitiesSuccess,
    (state, { result }) =>
      adapter.setAll(result.items, {
        ...state,
        loading: false,
        totalCount: result.totalCount,
      })
  ),
  on(
    ClientIdentitiesActions.loadAllClientIdentitiesFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),

  on(ClientIdentitiesActions.loadClientIdentitiesByClient, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    ClientIdentitiesActions.loadClientIdentitiesByClientSuccess,
    (state, { items }) => adapter.setAll(items, { ...state, loading: false })
  ),
  on(
    ClientIdentitiesActions.loadClientIdentitiesByClientFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),

  on(ClientIdentitiesActions.createClientIdentitySuccess, (state, { entity }) =>
    adapter.addOne(entity, state)
  ),
  on(ClientIdentitiesActions.updateClientIdentitySuccess, (state, { entity }) =>
    adapter.upsertOne(entity, state)
  ),
  on(ClientIdentitiesActions.deleteClientIdentitySuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  )
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
