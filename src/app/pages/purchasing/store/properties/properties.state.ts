import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Property } from './property.model';

export interface State extends EntityState<Property> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: Property[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<Property> = createEntityAdapter<Property>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});
