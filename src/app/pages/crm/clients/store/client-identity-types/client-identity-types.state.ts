import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ClientIdentityType } from './client-identity-type.model';

export interface State extends EntityState<ClientIdentityType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<ClientIdentityType> =
  createEntityAdapter<ClientIdentityType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
