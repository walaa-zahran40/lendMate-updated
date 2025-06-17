import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CallActionType } from './call-action-type.model';

export interface State extends EntityState<CallActionType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: CallActionType[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<CallActionType> =
  createEntityAdapter<CallActionType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
