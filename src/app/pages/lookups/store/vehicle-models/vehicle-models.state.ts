import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { VehicleModel } from './vehicle-model.model';

export interface State extends EntityState<VehicleModel> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: VehicleModel[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<VehicleModel> =
  createEntityAdapter<VehicleModel>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});
