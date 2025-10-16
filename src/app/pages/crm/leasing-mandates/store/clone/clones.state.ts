import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Clone } from './clone.model';

export interface State extends EntityState<Clone> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Clone> = createEntityAdapter<Clone>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
