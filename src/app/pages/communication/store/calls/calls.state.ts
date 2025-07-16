import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Call } from './call.model';

export interface State extends EntityState<Call> {
  loadedId: number | null;
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Call> = createEntityAdapter<Call>();

export const initialState: State = adapter.getInitialState({
  loadedId: null,
  loading: false,
  error: null,
});
