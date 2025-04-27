import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as Actions from './client-cr-authority-office.actions';
import { ClientCRAuthorityOffice } from './client-cr-authority-office.model';

export const clientCRAuthorityOfficesFeatureKey = 'clientCRAuthorityOffices';

export interface State extends EntityState<ClientCRAuthorityOffice> {
  loading: boolean;
  error: any;
  totalCount: number;
}

export const adapter: EntityAdapter<ClientCRAuthorityOffice> =
  createEntityAdapter<ClientCRAuthorityOffice>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
  totalCount: 0,
});

export const reducer = createReducer(
  initialState,

  // Load All
  on(Actions.loadClientCRAuthorityOffices, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientCRAuthorityOfficesSuccess, (state, { response }) =>
    adapter.setAll(response.items, {
      ...state,
      loading: false,
      totalCount: response.totalCount,
    })
  ),
  on(Actions.loadClientCRAuthorityOfficesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load One
  on(Actions.loadClientCRAuthorityOffice, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.loadClientCRAuthorityOfficeSuccess, (state, { office }) =>
    adapter.upsertOne(office, { ...state, loading: false })
  ),
  on(Actions.loadClientCRAuthorityOfficeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(Actions.createClientCRAuthorityOffice, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.createClientCRAuthorityOfficeSuccess, (state, { office }) =>
    adapter.addOne(office, { ...state, loading: false })
  ),
  on(Actions.createClientCRAuthorityOfficeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update
  on(Actions.updateClientCRAuthorityOffice, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.updateClientCRAuthorityOfficeSuccess, (state, { office }) =>
    adapter.upsertOne(office, { ...state, loading: false })
  ),
  on(Actions.updateClientCRAuthorityOfficeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete
  on(Actions.deleteClientCRAuthorityOffice, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(Actions.deleteClientCRAuthorityOfficeSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(Actions.deleteClientCRAuthorityOfficeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
