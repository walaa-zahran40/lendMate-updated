import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Meeting } from './meeting.model';

export interface State extends EntityState<Meeting> {
  loadedId: number | null;
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Meeting> = createEntityAdapter<Meeting>();

export const initialState: State = adapter.getInitialState({
  loadedId: null,
  loading: false,
  error: null,
});
