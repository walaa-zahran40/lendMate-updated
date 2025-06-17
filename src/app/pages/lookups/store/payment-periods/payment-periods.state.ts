import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PaymentPeriod } from './payment-period.model';

export interface State extends EntityState<PaymentPeriod> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
  //History management
  history: PaymentPeriod[];
  historyLoaded: boolean;
  historyError: any;
}

export const adapter: EntityAdapter<PaymentPeriod> =
  createEntityAdapter<PaymentPeriod>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
  history: [],
  historyLoaded: false,
  historyError: null,
});
