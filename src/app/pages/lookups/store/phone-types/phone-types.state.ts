import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PhoneType } from './phone-type.model';

export interface State extends EntityState<PhoneType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: PhoneType[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<PhoneType> =
  createEntityAdapter<PhoneType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
