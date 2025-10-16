import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Vehicle } from './vehicle.model';

export interface State extends EntityState<Vehicle> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: Vehicle[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<Vehicle> = createEntityAdapter<Vehicle>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});
