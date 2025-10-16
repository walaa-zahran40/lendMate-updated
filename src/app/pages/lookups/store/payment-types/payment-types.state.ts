import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PaymentType } from './payment-type.model';

export interface State extends EntityState<PaymentType> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: PaymentType[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<PaymentType> =
  createEntityAdapter<PaymentType>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
