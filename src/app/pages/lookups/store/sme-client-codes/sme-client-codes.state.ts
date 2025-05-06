import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SMEClientCode } from './sme-client-codes.model';

export interface State extends EntityState<SMEClientCode> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<SMEClientCode> =
  createEntityAdapter<SMEClientCode>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
