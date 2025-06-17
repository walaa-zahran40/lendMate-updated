import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PaymentMethod } from './payment-method.model';

export interface State extends EntityState<PaymentMethod> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: PaymentMethod[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<PaymentMethod> =
  createEntityAdapter<PaymentMethod>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
