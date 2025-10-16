import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Area } from './area.model';

export interface State extends EntityState<Area> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: Area[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<Area> = createEntityAdapter<Area>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});
