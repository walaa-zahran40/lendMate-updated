import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  ClientCentralBank,
  ClientCentralBankHistory,
} from './client-central-bank.model';

// Feature key
export const clientCentralBankFeatureKey = 'clientCentralBanks';

export interface ClientCentralBankState extends EntityState<ClientCentralBank> {
  selectedId: number | null;
  loading: boolean;
  error: string | null;
  history: ClientCentralBankHistory[];
  historyLoading: boolean;
}

export const adapter: EntityAdapter<ClientCentralBank> =
  createEntityAdapter<ClientCentralBank>();

export const initialState: ClientCentralBankState = adapter.getInitialState({
  selectedId: null,
  loading: false,
  error: null,
  history: [],
  historyLoading: false,
});
