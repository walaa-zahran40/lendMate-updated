import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { RentStructureType } from './rent-structure-type.model';

export interface State extends EntityState<RentStructureType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: RentStructureType[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<RentStructureType> =
  createEntityAdapter<RentStructureType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
