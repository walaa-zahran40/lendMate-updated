import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { VehicleManufacturer } from './vehicle-manufacturer.model';

export interface State extends EntityState<VehicleManufacturer> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: VehicleManufacturer[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<VehicleManufacturer> =
  createEntityAdapter<VehicleManufacturer>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  //History management
  history: [],
  historyLoaded: false,
  historyError: null,
});
