import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CommunicationFlowType } from './communication-flow-type.model';

export interface State extends EntityState<CommunicationFlowType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<CommunicationFlowType> =
  createEntityAdapter<CommunicationFlowType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
