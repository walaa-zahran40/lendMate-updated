import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { InterestType } from './interest-type.model';

export interface State extends EntityState<InterestType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: InterestType[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<InterestType> =
  createEntityAdapter<InterestType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
