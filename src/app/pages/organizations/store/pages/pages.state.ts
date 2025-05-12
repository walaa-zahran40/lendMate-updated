import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Page } from './page.model';

export interface State extends EntityState<Page> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Page> = createEntityAdapter<Page>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
