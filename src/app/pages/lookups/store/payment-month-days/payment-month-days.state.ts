import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PaymentMonthDay } from './payment-month-day.model';

export interface State extends EntityState<PaymentMonthDay> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: PaymentMonthDay[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<PaymentMonthDay> =
  createEntityAdapter<PaymentMonthDay>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
