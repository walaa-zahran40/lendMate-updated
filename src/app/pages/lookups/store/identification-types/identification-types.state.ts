import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IdentificationType } from './identification-type.model';

export interface State extends EntityState<IdentificationType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: IdentificationType[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<IdentificationType> =
  createEntityAdapter<IdentificationType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
