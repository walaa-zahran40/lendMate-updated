import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CommunicationType } from './communication-type.model';

export interface State extends EntityState<CommunicationType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<CommunicationType> =
  createEntityAdapter<CommunicationType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
