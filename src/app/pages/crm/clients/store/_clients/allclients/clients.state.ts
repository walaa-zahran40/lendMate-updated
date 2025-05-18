import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Client } from './client.model';

export interface State extends EntityState<Client> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Client> = createEntityAdapter<Client>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
