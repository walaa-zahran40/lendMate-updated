import { createReducer, on } from '@ngrx/store';
import * as ClientsAddressesActions from './client-addresses.actions';
import { initialClientsAddressesState } from './client-addresses.state';

export const clientsAddressesReducer = createReducer(
  initialClientsAddressesState,
  on(
    ClientsAddressesActions.loadClientsAddresses,
    ClientsAddressesActions.loadClientsAddressesByClient,
    (state) => ({ ...state, loading: true, error: null })
  ),
  on(
    ClientsAddressesActions.loadClientsAddressesSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(
    ClientsAddressesActions.loadClientsAddressesByClientSuccess,
    (state, { items, totalCount }) => ({
      ...state,
      items,
      totalCount,
      loading: false,
    })
  ),
  on(
    ClientsAddressesActions.loadClientsAddressesFailure,
    ClientsAddressesActions.loadClientsAddressesByClientFailure,
    (state, { error }) => ({ ...state, loading: false, error })
  ),
  on(
    ClientsAddressesActions.createClientAddressSuccess,
    (state, { address }) => ({
      ...state,
      items: [...state.items, address],
      totalCount: state.totalCount + 1,
    })
  ),
  on(
    ClientsAddressesActions.updateClientAddressSuccess,
    (state, { address }) => ({
      ...state,
      items: state.items.map((item) =>
        item.id === address.id ? address : item
      ),
    })
  ),
  on(ClientsAddressesActions.deleteClientAddressSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((item) => item.id !== id),
    totalCount: state.totalCount - 1,
  }))
);
