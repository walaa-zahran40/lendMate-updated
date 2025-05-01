import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CallType } from './call-type.model';

export interface State extends EntityState<CallType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<CallType> = createEntityAdapter<CallType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
