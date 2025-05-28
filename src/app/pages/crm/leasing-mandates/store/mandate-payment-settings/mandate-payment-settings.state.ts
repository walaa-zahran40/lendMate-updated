import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MandatePaymentSetting } from './mandate-payment-setting.model';

export interface State extends EntityState<MandatePaymentSetting> {
  loadedId: number | null; // ← add this
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<MandatePaymentSetting> =
  createEntityAdapter<MandatePaymentSetting>();

export const initialState: State = adapter.getInitialState({
  loadedId: null, // ← and set your initial value here
  loading: false,
  error: null,
});
