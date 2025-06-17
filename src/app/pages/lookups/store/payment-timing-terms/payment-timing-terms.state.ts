import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PaymentTimingTerm } from './payment-timing-term.model';

export interface State extends EntityState<PaymentTimingTerm> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: PaymentTimingTerm[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<PaymentTimingTerm> =
  createEntityAdapter<PaymentTimingTerm>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
